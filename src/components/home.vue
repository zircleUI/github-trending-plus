<template>
<z-view class="is-home" style="color: white; background-color: #454545; border-color:var(--shade-color);border-width: 7px;" size="xl">
    <i  class="fab fa-github fa-4x"></i>
    <div slot="extension">

                <z-spot class="asteroids" style='background-color: var(--shade-color);border-width: 3px;  border-color:white ' size=s :distance="150" :angle="-65">
        </z-spot>
        <z-spot class="asteroids" style='background-color: var(--shade-color);border-width: 3px;  border-color:white ' size=s :distance="160" :angle="-130">
        </z-spot>
        <z-spot class="asteroids" style='background-color: var(--shade-color);border-width: 3px;  border-color:white ' size=s :distance="150" :angle="140">
        </z-spot>
        <z-spot class="asteroids" style='background-color: var(--shade-color);border-width: 15px;  border-color:white ' size=s :distance="130" :angle="75" />
        <z-spot class="asteroids stay" style='background-color: var(--shade-color);border-width: 6px;  border-color:white ' size=xs :distance="160" :angle="-47" />
        <z-spot class="asteroids" style='background-color: var(--shade-color);border-width: 7px;  border-color:white ' size=xs :distance="185" :angle="160"></z-spot>
        <z-spot class="asteroids" style='background-color: var(--shade-color);border-width: 9px;  border-color:white ' size=s :distance="130" :angle="-110" />

        <z-spot class="asteroids" style='background-color: var(--shade-color);border-width: 3px;  border-color:white ' size=s :distance="180" :angle="94">
        </z-spot>

        <z-spot class="asteroids" style='background-color: var(--shade-color);border-width: 3px;  border-color:white ' size=xs :distance="148" :angle="0">
        </z-spot>
        <z-spot class="asteroids" style='background-color: var(--shade-color);border-width: 3px;  border-color:white' size=xs :distance=160 :angle="110">
        </z-spot>
        <z-spot class="asteroids" style='background-color: var(--shade-color);border-width: 1px;  border-color:white' size=xxs :distance=148 :angle="43" />
        <z-spot class="asteroids" style='background-color: var(--shade-color);border-width: 1px;  border-color:white' size=xxs :distance=122 :angle="113" />
        <z-spot class="asteroids" style='background-color: var(--shade-color);border-width: 1px;  border-color:white' size=xxs :distance=132 :angle="210" />
        <z-spot class="asteroids" style='background-color: var(--shade-color);border-width: 1px;  border-color:white' size=xxs :distance=132 :angle="-82" />
        <z-spot class="asteroids" style='background-color: var(--shade-color);border-width:3px;  border-color:white' size=xs :distance=190 :angle="-160">
        </z-spot>

        <z-spot class="asteroids" style='background-color: var(--shade-color);border-width: 3px;  border-color:white' size=xs :distance=190 :angle="angle + 130">
        </z-spot>

        <z-spot class="meteors" :distance="170" :angle="-30" ref="repos" style="color: white;  font-size: 40px; border-color: white; border-width: 3px; background-color: var(--shade-color);" @mouseup.native="renderMe('repos')" @wheel.native.prevent="forward($event,'repos')" label="top repos">
            R
        </z-spot>
        <z-spot class="meteors" :distance="160" ref="devs" :angle="20" style="color: white; font-size: 40px;  border-color: white; border-width: 3px; background-color: var(--shade-color);" @mouseup.native="renderMe('devs')" @wheel.native="forward($event,'devs')" label="top devs">
            D
        </z-spot>
        <z-spot button class="meteors" :distance="160" :angle="-180" size=s ref="about" style="color:white; font-size: 25px;  border-color: white; border-width: 0px; background-color: var(--shade-color);" label="about" @mouseup.native="renderMe('about')" @wheel.native="forward($event,'about')"><i class="fas fa-question"></i>
        </z-spot>
        <z-spot class="meteors" :distance=180 size='s' style="color: white; border-color: white;background-color: var(--shade-color);" :angle="55" label="filter" ref="languages" @mouseup.native="renderMe('languages')" @wheel.native="forward($event,'languages')">
            <i class="fas fa-ellipsis-v"></i>
        </z-spot>

    </div>
</z-view>

</template>

<script>
import state from '../store/state'
import anime from 'animejs'
export default {
  data () {
    return {
      time: false,
      collection: [],
      sharedState: state.$data,
      angle: 0,
      dessvs: [],
      devs1: [],
      angle1: 0,
      ani: {},
      hideThis: '',
      colors: [{
        main: '#5484f8',
        sec: 'hsl(222, 92%, 25%)'
      }
      ]
    }
  },
  computed: {
    home () {
      return this.$zircle.getCurrentViewName()
    }
  },
  watch: {
    home () {
      if (this.home === 'home--0') this.callRandomColors()
    }
  },
  methods: {
    hideMe (ref) {
      this.hideThis = ref
      this.$refs[ref].$el.style.opacity = 0
    },
    forward (e, view) {
      if (e.deltaY < 0 && this.$zircle.getCurrentViewName() === 'home--0') {
        this.renderMe(view)
      }
    },
    renderMe (ref) {
      this.sharedState.initRepos = true
      this.$zircle.toView({
        to: ref,
        fromSpot: this.$refs[ref]
      })
    },
    toLink (url) {
      return window.open(url, '_blank')
    },
    callRandomColors () {
      var randomColor = this.colors[Math.floor(Math.random() * this.colors.length)]
      this.sharedState.colorMe = randomColor
      document.querySelector('.theme-github').style.setProperty('--accent-color', randomColor.sec)
      document.querySelector('.theme-github').style.setProperty('--shade-color', randomColor.main)
      return randomColor
    },
    asteroids () {
      var vm = this
      var angles = {
        degree: 0
      }
      anime({
        targets: angles,
        degree: 360,
        duration: 300000,
        easing: 'linear',
        update: function () {
          vm.angle = angles.degree
        }
      })
    },
    meteors () {
      var vm = this
      var angles = {
        degree: 0
      }
      vm.ani = anime({
        targets: angles,
        degree: 360,
        duration: 120000,
        elasticity: 100,
        easing: 'linear',
        update: function () {
          vm.angle1 = angles.degree
        }
      })
    }
  },
  mounted () {
    var vm = this
    setTimeout(function () {
      vm.callRandomColors()
    }, 1500)
  }
}
</script>

<style>
.asteroids {
    pointer-events: none !important;
    opacity: 0.30;
}

.is-past-view section div .asteroids {
    opacity: 0 !important
}

.is-previous-view,
.is-past-view {
    opacity: 1 !important
}

.is-previous-view section,
.is-past-view section {
    opacity: 1 !important
}

.is-previous-view section div div .z-label,
.is-past-view section div div .z-label {
    opacity: 0 !important
}

.is-previous-view section div div section div div div .extra,
.is-past-view section div div section div div div .extra {
    opacity: 0 !important
}

.is-previous-view section .z-outer-circle,
.is-past-view section .z-outer-circle {
    opacity: 0 !important
}

.is-previous-view {
    filter: blur(4px) opacity(85%) !important;
}

.is-past-view {
    filter: blur(4px) opacity(65%) !important;
}

.is-home.is-current-view section .z-outer-circle {
    opacity: 0 !important;
    cursor: default !important;
}

.is-current-view section .z-outer-circle {

    background-color: rgba(0, 0, 0, 0.01) !important;
    cursor: default !important;
}

.is-current-view section svg {
    cursor: default !important;
}

/* .is-previous-view section div div, .is-past-view section div div {
  opacity: 1 !important
}

.is-previous-view section .z-main-content, .is-past-view section .z-main-content {
  opacity: 0 !important
}
.is-previous-view section div .stay, .is-past-view section div .stay{
  opacity: 1 !important
}
.is-previous-view section div div section div div .stay, .is-past-view section div div section div div .stay{
  opacity: 1 !important
} */

.meteors {
    font-weight: 700;
}

.meteors>.z-label>.inside {
    color: var(--accent-color) !important;
    font-weight: 400;
    background-color: white !important;
    font-size: calc(0.6vw + 0.6vh + 0.6vmin);
}

.meteors.sub {
    font-size: calc(0.6vw + 0.6vh + 0.6vmin);
}

.side>.z-label {

    text-align: left !important;
    padding: 0 !important;
    margin: 0 !important;

}

.side>.z-label>.inside {
    color: var(--accent-color) !important;
    font-weight: 500 !important;
    padding: 0 !important;
    margin: 0 !important;
    text-align: left !important;
    background-color: transparent !important;
    font-size: calc(2vw + 1vh + 1vmin);
}
</style>
