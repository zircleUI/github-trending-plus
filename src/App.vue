<template>
<div id="app" style="user-select: none;">
    <span style="z-index:999; position: absolute; top: 10px; right: 10px; font-weight: 500; font-size: 13px" ><span v-if="$zircle.getCurrentViewName() !== 'home--0'">Github trending plus  </span> by <a href="https://github.com/zircleui/zircleui" target="_blank"> <img style="vertical-align:middle" src="zircle.png" width="13px"/>  zircle</a> </span>
    <transition name="head">
        <div v-if="$zircle.getCurrentViewName() === 'home--0'" class="title home">
            Github trending <span :style="'color:' + sharedState.colorMe.main">plus</span>
            <br>
            <div style="line-height: 0.9em; font-weight: 300; font-size: 20px; color: #8a8f94"><br><span style="text-transform: capitalize">{{sharedState.since}}</span> repos & devs for <span :style="'color:' + sharedState.colorMe.main">{{sharedState.language === '' ? 'all coding languages' : sharedState.language}}</span></div>
        </div>
    </transition>
    <transition name="head">
        <div v-if="$zircle.getCurrentViewName() === 'home--0'" class="footer">
            <span style="font-size: 13px" >
            <b>Tip: </b> use filter to change coding language & time period</span>
        </div>
    </transition>
    <transition name="head">
        <div v-if="$zircle.getCurrentViewName() === 'repos--0'" class="title other">
            <span style="text-transform: capitalize">{{sharedState.since}}</span> trending repositories
            <br>
            <div style="line-height: 0.8em; font-weight: 300; font-size: 20px; color: #8a8f94"><br>{{sharedState.language === '' ? 'all coding languages' : sharedState.language}} </div>
        </div>
    </transition>
    <transition name="head">
        <div v-if="$zircle.getCurrentViewName() === 'repos--0'" class="footer other">
            <span style="font-size: 13px" ><b>Tip: </b> use filter to change coding language & time period</span>
        </div>
    </transition>
    <transition name="head">
        <div v-if="$zircle.getCurrentViewName() === 'repo--0'" class="footer">
            <span style="font-size: 13px" ><b>Tip: </b> use insights to see repo evolution on chart</span>
        </div>
    </transition>
    <transition name="head">
        <div v-if="$zircle.getCurrentViewName() === 'devs--0'" class="title other">
            <span style="text-transform: capitalize">{{sharedState.since}}</span> trending developers
            <br>
            <div style="line-height: 0.8em; font-weight: 300; font-size: 20px; color: #8a8f94"><br>{{sharedState.language === '' ? 'all coding languages' : sharedState.language}} </div>
        </div>
    </transition>
    <transition name="head">
        <div v-if="$zircle.getCurrentViewName() === 'devs--0'" class="footer other">
            <span style="font-size: 13px" ><b>Tip: </b> use filter to change coding language & time period</span>
        </div>
    </transition>
    <transition name="head">
        <div v-if="$zircle.getCurrentViewName() === 'languages--0'" class="title other">
            Coding languages & time period
        </div>
    </transition>
    <transition name="head">
        <div v-if="$zircle.getCurrentViewName() === 'languages--0'" class="footer">
            <span v-if="!sharedState.isSearch" style="font-size: 13px" ><b>Tip: </b> <b>+ languages</b> to find other languages</span>
            <span v-if="sharedState.isSearch" style="font-size: 13px" ><b>Tip: </b> Only coding languages with trending results are shown. Your query may have results trying other time period.</span>
        </div>
    </transition>
    <z-canvas :views="$options.components" @wheel.native="backward" @touchstart.native="startPos" @touchend.native="endPos"></z-canvas>
</div>
</template>

<script>
import home from './components/home'
import repos from './components/repos'
import devs from './components/devs'
import languages from './components/languages'
import repo from './components/repo'
import dev from './components/dev'
import about from './components/about'
import state from './store/state'
export default {
  components: {
    home,
    repos,
    devs,
    languages,
    repo,
    about,
    dev
  },
  data () {
    return {
      sharedState: state.$data,
      startY: {},
      valid: true,
      mouse: []
    }
  },
  methods: {
    startPos (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      this.startY = {
        posY: e.pageY,
        time: new Date().getTime()
      }
    },
    endPos (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      var distY = e.pageY - this.startY.posY
      var elapsedTimeY = new Date().getTime() - this.startY.time
      if (elapsedTimeY <= 500) {
        if (Math.abs(distY) >= 200 && distY < 0) {
          this.$zircle.goBack()
          this.startY = {}
        } else if (Math.abs(distY) >= 200 && distY > 0) {
          // this.$zircle.goBack()
          this.startY = {}
        }
      }
    },
    backward (e) {
      var vm = this
      this.mouse.push(e.timeStamp)
      var delta = e.deltaY
      if (delta > 0 && this.valid === true && (e.timeStamp - this.mouse[0]) > 300) {
        this.valid = false
        this.mouse = []
        this.$zircle.goBack()
        setTimeout(function () {
          vm.valid = true
        }, 1800)
      }
    }
  },
  mounted () {
    var vm = this
    this.$zircle.config({
      style: {
        theme: 'github'
      }
    })
    this.$zircle.setView('home')
    document.body.addEventListener('keyup', function (e) {
      if (e.code === 'Escape') return vm.$zircle.goBack()
    })
  }
}
</script>

<style>
body {
    font-family: 'Google Sans';
    font-weight: 300;
    color: #8a8f94;

}

.title {
    margin-left: 5%;
    position: absolute;
    width: 90%;
    color: #454545;
    font-weight: 700;
    font-size: 32px;
    z-index: 9999;
    opacity: 1;
    line-height: 1.02em;
    pointer-events: none !important;
}

.footer {
    margin-left: 5%;
    position: absolute;
    bottom: 20px;
    width: 90%;
    font-size: 32px;
    pointer-events: none !important;
    color: #454545;
    z-index: 9999;
    opacity: 1;
    text-align: center;
}

.title.home {
    text-align: center;

}

.head-enter {
    opacity: 0;

}

.head-enter-active {
    transition: opacity 2s 0.8s;
}

@import url('https://fonts.googleapis.com/css?family=Google+Sans:300,400,500,700');

@import url('https://use.fontawesome.com/releases/v5.1.0/css/all.css');

.theme-github {
    --shade-color: #8a8f94;
    --primary-color: #454545;
    --accent-color: #454545;
}

a {
    color: #5484f8;

}

.title>a {
    text-decoration: none
}

.z-canvas {
    background-color: white !important;
}

#app {
    position: fixed;
    width: 100%;
    height: 100%
}

/*
  ##Device = Desktops landscape
  ##Screen = 1281px to higher resolution desktops
*/

@media (min-width: 1281px) and (orientation: landscape) {

    .title.other {
        text-align: center;
        top: 80px;
        font-size: 40px !important;
    }

    .title.home {
        text-align: center;
        top: 80px;
        font-size: 40px !important;
    }

    .footer {
        line-height: 1.5em;
    }
      .z-label .inside, .pos, .sub-label {
        font-size: 18px !important;
    }

}

@media (min-width: 1281px) and (orientation: portrait) {

    .title.other {
        text-align: center;
        top: 380px;
        font-size: 40px !important;
    }

    .title.home {
        text-align: center;
        top: 380px;
        font-size: 40px !important;
    }
      .z-label .inside, .pos, .sub-label {
        font-size: 16px !important;
    }

}

/*
  ##Device = Laptops, Desktops landscape
  ##Screen = B/w 1025px to 1280px
*/

@media (min-width: 1025px) and (max-width: 1280px) {

    .title.other {
        text-align: center;
        top: 50px;
        font-size: 40px !important;
    }

    .title.home {
        text-align: center;
        top: 50px;
        font-size: 40px !important;
    }

    .footer {
        line-height: 1.5em;
    }

      .z-label .inside, .pos {
        font-size: 13px !important;
    }

}

/*
  ##Device = Tablets, Ipads (portrait)
  ##Screen = B/w 768px to 1024px
*/

@media (width: 375px) and (orientation: portrait) {

    .title.other {
        text-align: center;
        top: 40px;
        font-size: 25px !important;
    }

    .title.home {
        text-align: center;
        top: 40px
    }

    .footer {
        line-height: 0.5em;
    }

}

/*
  ##Device = Tablets, Ipads (portrait)
  ##Screen = B/w 768px to 1024px
*/

@media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {

    .title.other {
        text-align: center;
        top: 220px;

    }

    .title.home {
        text-align: center;
        top: 220px;

    }
    .z-label .inside, .pos {
        font-size: 13px !important;
    }

}

/*
  ##Device = Tablets, Ipads (landscape)
  ##Screen = B/w 768px to 1024px
*/

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

    .title.other {
        text-align: center;
        top: 50px;

    }

    .title.home {
        text-align: center;
        top: 50px;

    }

    .footer {
        line-height: 1.5em;

    }
    .z-label .inside, .pos {
        font-size: 13px !important;
    }

}

/* iphone x */
@media (width: 812px) and (height: 375px) {

    .title.other {
        text-align: left;
        margin-left: 30px;
        font-size: 18px;
        width: 30%;
        top: calc(5vh);
    }

    .title.home {
        text-align: left;
        margin-left: 28px;
        top: calc(5vh);
        width: 45%
    }

    .footer {
        text-align: left;
        margin-left: 20px;
        font-size: 15px;
        width: 30%;
        line-height: 1.5em;
    }

}

/* pixel xl */
@media (width: 823px) and (height: 411px) {

    .title.other {
        text-align: left;
        margin-left: 28px;
        font-size: 18px;
        width: 30%;
        top: calc(5vh);
    }

    .title.home {
        text-align: left;
        margin-left: 28px;
        top: calc(5vh);
        width: 45%
    }

    .footer {
        text-align: left;
        margin-left: 20px;
        font-size: 15px;
        width: 30%;

        line-height: 1.5em;

    }

}

/*
  ##Device = Low Resolution Tablets, Mobiles (Landscape)
  ##Screen = B/w 481px to 767px
*/

@media (min-width: 481px) and (max-width: 767px) {

    .title.other {
        text-align: left;
        margin-left: 30px;
        font-size: 25px;
        width: 30%;
        top: calc(5vh);

    }

    .title.home {
        text-align: left;
        margin-left: 18px;
        font-size: 25px;
        top: calc(5vh);
        width: 40%;
    }

    .footer {
        text-align: left;
        margin-left: 20px;
        font-size: 15px;
        width: 30%;
        line-height: 1.5em;
    }
    .z-label .inside, .pos {
        font-size: 13px !important;
    }

}

/*
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/

@media (min-width: 320px) and (max-width: 480px) {

    .title.other {
        text-align: center;
        top: calc(10px + 5vh);
    }

    .title.home {
        top: 40px;
    }

    .footer {
        line-height: 0.5em;
    }

    .z-label .inside, .pos {
        font-size: 13px !important;
    }

}
</style>
