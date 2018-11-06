<template>
  <z-view size=xxl style="background-color: white; border-width: 7px" :style="'border-color:' + sharedState.colorMe.main"  >
     <img slot=image :src="info.avatar" width="100%" style="opacity: 0.1" />
      <div  class="super-label" :style="'z-index: 10; color:' + sharedState.colorMe.sec">
     <span :style="'color:' + sharedState.colorMe.sec"> {{$zircle.getParams().data.name}}</span>
     </div>
     <div v-if="activePage" class="label" :style="'z-index: 10; color:' + sharedState.colorMe.sec">
     </div>

     <div v-if="activePage" :style="'eft: 0; width: 100%; z-index: 10; color:' + sharedState.colorMe.sec">

     <center>
      <div class="sub-label" style="padding-top: 30px; line-height: 0.9em; width: 100%; overflow: hidden; font-size: calc(10px + 1vw);">
        <span v-if="info.prevPos !== -1 && sharedState.languageTracked === false" style="width: 50%; vertical-align: top">
              <i v-if="info.diff > 0" class="fas fa-arrow-up" :style="'color:' + sharedState.colorMe.sec"></i>
              <i v-if="info.diff < 0" class="fas fa-arrow-down" :style="'color:' + sharedState.colorMe.sec"></i>
              <i v-if="info.diff === 0" class="fas fa-equals" :style="'color:' + sharedState.colorMe.sec"></i><br>
         <span style="">{{info.diff > 0 ? '+ ' + info.diff : info.diff === 0 ? 'same pos.' : info.diff}}</span></span>

        <span v-if="sharedState.languageTracked === false" style="width: 50%"><i class="fas fa-clock" :style="'color:' + sharedState.colorMe.sec"></i><br>
<span style="">{{permanency + ' ' + 'on chart'}}</span></span>
      </div>
  </center>
     </div>

   <div v-if="activePage" style="position: absolute; left: 0; bottom: 0; z-index: 90;font-weight: 300; padding-top: 10px;padding-bottom: 50px;background-color: var(--shade-color); color: var(--accent-color); font-size: 12px; margin: 0; width: 100%;" :style="sharedState.languageTracked === false ? 'height: 20%' : 'height: 35%'">
  <center>
      <div class="sub-label" style="overflow: hidden" >
        <span v-if="sharedState.languageTracked === false">Updated at {{formatTime(info.updated) + '. Next at ' + plus3(info.updated)}}</span>
        <span v-if="sharedState.languageTracked === true"><b>{{sharedState.language}}</b> is not currently tracked. If you wish to add it open <a style="color: inherit;" href="https://github.com/zircleUI/github-trending-plus" target="_blank">an issue</a></span>
      </div>
  </center>
   </div>

    <div slot="extension" >

      <z-spot

      button
      class="butt"
      size=s
      label="profile url"
      style="font-size: 14px; border-width: 4px; background-color: #D4D7DD;"
      :distance="120"
      :angle="45"
      @click.native="toLink('https://github.com/' + info.name)">
       <i class="fas fa-external-link-alt" :style="'color:' + sharedState.colorMe.sec"></i>

      </z-spot>

      <z-spot
         :angle="-45"
         :distance="100"
         :label="info.position + 1 + '˚'"
         label-pos="right"
         size="s"
         class="side"
         :style="'color:' + sharedState.colorMe.sec + '; border-width: 4px; background-color:' + sharedState.colorMe.main + '; border-color:' + sharedState.colorMe.main">
         <i class="fas fa-award" :style="'color:' + sharedState.colorMe.sec"></i>
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
      colors: [{ main: '#54a74c', sec: 'hsl(115, 37%, 18%)' }, { main: '#f2bd00', sec: 'hsl(47, 100%, 17%)' }, { main: '#5484f8', sec: 'hsl(222, 92%, 25%)' }]
    }
  },
  methods: {
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
      } else if (this.info.stay > 3 && this.info.stay < 24) {
        return this.info.stay + ' h.'
      } else if (this.info.stay > 24 && this.info.stay < 48) {
        return 'a day'
      } else if (this.info.stay > 48) {
        return Math.floor((this.info.stay) / 24) + ' days'
      }
    }
  },
  created () {
    var params = this.$zircle.getParams().data
    this.info = {
      updated: params.updated,
      position: params.index,
      username: params.username,
      name: params.username,
      url: params.url,
      avatar: params.avatar,
      prevPos: params.prevPos,
      diff: params.diff,
      stay: params.stay
    }
  },
  mounted () {

  }
}
</script>
<style scoped>

.emit{
  opacity: 0;
  animation: emit-pulse 2000ms ease-out;
  animation-iteration-count: 5;
}

@keyframes emit-pulse {
0% {
  opacity: 0;

}
 100% {
  opacity: 1;
}

}

.label{
 font-weight: 500;
 position: absolute;
 top: 32%;
 display: flex;
 align-items: bottom;
 justify-content: center;
 left: 0;
 padding-top: 30px;
 margin-left: 10%;
 word-break: break-word;
 width: 80%;
 height: 41%;
 font-size: calc(12px + 1vw);
 overflow: hidden
}
.sub-label{
  width: 55%;
  font-weight: 400;
 display: flex;
 align-items: top;
 justify-content: center;
 font-size: calc(6px + 1vw);

}
.super-label{
 font-weight: 700;
 position: absolute;
 top: 0;
 display: flex;
 align-items: center;
 justify-content: center;
 left: 0;
 padding: 10px;
 padding-top: 30%;
 margin-left: 10%;
 word-break: break-all;
 width: 80%;
 height: 30%;
 font-size: calc(17px + 1vw);
}
.icons {
font-size: calc(1.2vw + 1.2vh + 1.2vmin);
}

</style>
