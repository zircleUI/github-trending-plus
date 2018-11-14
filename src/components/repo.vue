<template>
<z-view size=xxl style="background-color: white; border-width: 7px" :style="'border-color:' + sharedState.colorMe.main">
    <img slot=image :src="info.avatar" width="100%" style="opacity: 0.1" />
    <div class="super-label" :style="'z-index: 10; color:' + sharedState.colorMe.sec">
        <span :style="'color:' + sharedState.colorMe.sec"> {{$zircle.getParams().data.name}} <span style="word-break: break-word;font-weight: 300;" :style="'color:' + sharedState.colorMe.sec"> by {{$zircle.getParams().data.author}}</span> </span>
    </div>
    <div v-if="activePage" class="label" :style="'z-index: 10; color:' + sharedState.colorMe.sec">
        {{info.description.length > 80 ? info.description.substring(0,80) + '…' : info.description.length === 0 ? 'No description provided' : info.description}}
    </div>
    <div v-if="activePage" style="position: absolute; left: 0; bottom: 0; z-index: 90;font-weight: 300; padding-top: 10px;padding-bottom: 50px;background-color: var(--shade-color); color: var(--accent-color); font-size: 11px; margin: 0; height: 20%; width: 100%;">
        <center>
            <div class="sub-label" style="overflow: hidden">
                <span style="width: 30%; vertical-align: top"><i class="fas fa-star"></i> {{info.stars > 999 ? Math.round((info.stars / 1000) * 10 ) / 10 + 'k' : ' ' + info.stars}}</span>
                <span style="width: 30%"><i class="fas fa-code-branch"> </i> {{info.forks > 999 ? Math.round((info.forks / 1000) * 10 ) / 10 + 'k' : ' ' + info.forks}}</span>
                <span style="width: 40%"><i class="fas fa-code"></i> {{info.language === '' ? 'not defined' : info.language}}</span>
            </div>
        </center>
    </div>
    <div v-if="!activePage" :style="'left: 0; width: 100%; z-index: 10; color:' + sharedState.colorMe.sec">
        <center>
            <div class="sub-label" style="padding-top: 30px; line-height: 0.9em; width: 100%; overflow: hidden; font-size: calc(10px + 1vw);">
                <span v-if="info.prevPos !== -1 && sharedState.languageTracked === false" style="width: 33%; vertical-align: top">
              <i v-if="info.diff > 0" class="fas fa-arrow-up" :style="'color:' + sharedState.colorMe.sec"></i>
              <i v-if="info.diff < 0" class="fas fa-arrow-down" :style="'color:' + sharedState.colorMe.sec"></i>
              <i v-if="info.diff === 0" class="fas fa-equals" :style="'color:' + sharedState.colorMe.sec"></i><br>
         <span style="">{{info.diff > 0 ? '+ ' + info.diff : info.diff === 0 ? 'same pos.' : info.diff}}</span></span>
                <span :style="sharedState.languageTracked === false ? 'width: 33%' : 'width: 100%'"><i class="fas fa-star" :style="'color:' + sharedState.colorMe.sec"></i><br>
        <span style="">{{'+' + (info.periodStars > 999 ? Math.round((info.periodStars / 1000) * 10 ) / 10 + 'k' : ' ' + info.periodStars) + ' ' + (sharedState.since === 'daily' ? 'today' : sharedState.since === 'weekly' ? 'this week' : 'this month')}}</span></span>
                <span v-if="sharedState.languageTracked === false" style="width: 33%"><i class="fas fa-clock" :style="'color:' + sharedState.colorMe.sec"></i><br>
<span style="">{{permanency + ' ' + 'on chart'}}</span></span>
            </div>
        </center>
    </div>
    <div v-if="!activePage" style="position: absolute; left: 0; bottom: 0; z-index: 90;font-weight: 300; padding-top: 10px;padding-bottom: 50px;background-color: var(--shade-color); color: var(--accent-color); font-size: 12px; margin: 0; width: 100%;" :style="sharedState.languageTracked === false ? 'height: 20%' : 'height: 35%'">
        <center>
            <div class="sub-label" style="overflow: hidden">
                <span v-if="sharedState.languageTracked === false">Updated at {{formatTime(info.updated) + '. Next at ' + plus3(info.updated)}}</span>
                <span v-if="sharedState.languageTracked === true"><b>{{sharedState.language}}</b> is not currently tracked. If you wish to add it open <a style="color: inherit;" href="https://github.com/zircleUI/github-trending-plus" target="_blank">an issue</a></span>
            </div>
        </center>
    </div>
    <div slot="extension">
        <z-spot button class="butt2" size=s style="font-size: 18px;color: white; border-color:var(--shade-color);background-color: var(--shade-color);" :distance="120" :angle="45" :label="activePage ? 'insights' : 'return'" @click.native="toggle">
            <i v-if="activePage" class="fas fa-chart-line" ></i>
            <i v-if="!activePage" class="fas fa-undo" ></i>
            <z-spot slot=extension v-if="activePage" class="emit" :distance=135 :angle=-45 size=xxs :style="'border: none; background-color:rgb(218, 72, 47)'">
            </z-spot>
        </z-spot>
        <z-spot button class="butt2" size=s label="☝️ star it" style="font-size: 25px;color: white; border-color:var(--shade-color);background-color: var(--shade-color);" :distance="120" :angle="135" @mouseup.native="toLink($zircle.getParams().data.url)">
            <i class="fas fa-star" ></i>
        </z-spot>
        <z-spot :angle="-135" :distance="100" :label="getOrdinal(info.position + 1)" label-pos="left" size="s" class="side" style="font-size: 25px;color: white; border-color:var(--shade-color);background-color: var(--shade-color);">
            <i class="fas fa-award"></i>
        </z-spot>
    </div>
</z-view>
</template>

<script>
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format' // eslint-disable-line

import state from '../store/state'
export default {
  data () {
    return {
      info: {},
      activePage: true,
      startX: {},
      sharedState: state.$data,
      colors: [{
        main: '#54a74c',
        sec: 'hsl(115, 37%, 18%)'
      }, {
        main: '#f2bd00',
        sec: 'hsl(47, 100%, 17%)'
      }, {
        main: '#5484f8',
        sec: 'hsl(222, 92%, 25%)'
      }]
    }
  },
  methods: {
    toggle () {
      this.activePage = !this.activePage
    },
    getOrdinal (n) {
      var s = ['th', 'st', 'nd', 'rd']
      var v = n % 100
      return n + (s[(v - 20) % 10] || s[v] || s[0])
    },
    toLink (url) {
      return window.open(url, '_blank')
    },
    formatTime (time) {
      return moment(time).format('H:mm')
    },
    plus3 (time) {
      var final = moment(time).add(4, 'hours').diff(moment(), 'minutes')
      return moment(time).add(4, 'hours').format('H:mm') + ' (in ' + moment.duration(final, 'minutes').format('H:mm') + ')'
    }
  },
  computed: {
    permanency () {
      if (this.info.stay === 3) {
        return 'new!'
      } else if (this.info.stay > 3 && this.info.stay <= 48) {
        return this.info.stay + ' h.'
      } else if (this.info.stay > 49) {
        return Math.floor((this.info.stay) / 24) + ' days'
      }
    }
  },
  created () {
    var params = this.$zircle.getParams().data
    this.info = {
      updated: params.updated,
      avatar: params.avatar,
      description: params.description,
      url: params.url,
      language: params.language,
      author: params.author,
      name: params.name,
      forks: params.forks,
      stars: params.stars,
      periodStars: params.currentPeriodStars,
      position: params.position,
      diff: params.diff,
      prevPos: params.prevPos,
      stay: params.stay
    }
  },
  mounted () {

  }
}
</script>
