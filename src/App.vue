<template>
  <div id="app">
    <span style="z-index:999; position: absolute; top: 10px; right: 10px; font-weight: 500; font-size: 12px" ><span v-if="$zircle.getCurrentViewName() !== 'home--0'">Github trending plus  |  </span> by <a href="https://github.com/zircleui/zircleui" target="_blank"> <img style="vertical-align:middle" src="zircle.png" width="13px"/>  zircle</a> </span>
    <transition name="head">
      <div v-if="$zircle.getCurrentViewName() === 'home--0'" class="title home">
        Github trending <span :style="'color:' + sharedState.colorMe.main">plus</span>
        <br>
        <div style="line-height: 0.9em; font-weight: 300; font-size: 20px; color: #8a8f94" ><br><span style="text-transform: capitalize">{{sharedState.since}}</span> repos & devs for {{sharedState.language === '' ? 'all coding languages' : sharedState.language}}</div>
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
        <div style="line-height: 0.9em; font-size: 20px;" ><br><span style="text-transform: capitalize">{{sharedState.since}}</span> trending repositories
        <br>
        <div style="line-height: 0.8em; font-weight: 300; font-size: 18px; color: #8a8f94" ><br>{{sharedState.language === '' ? 'all coding languages' : sharedState.language}} </div>
      </div>

        <!-- <span style="text-transform: capitalize">{{sharedState.since}}</span> trending repositories <br> <span style="font-weight: 300">{{sharedState.language === '' ? 'all code languages' : sharedState.language}}</span> -->
      </div>
    </transition>
    <transition name="head">
    <div v-if="$zircle.getCurrentViewName() === 'repos--0'" class="footer other">
          <span style="font-size: 13px" ><b>Tip: </b> use filter to change coding language & time period</span>
      </div>
    </transition>

     <transition name="head">
    <div v-if="$zircle.getCurrentViewName() === 'languages--0'" class="title other">
        Select a coding language and a time period
      </div>
    </transition>
    <transition name="head">
    <div v-if="$zircle.getCurrentViewName() === 'languages--0'" class="footer">
          <span style="font-size: 13px" ><b>Tip: </b> use search to find other languages</span>
      </div>
    </transition>
    
    <z-canvas :views="$options.components"></z-canvas>
  </div>
</template>

<script>
import home from './components/home'
import repos from './components/repos'
import devs from './components/devs'
import languages from './components/languages'
import repo from './components/repo'
import state from './store/state'
export default {
  components: {
    home,
    repos,
    devs,
    languages,
    repo
  },
  data () {
    return {
      sharedState: state.$data
    }
  },
  mounted () {
    this.$zircle.config({
      style: { theme: 'github' }
    })
    this.$zircle.setView('home')
  }
}
</script>
<style>
body {
  font-family: 'Google Sans';
  font-weight: 300;
  color:#8a8f94;

}
.title {
  position: absolute;
  width: 100%;
  color: #454545;
  font-weight: 700;
  font-size: 32px;
  z-index: 9999;
  opacity: 1;
  line-height: 1.02em;
  opacity: 0.7;
}

.footer {
  position: absolute;
  bottom: 20px;
  width: 100%;
  font-size: 32px;

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
.theme-github{
  --shade-color: #d1d5da;
  --primary-color: #454545;
  --accent-color:  #d1d5da;
}
a {
  color: #5484f8;

}

.title > a {
  // color: #454545;
  text-decoration: none

}
.z-canvas{
background-color: white !important;
/* background: rgba(136,137,138,1);
background: -moz-radial-gradient(center, circle cover, rgba(136,137,138,1) 0%, rgba(36,41,46,1) 100%);
background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, rgba(136,137,138,1)), color-stop(100%, rgba(36,41,46,1)));
background: -webkit-radial-gradient(center, circle cover, rgba(136,137,138,1) 0%, rgba(36,41,46,1) 100%);
background: -o-radial-gradient(center, circle cover, rgba(136,137,138,1) 0%, rgba(36,41,46,1) 100%);
background: -ms-radial-gradient(center, circle cover, rgba(136,137,138,1) 0%, rgba(36,41,46,1) 100%);
background: radial-gradient(circle at center, rgba(136,137,138,1) 0%, rgba(36,41,46,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#88898a', endColorstr='#24292e', GradientType=1 ); */
}

/*
  ##Device = Desktops landscape
  ##Screen = 1281px to higher resolution desktops
*/

@media (min-width: 1281px) {

  .title.other {
    text-align: center;
    top: calc(10px + 5vh);
    }
  .title.home {
    text-align: center;
    top: 80px;
  }

}

/*
  ##Device = Laptops, Desktops landscape
  ##Screen = B/w 1025px to 1280px
*/

@media (min-width: 1025px) and (max-width: 1280px) {

  .title.other {
    text-align: center;
    top: calc(10px + 5vh);
    }
  .title.home {
    text-align: center;
    top: 50px
  }

}

/*
  ##Device = Tablets, Ipads (portrait)
  ##Screen = B/w 768px to 1024px
*/

@media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait){

 .title.other {
    text-align: center;
    top: calc(10px + 5vh);
    }
  .title.home {
    text-align: center;
    top: 50px
  }

}

/*
  ##Device = Tablets, Ipads (landscape)
  ##Screen = B/w 768px to 1024px
*/

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

  .title.other {
    text-align: center;

    top: calc(5vh);
  }
  .title.home {
    text-align: center;
    top: 50px
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
    font-size: 18px;
    width: 30%;
    top: calc(5vh);

  }
  .title.home {
    text-align: left;
    margin-left: 18px;
    top: calc(5vh);
    width: 45%;
  }
  .footer {
    text-align: left;
    margin-left: 20px;
    font-size: 15px;
    width: 30%;
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

}
</style>
