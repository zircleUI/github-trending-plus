<template>
  <z-view style="color: white;border-width: 7px;" size="xl">
    <i class="fab fa-github fa-4x"></i>
    <div slot="extension">
      <z-spot
        class="asteroids"
        style='border-width: 3px; opacity: 0.3; border-color:white '
        size=s
        :distance="150"
        :angle="-65"
      >
      </z-spot>
      <z-spot
        class="asteroids"
        style='border-width: 3px; opacity: 0.3; border-color:white '
        size=s
        :distance="160"
        :angle="-130"
      >
      </z-spot>
      <z-spot
        class="asteroids"
        style='border-width: 3px; opacity: 0.3; border-color:white '
        size=s
        :distance="150"
        :angle="140"
      >
      </z-spot>
      <z-spot
        class="asteroids"
        style='border-width: 5px; opacity: 1; background-color: #da482f; border-color:white '
        size=s
        :distance="130"
        :angle="75"
      />
      <z-spot
        class="asteroids"
        style='border-width: 6px; opacity: 1; background-color: #5484f8; border-color:white '
        size=xs
        :distance="160"
        :angle="-50"
      />
      <z-spot
        class="asteroids"
        style='border-width: 4px; opacity: 1; background-color: #54a74c; border-color:white '
        size=xs
        :distance="190"
        :angle="155"
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
        style='border-width: 3px; opacity: 0.3; border-color:white '
        size=s
        :distance="180"
        :angle="94"
      >
      </z-spot>

      <z-spot
      class="asteroids"
       style='border-width: 3px; opacity: 0.15; border-color:white '
      size=xs
      :distance="148"
      :angle="0"
      >
      </z-spot>
      <z-spot
      class="asteroids"
       style='border-width: 3px; opacity: 0.15; border-color:white'
      size=xs
      :distance=160
      :angle="110"
      >
      </z-spot>
      <z-spot
        class="asteroids"
        style='border-width: 1px; opacity: 0.15; border-color:white'
        size=xxs
        :distance=148
        :angle="43"
      />
      <z-spot
        class="asteroids"
        style='border-width: 1px; opacity: 0.15; border-color:white'
        size=xxs
        :distance=122
        :angle="113"
      />
      <z-spot
        class="asteroids"
        style='border-width: 1px; opacity: 0.15; border-color:white'
        size=xxs
        :distance=132
        :angle="210"
      />
      <z-spot
        class="asteroids"
        style='border-width: 1px; opacity: 0.15; border-color:white'
        size=xxs
        :distance=132
        :angle="-82"
      />
       <z-spot
        style='border-width:3px; opacity: 0.15; border-color:white'
      size=xs
      :distance=190
      :angle="-160"
      >
      </z-spot>

      <z-spot
      class="asteroids"
       style='border-width: 3px; opacity: 0.15; border-color:white'
      size=xs
      :distance=190
      :angle="angle + 130"
      >
      </z-spot>

      <z-spot
      class="meteors"
      :distance="170"
      :angle="-30"
      style="font-size: 40px;color: hsl(220, 12%, 25%); border-color: white; border-width: 3px; background-color: #D4D7DD;"
      @click.native="sharedState.initRepos = true"
      to-view="repos"
      label="top repos">
        R
      </z-spot>
      <z-spot
        class="meteors"
        :distance="160"
        :angle="20"
        style="font-size: 40px;color: hsl(220, 12%, 25%);  border-color: white; border-width: 3px; background-color: #D4D7DD;"
        to-view="devs"
        label="top devs">
        D
      </z-spot>
      <z-spot
        class="meteors"
        :distance="160"
        :angle="182"
        size=s
        style="font-size: 30px;color: hsl(220, 12%, 25%);  border-color: white; border-width: 0px; background-color: #D4D7DD;"
        to-view="about"
        label="about">i
      </z-spot>
      <z-spot
      class="meteors"
        button
        :distance=180
        size='s'
        style="background-color: #D4D7DD;"
        :angle="55"
        label="filter"
        to-view="languages">
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
      colors: [{main: '#54a74c', sec: 'hsl(115, 37%, 18%)'}, {main: '#f2bd00', sec: 'hsl(47, 100%, 17%)'}, {main: '#5484f8', sec: 'hsl(222, 92%, 25%)'}]
    }
  },
  computed: {
    colorMe () {
      var randomColor = this.colors[Math.floor(Math.random() * this.colors.length)]
      this.sharedState.colorMe = randomColor
      document.querySelector('.theme-github').style.setProperty('--accent-color', randomColor.sec)
      document.querySelector('.theme-github').style.setProperty('--shade-color', randomColor.main)
      return randomColor
    }
  },
  methods: {
    foik () {
      console.log(this.devs1)
    },
    mierda () {
      console.log(this.devs)
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
    console.log(this.colorMe.main)
  }
}
</script>
<style>
.meteors {
  font-weight: 700;
}
.meteors > .z-label.bottom > .inside {
  color: #454545;
  font-weight: 400;
  background-color: transparent !important;
  font-size: calc(1vw + 1vh + 1vmin);
}

.side>.z-label>.inside {
  color: inherit !important;
  font-weight: 500 !important;
  background-color: transparent !important;
  font-size: calc(1vw + 1vh + 1vmin);
}

</style>
