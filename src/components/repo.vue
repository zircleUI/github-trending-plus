<template>
  <z-view size=xxl style="border-width: 7px" :style="'border-color:' + sharedState.colorMe.main">
   <div class="label" :style="'color:' + sharedState.colorMe.main"> 
     {{info.description.length > 90 ? info.description.substring(0,90) + '…' : info.description}}
     
      </div>

    <div slot="extension">
      <transition name="head">
      <div v-if="$zircle.getCurrentViewName() === 'repo--0'" class="title" style="position: fixed; top: -50%; left: -100%;width: 300%;">
        <a :href="$zircle.getParams().data.url" target="_blank" :style="'font-size: 30px; color:' + sharedState.colorMe.sec"> {{$zircle.getParams().data.name}} <i style="font-size: 15px; vertical-align: super" class="fas fa-external-link-alt"></i></a>
        <br>
        <div style="line-height: 0.9em; font-weight: 300; font-size: 25px;" :style="'color:' + sharedState.colorMe.sec"><br>by {{$zircle.getParams().data.author}}</div>
      </div>
    </transition>

      <z-spot
         :angle="-45"
         :distance="125"
         :label="info.position + 1 + '˚ pos.'"
         size="xs"
         class="side"
         :style="'color:' + sharedState.colorMe.sec + '; border-width: 1px; background-color:' + sharedState.colorMe.sec + '; border-color:' + sharedState.colorMe.sec">
         <i class="fas fa-award" :style="'color:' + sharedState.colorMe.main"></i>
        <z-spot
          slot="extension"
          :angle="-45"
          :distance="1"
          size="xxs"
          class="side"
          
          :style="'color:' + sharedState.colorMe.sec"
          style="border: none; background-color: transparent;">
        </z-spot>
      </z-spot>

      <z-spot
          v-if="info.prevPos !== -1 && info.diff !== 0"
         :angle="-14"
         :distance="120"
         size="xs"
         class="side"
         :label="'' + info.diff"
         :style="'color:' + sharedState.colorMe.sec + '; border-width: 1px; background-color:' + sharedState.colorMe.sec + '; border-color:' + sharedState.colorMe.sec">
         <i v-if="info.diff > 0" class="fas fa-arrow-up" :style="'color:' + sharedState.colorMe.main"></i>
         <i v-if="info.diff < 0" class="fas fa-arrow-down" :style="'color:' + sharedState.colorMe.main"></i>
        <z-spot
          slot="extension"
          :angle="-45"
          :distance="1"
          size="xxs"
          class="side"
          :style="'color:' + sharedState.colorMe.sec"
          style="border: none; background-color: transparent;">
        </z-spot>
      </z-spot>

      <z-spot
         :angle="info.prevPos !== -1 && info.diff !== 0 ? 14 : 0"
         :distance="120"
         size="xs"
         class="side"
          :label="'+' + (info.periodStars > 999 ? Math.round((info.periodStars / 1000) * 10 ) / 10 + 'k' : ' ' + info.periodStars) + ' ' + (sharedState.since === 'daily' ? 'today' : sharedState.since === 'weekly' ? 'this week' : 'this month')"
         :style="'color:' + sharedState.colorMe.sec + '; border-width: 1px; background-color:' + sharedState.colorMe.sec + '; border-color:' + sharedState.colorMe.sec">
         <i class="fas fa-star" :style="'color:' + sharedState.colorMe.main"></i>
        <z-spot
          slot="extension"
          :angle="-45"
          :distance="1"
          size="xxs"
          class="side"
          
         
          label-pos="right"
          :style="'color:' + sharedState.colorMe.sec"
          style="border: none; background-color: transparent;">
        </z-spot>
      </z-spot>

      <z-spot
         :angle="45"
         :distance="120"
         size="xs"
         class="side"
        :label="permanency + ' ' + 'on chart'"
         :style="'color:' + sharedState.colorMe.sec + '; border-width: 1px; background-color:' + sharedState.colorMe.sec + '; border-color:' + sharedState.colorMe.sec">
         <i class="fas fa-chart-line" :style="'color:' + sharedState.colorMe.main"></i>
        <z-spot
          slot="extension"
          :angle="-45"
          :distance="1"
          size="xxs"
          class="side"
         
          
          :style="'color:' + sharedState.colorMe.sec"
          style="border: none; background-color: transparent;">
        </z-spot>
      </z-spot>

      <z-spot
         :angle="-145"
         :distance="120"
         :label="info.stars > 999 ? Math.round((info.stars / 1000) * 10 ) / 10 + 'k' : ' ' + info.stars"
         size="xs"
         class="side"
         :style="'color:' + sharedState.colorMe.sec"
         style="background-color: transparent; border: none">
         <i class="fas fa-star"></i>
      </z-spot>
      <z-spot
        size="xxs"
        :angle="-145"
        :distance='99'
        :style="'background-color:' + sharedState.colorMe.main + '; border-color:' + sharedState.colorMe.main">
      </z-spot>

      <z-spot
         :angle="-180"
         :distance="120"
         size="xs"
         class="side"
         :label="info.forks > 999 ? Math.round((info.forks / 1000) * 10 ) / 10 + 'k' : ' ' + info.forks"
         :style="'color:' + sharedState.colorMe.sec"
         style="background-color: transparent; border: none">
         <i class="fas fa-code-branch"></i>
      </z-spot>
      <z-spot
        size="xxs"
        :angle="-180"
        :distance='99'
        :style="'background-color:' + sharedState.colorMe.main + '; border-color:' + sharedState.colorMe.main">
      </z-spot>
      <z-spot
         :angle="145"
         :distance="120"
         size="xs"
         class="side"
         :label="info.language === '' ? 'not defined' : info.language"
         :style="'color:' + sharedState.colorMe.sec"
         style="background-color: transparent; border: none">
         <i class="fas fa-code"></i>
      </z-spot>
      <z-spot
        size="xxs"
        :angle="145"
        :distance='99'
        :style="'background-color:' + sharedState.colorMe.main + '; border-color:' + sharedState.colorMe.main">
      </z-spot>

      <!-- <z-spot
          button
         :angle="-225"
         :distance="120"
         size="xs"
         label="repo url"
         @click.native='toLink(info.url)'
         :style="'color:' + sharedState.colorMe.sec"
         style="color: #454545; background-color: transparent; border: none">
         <i class="fas fa-link"></i>
      </z-spot> -->

    </div>
  </z-view>
</template>
<script>
import state from '../store/state'
export default {
  data () {
    return {
      info: {},
      sharedState: state.$data,
      colors: [{main: '#54a74c', sec: 'hsl(115, 37%, 18%)'}, {main: '#f2bd00', sec: 'hsl(47, 100%, 17%)'}, {main: '#5484f8', sec: 'hsl(222, 92%, 25%)'}]
    }
  },
  methods: {
    toLink (url) {
      return window.open(url, '_blank')
    }
  },
  computed: {
    colorMe () {
      var randomColor = this.colors[Math.floor(Math.random() * this.colors.length)]
      this.sharedState.colorMe = randomColor
      return randomColor
    },
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
  font-size: calc(1.2vw + 1.2vh + 1.2vmin);
 
  
  
}
.is-current-view > section > .z-outer-circle {
  border: 2px solid #454545;
  opacity: 1;
  
}
</style>
