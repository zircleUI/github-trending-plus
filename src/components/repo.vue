<template>
  <z-view size=xxl style="pointer-events: auto; border-width: 7px" :style="'border-color:' + sharedState.colorMe.main"  >
   <div v-if="activePage"  style="height: 100%;">
     <div class="label" :style="'height: 70%; color:' + sharedState.colorMe.main">
     {{info.description.length > 80 ? info.description.substring(0,80) + '…' : info.description}} 
     </div>
     <div style="font-weight: 500; padding-top: 20px; height: 30%; background-color: var(--accent-color); color: var(--shade-color); font-size: 12px; position: absolute; bottom: 0, margin: 0; width: 100%; ">
       <i class="fas fa-star"></i> {{info.stars > 999 ? Math.round((info.stars / 1000) * 10 ) / 10 + 'k' : ' ' + info.stars}}&nbsp&nbsp &nbsp&nbsp&nbsp
     <i class="fas fa-code-branch"> </i> {{info.forks > 999 ? Math.round((info.forks / 1000) * 10 ) / 10 + 'k' : ' ' + info.forks}}&nbsp&nbsp&nbsp&nbsp&nbsp
   <i class="fas fa-code"></i> {{info.language === '' ? 'not defined' : info.language}}  <br>

      </div>
   </div>
    <div v-if="!activePage"   :style="'color:' + sharedState.colorMe.main">
      
     <center>
  <table style="width: 100%;">
          <tr>
            <td style="width: 33%; text-align: center; vertical-align: top"> <i v-if="info.diff > 0" class="fas fa-arrow-up" :style="'color:' + sharedState.colorMe.main"></i>
         <i v-if="info.diff < 0" class="fas fa-arrow-down" :style="'color:' + sharedState.colorMe.main"></i><br>
         <span style="font-size: 14px">{{info.diff}}</span></td>
          <td style="width: 33%; text-align: center; vertical-align: top">
<i class="fas fa-star" :style="'color:' + sharedState.colorMe.main"></i><br>
        <span style="font-size: 14px">{{'+' + (info.periodStars > 999 ? Math.round((info.periodStars / 1000) * 10 ) / 10 + 'k' : ' ' + info.periodStars) + ' ' + (sharedState.since === 'daily' ? 'today' : sharedState.since === 'weekly' ? 'this week' : 'this month')}}</span>
          </td>
          <td style="width: 33%; text-align: center; vertical-align: top">
<i class="fas fa-clock" :style="'color:' + sharedState.colorMe.main"></i><br>
<span style="font-size: 14px">{{permanency + ' ' + 'on chart'}}</span> 

          </td>
          </tr>
        </table>
  </center>        
   </div>
   
 

    <div slot="extension" >

      <z-spot  
      button
      size=m
      :style="'font-size: 18px; border-width: 5px; background-color:' + sharedState.colorMe.sec"
      :distance="97"
      :angle="0"
      @click.native="activePage = !activePage">
       <i v-if="activePage" class="fas fa-chart-line" :style="'color:' + sharedState.colorMe.main"></i>
       <i v-if="!activePage" class="fas fa-undo" :style="'color:' + sharedState.colorMe.main"></i>
      </z-spot>

      <z-spot  
      v-if="activePage"
      button
      size=s
      :style="'font-size: 14px; border-width: 5px; background-color:' + sharedState.colorMe.sec"
      :distance="97"
      :angle="90"
      @click.native="toLink($zircle.getParams().data.url)">
       <i class="fas fa-external-link-alt" :style="'color:' + sharedState.colorMe.main"></i>
    
      </z-spot>
      
      <transition name="head">
      <div v-if="$zircle.getCurrentViewName() === 'repo--0'" class="title" style="position: fixed; top: -40%; left: -100%;width: 300%;">
       <span :style="'color:' + sharedState.colorMe.main"> {{$zircle.getParams().data.name}} </span>
        <br>
        <div style="line-height: 0.9em; font-weight: 300; font-size: 25px;" :style="'color:' + sharedState.colorMe.main"><br>by {{$zircle.getParams().data.author}}</div>
      </div>
    </transition>
    <transition name="head">
      <div v-if="$zircle.getCurrentViewName() === 'repo--0'" class="title icons" style="position: absolute ; top: 102%; width: 100%;">


        
          
      </div>
    </transition>

      <z-spot
         :angle="-45"
         :distance="100"
         :label="info.position + 1 + '˚'"
         label-pos="right"
         size="m"
         class="side"
         :style="'color:' + sharedState.colorMe.main + '; border-width: 1px; background-color:' + sharedState.colorMe.sec + '; border-color:' + sharedState.colorMe.main">
         <i class="fas fa-award fa-2x" :style="'color:' + sharedState.colorMe.main"></i>
        <z-spot
          slot="extension"
          :angle="-45"
          :distance="1"
          size="xxs"
          class="side"

          :style="'color:' + sharedState.colorMe.main"
          style="border: none; background-color: transparent;">
        </z-spot>
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
    },
    startPos (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      this.startX = {
        pos: e.pageX,
        time: new Date().getTime() }
    },
    endPos (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      var distX = e.pageX - this.startX.pos
      var elapsedTime = new Date().getTime() - this.startX.time
      if (elapsedTime <= 300) {
        if (Math.abs(distX) >= 50 && distX < 0) {
          this.activePage(this.activePage + 1)
          this.startX = {}
        } else if (Math.abs(distX) >= 50 && distX > 0) {
          this.activePage(this.activePage - 1)
          this.startX = {}
        }
      }
    },
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
  }
}
</script>
<style scoped>

.label{

  font-weight: 500;
  border-radius: 50%;
 word-break: break-word;
  box-sizing: border-box;
  height: inherit;
  width: 90%;
  padding: 10px;
  margin-left: 5%;
  margin-right: 5%;

  border-radius: 50%;
  font-size: calc(1vw + 1vh + 1vmin);

}
.icons {
font-size: calc(1.2vw + 1.2vh + 1.2vmin);
}
.is-current-view > section > .z-outer-circle {
  border: 2px solid #454545;
  opacity: 1;

}
</style>
