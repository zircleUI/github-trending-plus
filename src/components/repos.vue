<template>
  <z-view  :style="showResults ? 'border-width: 7px;' : 'border-width: 7px;'" slider :progress="progress">
      {{msg}}
      <div v-if="!trending">
        No trendings for {{sharedState.language}} <br>
        Create something awesome to be on the spot!
      </div>
    <div slot="extension" v-if="trending">

      <z-spot v-if="day || !trending"
        button
        :distance=130
        size='s'
        style="background-color: #D4D7DD;"
        :angle="45"
        label="filter"
        @click.native="collection = []"
        to-view="languages">
           <i style="color: hsl(220, 12%, 25%);" class="fas fa-ellipsis-v"></i>
        </z-spot>

    <div v-if="collection.length > 0 && trending">
      <z-list
        :items="collection"
        :per-page="5">
        <div slot-scope="props"  @mouseenter="showMe(props.index)">
          <z-spot
         
            class="test pos"
            size="xs"
            :index="props.index"
            :distance='110'
            
            style="background-color: transparent; border: none;">
            {{props.position + 1}}˚
          </z-spot>
          <z-spot
          class="test"
            size="xxs"
            :index="props.index"
            :distance='99'
            style="background-color: var(--shade-color); border-color: var(--shade-color)">
          </z-spot>

          <z-spot
            :image-path="props.avatar"
            class="test"
            :distance='60'
            :style="props.avatar === 'none' || !props.avatar ? 'background-color:' + colors[props.index] + '; border-width: 4px;' : 'border-width: 4px'"
            style="color:hsl(217, 4%, 09%); background-color: rgba(0,0,0,0); border-color: var(--shade-color)"
            :index="props.index"
            :label="show === props.index ? props.name : props.name.substring(0,10) + '' + (props.name.length > 13 ? '…' : '')"
            :to-view="{name: 'repo', params: {data: props}}"
           >
            <span v-if="props.avatar === 'none' || !props.avatar" style="color:white; font-weight: bolder; font-size: 20px; text-transform: capitalize;">
                  {{ props.name.substring(0,1) }} {{ props.name.substring(props.name.length -1) }}
                </span>
            <div slot="extension">
              <z-spot v-if="props.diff > 0 && props.prevPos !== -1"
                size="xs"
                :angle="0"
                :distance='100'
                style="border-color: #454545; background-color:#54a74c;">
                  <i style=" color: white" class="fas fa-arrow-up"></i>
              </z-spot>

              <z-spot v-if="props.diff > 0 && props.prevPos === -1"
                size="xs"
                :angle="0"
                :distance='100'
                style="font-weight: 700; font-size: 10px; color: hsl(47, 100%, 27%); border-color: #454545; background-color:#f2bd00;  ">
                new
              </z-spot>

              <z-spot v-if="props.diff < 0"
                size="xs"
                :angle="0"
                :distance='100'
                style="border-color: #454545;  background-color:#da482f;  ">
                  <i style=" color: white" class="fas fa-arrow-down"></i>
              </z-spot>
            </div>
          </z-spot>

        </div>
        </z-list>
      </div>
      
    </div>
  </z-view>
</template>
<script>
import state from '../store/state'
import axios from 'axios'
import anime from 'animejs'
export default {
  data () {
    return {
      time: false,
      collection: [],
      show: 99,
      sharedState: state.$data,
      showResults: false,
      msg: '',
      progress: 0,
      day: false,
      day0: false,
      day1: false,
      lang: false,
      trending: true,
      vlang: state.$data.language,
      vsince: state.$data.since,
      colors: ['#da482f', '#54a74c', '#f2bd00', '#5484f8']
    }
  },
  computed: {
    check () {
      if (this.vlang !== this.sharedState.language || this.vsince !== this.sharedState.since) {
        return true
      } else {
        return false
      }
    },
    viewn () {
      return this.$zircle.getCurrentViewName()
    },
    page () {
      return this.$zircle.getCurrentPageIndex()
    },
    line1 () {
      if (this.$refs.line1) {
        var tt = this.$refs.line1.$el.getBoundingClientRect()
        console.log(tt)
        return tt
      } else {
        return {
          left: -80,
          top: 80
        }
      }
    }
  },
  watch: {
    page: function () {
      this.animee()
    },
    viewn: function () {
      if (this.$zircle.getCurrentViewName() === 'repos--0') {
        this.getRepos()
      }
    }
  },
  methods: {
    animee2 () {
      var els = document.querySelectorAll('.test')
      var els2 = document.querySelectorAll('.z-pagination')
      var pag = anime({
        targets: els2,
        opacity: [0, 1],
        duration: 0
      })
      anime({
        targets: els,
        opacity: [0, 1],
        duration: 0,
        complete: function () {
          return pag
        }
      })
    },
    animee () {
      var els = document.querySelectorAll('.test')
      var els2 = document.querySelectorAll('.z-pagination')
      var pag = anime({
        targets: els2,
        opacity: [0, 1],
        duration: function (el, i) {
          return 500 + (i * 200)
        }
      })
      anime({
        targets: els,
        opacity: [0, 1],
        duration: function (el, i) {
          return 2000 + (i * 100)
        },
        delay: function (e, i) { return i * 50 },
        complete: function () {
          return pag
        }
      })
    },
    init () {
      this.progress = 1
      this.msg = 'Fetching data...'
      var vm = this
      var id = setInterval(function () {
        if (vm.progress >= 100) {
          clearInterval(id)
          vm.progress = 0
          vm.msg = ''
          vm.showResults = true
          vm.animee()
        } else if (vm.progress === 18) {
          vm.day0 = true
          vm.progress++
        } else if (vm.progress === 22) {
          vm.day1 = true
          vm.progress++
        } else if (vm.progress === 70) {
          vm.day = true
          vm.progress++
        } else if (vm.progress === 80) {
          vm.msg = 'Preparing to show...'
          vm.lang = true
          vm.progress++
        } else {
          vm.progress++
        }
      }, 20)
    },
    init2 () {
      this.progress = 1
      this.msg = 'Fetching data...'
      var vm = this
      var id = setInterval(function () {
        if (vm.progress >= 1) {
          clearInterval(id)
          vm.progress = 0
          vm.msg = ''
          vm.showResults = true
          vm.animee2()
          vm.day = true
          vm.day1 = true
          vm.day0 = true
          vm.lang = true
        } else {
          vm.progress++
        }
      }, 0)
    },
    showMe (index) {
      if (this.show === index) {
        this.show = 99
      } else {
        this.show = index
      }
    },
    getRepos () {
      var vm = this
      var rankingDB = '8d2zo'
      if (this.sharedState.language === 'vue') rankingDB = '9dv7w'
      if (this.sharedState.language === '') rankingDB = '8d2zo'
      if (this.sharedState.language === 'vue') rankingDB = '9dv7w'
      if (this.sharedState.language === 'html') rankingDB = 'oxbng'
      if (this.sharedState.language === 'java') rankingDB = '1eiynw'
      if (this.sharedState.language === 'javascript') rankingDB = 'j14rg'
      if (this.sharedState.language === 'php') rankingDB = 'jmkd8'
      if (this.sharedState.language === 'python') rankingDB = '181c64'
      if (this.sharedState.language === 'ruby') rankingDB = '139vbw'
      if (this.sharedState.language === 'c++') rankingDB = '1frz18'
      if (this.sharedState.language === 'typescript') rankingDB = 'sk2fw'
      if (this.sharedState.language === 'rust') rankingDB = '1b0i70'
      if (this.sharedState.language === 'go') rankingDB = 'zrmks'
      if (this.sharedState.language === 'swift') rankingDB = '6ldxo'
      if (this.sharedState.language === 'css') rankingDB = 'v05qk'
      if (this.sharedState.language === 'shell') rankingDB = '1e213g'
      axios.all([
        axios.get('https://zircle-github-trending-ranking.now.sh/' + rankingDB),
        axios.get('https://github-trending-api.now.sh/repositories?since=' + this.sharedState.since + '&language=' + encodeURIComponent(this.sharedState.language)),
        axios.get('https://github-trending-api.now.sh/developers?since=' + this.sharedState.since + '&language=' + encodeURIComponent(this.sharedState.language))
      ])
        .then(axios.spread((myjson, github, avatars) => {
          vm.collection = []
          var full = github.data.map(function (e, index) {
            var search = myjson.data[myjson.data.length - 1][vm.sharedState.since].repos.find(el => el.name === e.name)
            if (search === undefined) search = { prevPos: -1, diff: 0, stay: 3 }
            var findAvatar = avatars.data.find(function (el) { return el.username === e.author})
            if (findAvatar === undefined) {
              findAvatar = {}
              e.builtBy.length > 0 ? findAvatar['avatar'] = e.builtBy[0]['avatar'] : findAvatar['avatar'] = 'https://avatars1.githubusercontent.com/u/29514947?s=40&v=4'
              findAvatar.avatar = findAvatar.avatar.replace(/s=40/gi, 's=200')
            } else {
              findAvatar.avatar = findAvatar.avatar.replace(/s=96/gi, 's=200')
            }
            return {
              position: index,
              author: e.author,
              name: e.name,
              url: e.url,
              description: e.description,
              language: e.language,
              stars: e.stars,
              forks: e.forks,
              avatar: findAvatar.avatar,
              currentPeriodStars: e.currentPeriodStars,
              prevPos: search.prevPos,
              diff: search.diff,
              stay: search.stay
            }
          })
          if (full.length > 0) {
            vm.collection = full
            if (vm.check) {
              vm.vlang = vm.sharedState.language
              vm.vsince = vm.sharedState.since
              vm.init()
            } else if (!vm.check && vm.sharedState.initRepos) {
              vm.sharedState.initRepos = false
              vm.init()
            } else {
              vm.init2()
            }
          } else {
            vm.trending = false
          }
          
        }))
    }
  },
  mounted () {
    this.getRepos()
  }
}
</script>
<style>
.test {
 opacity: 0;
}
.z-pagination {
 opacity: 0;
}
a {
  color: white;
}
.test>.z-label.bottom>.inside {
  background-color: transparent;
  font-size: 13px !important;
  top: 105% !important;
  color: white
}
.z-label.right>.inside{
background-color: transparent !important;
color: #606368
}
.z-label.right {

  background-color: transparent;
  font-size: 15px !important;
  background-color: rgba(0,0,0,0) !important;

}
.pos{
 
  font-weight: 700;
  font-size: 16px;
}
 .z-label.bottom > .inside {
    background-color: transparent !important;
 }

@media (max-width: 450px) {
}

</style>
