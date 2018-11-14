<template>
<z-view size=xxl style="background-color: white; border-width: 7px" :style="'border-color:' + sharedState.colorMe.main">
    <img slot=image :src="info.avatar" width="100%" style="opacity: 0.3" />
    <div class="super-label" :style="'z-index: 10; color:' + sharedState.colorMe.sec">
        <span :style="'color:' + sharedState.colorMe.sec"> {{info.name}} <span style="word-break: break-word;font-weight: 300;" :style="'color:' + sharedState.colorMe.sec"> by {{info.author}}</span> </span>
    </div>
    <div v-if="activePage" class="label" :style="'z-index: 10; color:' + sharedState.colorMe.sec">
        {{info.description}}
    </div>
    <div v-if="activePage" style="position: absolute; left: 0; bottom: 0; z-index: 90;font-weight: 300; padding-top: 10px;padding-bottom: 50px;background-color: var(--shade-color); color: var(--accent-color); margin: 0; height: 20%; width: 100%;">
        <center>
            <div class="sub-label" style="overflow: hidden">
                <span style="width: 33%; vertical-align: top"><i class="fas fa-star"></i> {{info.stars > 999 ? Math.round((info.stars / 1000) * 10 ) / 10 + 'k' : ' ' + info.stars}}</span>
                <span style="width: 33%"><i class="fas fa-code-branch"> </i> {{info.forks > 999 ? Math.round((info.forks / 1000) * 10 ) / 10 + 'k' : ' ' + info.forks}}</span>
                <span style="width: 33%"><i class="fas fa-code"></i> {{info.language === '' ? 'not defined' : info.language}}</span>
            </div>
        </center>
    </div>
    <div slot="extension">
        <z-spot button class="butt2" size=s style="font-size: 25px;color: white; border-color:var(--shade-color);background-color: var(--shade-color);" label="source code" :distance="120" :angle="135" @click.native="toLink(info.url)">
            <i class="fab fa-github-alt"></i>
        </z-spot>
        <z-spot button class="butt2" size=s style="font-size: 25px;color: white; border-color:var(--shade-color);background-color: var(--shade-color);" label="follow zircle" :distance="120" :angle="45" @click.native="toLink('https://twitter.com/zircle_ui')">
            <i class="fab fa-twitter"></i>
        </z-spot>
    </div>
</z-view>
</template>

<script>
import axios from 'axios'

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
    toLink (url) {
      return window.open(url, '_blank')
    },
    getZircle () {
      return axios.get('https://api.github.com/repos/zircleui/github-trending-plus').then(
        function (response) {
          return {
            avatar: response.data.owner.avatar_url,
            description: response.data.description,
            url: response.data.html_url,
            language: response.data.language,
            author: response.data.owner.login,
            name: response.data.name,
            forks: response.data.forks_count,
            stars: response.data.stargazers_count
          }
        }
      )
    }
  },
  computed: {},
  mounted () {
    var vm = this
    this.getZircle().then(function (e) {
      vm.info = e
    })
  }
}
</script>

<style>
.emit {
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

.label {
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
    height: 40%;
    font-size: calc(10px + 0.8vw);
    overflow: hidden;
    max-lines: 3
}

.sub-label {
    width: 55%;
    font-weight: 400;
    display: flex;
    align-items: top;
    justify-content: center;
    font-size: calc(7px + 0.8vw);

}

.super-label {
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
    font-size: calc(15px + 0.8vw);
}

.icons {
    font-size: calc(1vw + 1.2vh + 1.2vmin);
}
</style>
