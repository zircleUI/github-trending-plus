<template>
  <z-view  class="is-repos" :style="$zircle.getCurrentViewName() === 'repos--0' ? 'border-width: 7px; background-color: var(--accent-color) !important' : 'border-width: 7px; background-color: var(--accent-color) !important'" slider :progress="progress">
      {{msg}}
      <div v-if="sharedState.axiosError !== ''">
        Oops!! {{sharedState.axiosError}}
      </div>
    <div slot="extension" v-if="trending">

      <z-spot v-if="day || !trending"
        button
        class="filter"
        :distance=130
        size='s'
        style="background-color: #D4D7DD;"
        :angle="45"
        label="filter"

        to-view="languages">
           <i style="color: hsl(220, 12%, 25%);" class="fas fa-ellipsis-v"></i>
        </z-spot>

    <div v-if="collection.length > 0 && showResults">

      <z-list
      class="stay"
      style=""
        :items="collection"
        :per-page="5"
        @touchstart.native="startPos"
        @touchmove.native.prevent
        @touchend.native="endPos"
        
        >
        
        <div slot-scope="props"  @mouseenter="showMe(props.index)" >

          <z-spot

            class=" pos numeral"
            size="xs"
            :index="props.index"
            :distance='110'

            style="background-color: transparent; border: none;">
            {{props.position + 1}}˚
          </z-spot>
          <z-spot
          class=" numeral"
            size="xxs"
            :index="props.index"
            :distance='99'
            style="background-color: var(--shade-color); border-color: var(--shade-color)">
          </z-spot>

          <z-spot
            :image-path="props.avatar"
            class="test"
            :distance='55'
            :props="props"
            size=m
            :ref="'res-' + props.index"
            style="border-width: 0px; background-color: rgba(0,0,0,0); border-color: var(--shade-color)"
            :index="props.index"
            :label="show === props.index ? props.name : ''"
            @mouseup.native="hideMe('res-' + props.index)"
           >

            <div slot="extension" class="extra">
              <z-spot v-if="props.diff > 0 && props.prevPos !== -1"

                size="xs"
                :angle="0"
                :distance='100'
                style="border-color: var(--accent-color);; background-color:#54a74c;">
                  <i style=" color: white" class="fas fa-arrow-up"></i>
              </z-spot>

              <z-spot v-if="props.diff > 0 && props.prevPos === -1"
                size="xs"
                :angle="0"
                :distance='100'
                style="font-weight: 700; font-size: 10px; color: hsl(47, 100%, 27%); border-color: var(--accent-color);; background-color:#f2bd00;  ">
                new
              </z-spot>

              <z-spot v-if="props.diff < 0"
                size="xs"
                :angle="0"
                :distance='100'
                style="border-color: var(--accent-color);  background-color:#da482f;  ">
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
// import html2canvas from 'html2canvas'
export default {
  data () {
    return {
      time: false,
      collection: [],
      show: 99,
      sharedState: state.$data,
      showResults: false,
      msg: '',
      startX: {},
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
      if (this.$zircle.getCurrentViewName() === 'repos--0' && this.sharedState.clearResults) {
        this.collection = []
        this.getRepos()
        this.sharedState.clearResults = false
      }
    }
  },
  methods: {
    hideMe (ref) {
      this.$zircle.toView({ to: 'repo', fromSpot: this.$refs[ref], params: { data: this.$refs[ref].$attrs.props } })
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
          this.$zircle.setCurrentPageIndex(this.$zircle.getCurrentPageIndex() + 1)
          this.startX = {}
        } else if (Math.abs(distX) >= 50 && distX > 0) {
          this.$zircle.setCurrentPageIndex(this.$zircle.getCurrentPageIndex() - 1)
          this.startX = {}
        }
      }
    },
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
          vm.msg = ''
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
        axios.get('https://zircle-github-trending-ranking.now.sh/' + rankingDB, { timeout: 12000 }),
        axios.get('https://github-trending-api.now.sh/repositories?since=' + this.sharedState.since + '&language=' + encodeURIComponent(this.sharedState.language), { timeout: 12000 }),
        axios.get('https://github-trending-api.now.sh/developers?since=' + this.sharedState.since + '&language=' + encodeURIComponent(this.sharedState.language), { timeout: 12000 })
      ])
        .then(axios.spread((myjson, github, avatars) => {
          vm.sharedState.axiosError = ''
          vm.collection = []
          var full = github.data.map(function (e, index) {
            var search = myjson.data[myjson.data.length - 1][vm.sharedState.since].repos.find(el => el.name === e.name)
            if (search === undefined) search = { prevPos: -1, diff: 0, stay: 3 }
            var findAvatar = avatars.data.find(function (el) { return el.username === e.author })
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
        .catch((err) => {
          console.log(err)
          vm.sharedState.axiosError = err.message
        })
    }
  },
  mounted () {
    if (this.collection.length === 0) this.getRepos()
  }
}
</script>
<style>
.z-content {
  top: 0 !important;
  left: 0 !important;
  bottom: 0 !important;
  right: 0 !important;
  width: 100% !important;
  height: 100% !important;

}
.z-pagination {
 // opacity: 0;
}
.test{
  border: 3px solid var(--shade-color) !important;
  
}
.test:hover {
  border: 3px solid var(--shade-color) !important;
  
}
a {
  color: white;
}
.test>.z-label.bottom{
 
  
  top: 106% !important;
  
}
.is-repos{
  background-color: white !important
}

.test>.z-label.bottom>.inside {
  border: 1px solid var(--shade-color) !important;
  background-color: var(--accent-color) !important;
  font-size: 13px !important;
  font-weight: 500;
  
  
  color: var(--shade-color)
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
 
@media (max-width: 450px) {
}

</style>
