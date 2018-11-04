<template>
  <z-view size=xxl style="background-color: white; border-width: 7px" :style="'border-color:' + sharedState.colorMe.main"  >
     <img slot=image :src="info.avatar" width="100%" style="opacity: 0.1" />
      <div  class="super-label" :style="'z-index: 10; color:' + sharedState.colorMe.sec">
     <span :style="'color:' + sharedState.colorMe.sec"> {{$zircle.getParams().data.name}} <span style="word-break: break-word;font-weight: 300;" :style="'color:' + sharedState.colorMe.sec"> by {{$zircle.getParams().data.author}}</span> </span>
     </div>
     <div v-if="activePage" class="label" :style="'z-index: 10; color:' + sharedState.colorMe.sec">
     {{info.description.length > 80 ? info.description.substring(0,80) + '…' : info.description.length === 0 ? 'No description provided' : info.description}}
     </div>

   <div v-if="activePage" style="position: absolute; left: 0; bottom: 0; z-index: 90;font-weight: 300; padding-top: 10px;padding-bottom: 50px;background-color: var(--shade-color); color: var(--accent-color); font-size: 12px; margin: 0; height: 20%; width: 100%;">
  <center>
      <div class="sub-label" style="overflow: hidden">
        <span style="width: 30%; vertical-align: top"><i class="fas fa-star"></i> {{info.stars > 999 ? Math.round((info.stars / 1000) * 10 ) / 10 + 'k' : ' ' + info.stars}}</span>
        <span style="width: 30%"><i class="fas fa-code-branch"> </i> {{info.forks > 999 ? Math.round((info.forks / 1000) * 10 ) / 10 + 'k' : ' ' + info.forks}}</span>
        <span style="width: 40%"><i class="fas fa-code"></i> {{info.language === '' ? 'not defined' : info.language}}</span>
      </div>
  </center>
   </div>

     <div v-if="!activePage" class="label" :style="'z-index: 10; color:' + sharedState.colorMe.sec">

     <center>
      <div class="sub-label" style="width: 100%; overflow: hidden; font-size: calc(10px + 1vw);">
        <span style="width: 33%; vertical-align: top"><i v-if="info.diff > 0 && info.prevPos !== -1" class="fas fa-arrow-up" :style="'color:' + sharedState.colorMe.sec"></i>
              <i v-if="info.diff < 0" class="fas fa-arrow-down" :style="'color:' + sharedState.colorMe.sec"></i>
              <i v-if="info.diff === 0" class="fas fa-equals" :style="'color:' + sharedState.colorMe.sec"></i><br>
         <span style="">{{info.diff > 0 ? '+ ' + info.diff : info.diff === 0 ? 'no change in 3h' : info.diff}}</span></span>
        <span style="width: 33%"><i class="fas fa-star" :style="'color:' + sharedState.colorMe.sec"></i><br>
        <span style="">{{'+' + (info.periodStars > 999 ? Math.round((info.periodStars / 1000) * 10 ) / 10 + 'k' : ' ' + info.periodStars) + ' ' + (sharedState.since === 'daily' ? 'today' : sharedState.since === 'weekly' ? 'this week' : 'this month')}}</span></span>
        <span style="width: 33%"><i class="fas fa-clock" :style="'color:' + sharedState.colorMe.sec"></i><br>
<span style="">{{permanency + ' ' + 'on chart'}}</span></span>
      </div>
  </center>
     </div>

   <div v-if="!activePage" style="position: absolute; left: 0; bottom: 0; z-index: 90;font-weight: 300; padding-top: 10px;padding-bottom: 50px;background-color: var(--shade-color); color: var(--accent-color); font-size: 12px; margin: 0; height: 20%; width: 100%;">
  <center>
      <div class="sub-label" style="overflow: hidden">
        <span>Updated at {{new Date(info.updated).getHours() + ':' + new Date(info.updated).getMinutes() + '. Next in  ' + ((new Date(info.updated).getHours() + 3 ) - new Date().getHours()) + ' : ' +  ((new Date(info.updated).getMinutes() - new Date().getMinutes() + 60))}}</span>
      </div>
  </center>
   </div>

    <div slot="extension" >

      <z-spot
      button
      class="butt"
      size=s
      :style="'font-size: 18px; border-width: 4px; background-color:' + sharedState.colorMe.sec"
      :distance="120"
      :angle="45"
      label=insights
      @click.native="activePage = !activePage">
       <i v-if="activePage" class="fas fa-chart-line" :style="'color:' + sharedState.colorMe.main"></i>
       <i v-if="!activePage" class="fas fa-undo" :style="'color:' + sharedState.colorMe.main"></i>

      <z-spot slot=extension v-if="activePage"
      class="emit"
      :distance=135
      :angle=-45
      size=xxs
      :style="'border: none; background-color:rgb(218, 72, 47)'"
      >
      </z-spot>
      </z-spot>

      <z-spot

      button
      class="butt"
      size=s
      label="repo url"
      :style="'font-size: 14px; border-width: 4px; background-color:' + sharedState.colorMe.sec"
      :distance="120"
      :angle="135"
      @click.native="toLink($zircle.getParams().data.url)">
       <i class="fas fa-external-link-alt" :style="'color:' + sharedState.colorMe.main"></i>

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
 align-items: center;
 justify-content: center;
 left: 0;
 padding-top: 30px;
 margin-left: 10%;
 word-break: break-word;
 width: 80%;
 height: 40%;
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
