<template>
  <z-view class="is-home" style="color: white;border-width: 7px;" size="xl">
    <i class="fab fa-github fa-4x"></i>
    <div slot="extension">

      <z-spot
        class="asteroids"
        style='background-color: #D4D7DD; border-width: 3px; opacity: 0.4; border-color:white '
        size=s
        :distance="150"
        :angle="-65"
      >
      </z-spot>
      <z-spot
        class="asteroids"
        style='background-color: #D4D7DD; border-width: 3px; opacity: 0.4; border-color:white '
        size=s
        :distance="160"
        :angle="-130"
      >
      </z-spot>
      <z-spot
        class="asteroids"
        style='background-color: #D4D7DD; border-width: 3px; opacity: 0.4; border-color:white '
        size=s
        :distance="150"
        :angle="140"
      >
      </z-spot>
      <z-spot
        class="asteroids"
        style='border-width: 9px; opacity: 1; background-color: #da482f; border-color:white '
        size=s
        :distance="135"
        :angle="60"
      />
      <z-spot
        class="asteroids stay"
        style='border-width: 6px; opacity: 1; background-color: #5484f8; border-color:white '
        size=xs
        :distance="160"
        :angle="-47"
      />
      <z-spot
        class="asteroids"
        style='border-width: 4px; opacity: 1; background-color: #54a74c; border-color:white '
        size=xs
        :distance="170"
        :angle="160"
      ></z-spot>
      <z-spot
        class="asteroids"
        style='border-width: 9px; opacity: 1; background-color: #f2bd00; border-color:white '
        size=s
        :distance="130"
        :angle="-110"
      />
      <z-spot
        class="asteroids"
        style='background-color: #D4D7DD; border-width: 3px; opacity: 0.4; border-color:white '
        size=s
        :distance="180"
        :angle="94"
      >
      </z-spot>

      <z-spot
      class="asteroids"
       style='background-color: #D4D7DD;border-width: 3px; opacity: 0.15; border-color:white '
      size=xs
      :distance="148"
      :angle="0"
      >
      </z-spot>
      <z-spot
      class="asteroids"
       style='background-color: #D4D7DD;border-width: 3px; opacity: 0.15; border-color:white'
      size=xs
      :distance=160
      :angle="110"
      >
      </z-spot>
      <z-spot
        class="asteroids"
        style='background-color: #D4D7DD;border-width: 1px; opacity: 0.15; border-color:white'
        size=xxs
        :distance=148
        :angle="43"
      />
      <z-spot
        class="asteroids"
        style='background-color: #D4D7DD;border-width: 1px; opacity: 0.15; border-color:white'
        size=xxs
        :distance=122
        :angle="113"
      />
      <z-spot
        class="asteroids"
        style='background-color: #D4D7DD;border-width: 1px; opacity: 0.15; border-color:white'
        size=xxs
        :distance=132
        :angle="210"
      />
      <z-spot
        class="asteroids"
        style='background-color: #D4D7DD;border-width: 1px; opacity: 0.15; border-color:white'
        size=xxs
        :distance=132
        :angle="-82"
      />
       <z-spot
       class="asteroids"
        style='background-color: #D4D7DD; border-width:3px; opacity: 0.15; border-color:white'
        size=xs
        :distance=190
        :angle="-160"
      >
      </z-spot>

      <z-spot
        class="asteroids"
        style='background-color: #D4D7DD;border-width: 3px; opacity: 0.15; border-color:white'
        size=xs
        :distance=190
        :angle="angle + 130"
      >
      </z-spot>

      <z-spot
        class="meteors"
        :distance="170"
        :angle="-30"
        ref="repos"
        style=" font-size: 40px;color: hsl(220, 12%, 25%); border-color: white; border-width: 3px; background-color: #D4D7DD;"
        @mouseup.native="renderMe('repos')"
        @wheel.native.prevent="forward($event,'repos')"
        label="top repos">
        R
      </z-spot>
      <z-spot
        class="meteors"
        :distance="160"
        ref="devs"
        :angle="20"
        style="font-size: 40px;color: hsl(220, 12%, 25%);  border-color: white; border-width: 3px; background-color: #D4D7DD;"
        @mouseup.native="renderMe('devs')"
        @wheel.native="forward($event,'devs')"
        label="top devs">
        D
      </z-spot>
      <z-spot
        button
        class="meteors"
        :distance="160"
        :angle="182"
        size=s
        ref="about"
        style="font-size: 30px;color: hsl(220, 12%, 25%);  border-color: white; border-width: 0px; background-color: #D4D7DD;"
        label="about"
        @mouseup.native="renderMe('about')"
        @wheel.native="forward($event,'about')">i
      </z-spot>
      <z-spot
        class="meteors"
        :distance=180
        size='s'
        style="background-color: #D4D7DD;"
        :angle="55"
        label="filter"
        ref="languages"
        @mouseup.native="renderMe('languages')"
        @wheel.native="forward($event,'languages')">
           <i style="color: hsl(220, 12%, 25%);" class="fas fa-ellipsis-v"></i>
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
      colors: [{ main: '#8a8f94', sec: '#454545' }, { main: '#54a74c', sec: 'hsl(115, 37%, 18%)' }, { main: '#f2bd00', sec: 'hsl(47, 100%, 17%)' }, { main: '#5484f8', sec: 'hsl(222, 92%, 25%)' }]
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
    forward (e, view) {
      if (e.deltaY < 0 && this.$zircle.getCurrentViewName() === 'home--0') {
        this.renderMe(view)
      }
    },
    renderMe (ref) {
      this.sharedState.initRepos = true
      this.$zircle.toView({ to: ref, fromSpot: this.$refs[ref] })
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
      var angles = { degree: 0 }
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
      var angles = { degree: 0 }
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
    // this.asteroids()
    // this.meteors()
    // this.getAvatars()
    // this.setinit()
    this.callRandomColors()
  }
}
</script>
<style>
.asteroids {
  pointer-events: none !important;
}
.is-previous-view, .is-past-view {
  opacity: 1 !important
}
.is-previous-view section, .is-past-view section {
  opacity: 1 !important
}

.is-previous-view section div div .z-label, .is-past-view section div div .z-label {
  opacity: 0 !important
}

.is-previous-view section div div section div div div .extra, .is-past-view section div div section div div div .extra {
  opacity: 0 !important
}

.is-previous-view section div div section div div .numeral, .is-past-view section div div section div div .numeral {
  opacity: 0 !important;
  cursor: default !important;
}
.is-current-view section div div section div div .numeral {
  cursor: default !important;
}
.is-previous-view section .z-outer-circle, .is-past-view section .z-outer-circle {
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
.meteors > .z-label.bottom > .inside {
  color: #454545;
  font-weight: 400;
  background-color: transparent !important;
  font-size: calc(0.7vw + 0.7vh + 0.7vmin);
}
.side>.z-label {

  text-align: left !important;
  padding: 0 !important;
  margin: 0 !important;

}
.side>.z-label>.inside {
  color: inherit !important;
  font-weight: 500 !important;
  padding: 0 !important;
  margin: 0 !important;
  text-align: left !important;
  background-color: transparent !important;
  font-size: calc(2vw + 1vh + 1vmin);
}

</style>
