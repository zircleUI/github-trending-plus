<template>
<z-view class="is-repos" :style="$zircle.getCurrentViewName() === 'devs--0' ? 'border-width: 3px; background-color: white !important' : 'border-width: 3px; background-color: white !important'">
    {{msg}}
    <div v-if="sharedState.axiosError !== ''">
        Oops!! {{sharedState.axiosError}}
    </div>
    <div v-if="collection.length === 0 && sharedState.axiosError === ''">
        <i class="fas fa-spinner fa-spin fa-2x"></i>
    </div>
    <div slot="extension" v-if="trending">
        <z-spot v-if="day || !trending" class="meteors" :distance=120 size=s style="color: white; border-color: white; border-width: 0px;background-color: var(--shade-color);" :angle="45" to-view="languages">
            <i style="" class="fas fa-ellipsis-v"></i>
        </z-spot>
        <z-spot v-if="$zircle.getCurrentPageIndex() <= 3 && collection.length > 0" button class="filter buttons" :distance=115 size='xs' style="color: white; border-color: white; border-width: 0px;background-color: var(--shade-color);"  :angle="0" @mouseup.native="$zircle.setCurrentPageIndex($zircle.getCurrentPageIndex() + 1)">
            <i class="fas fa-arrow-right"></i>
        </z-spot>
        <z-spot v-if="$zircle.getCurrentPageIndex() >= 1" button class="filter buttons" :distance=115 size='xs' style="color: white; border-color: white; border-width: 0px;background-color: var(--shade-color);"  :angle="180" @mouseup.native="$zircle.setCurrentPageIndex($zircle.getCurrentPageIndex() - 1)">
            <i style="" class="fas fa-arrow-left"></i>
        </z-spot>
        <div v-if="collection.length > 0">
            <z-list class="stay" style="" :items="collection" :per-page="5" @touchstart.native="startPos" @touchend.native="endPos">
                <div slot-scope="props" @mouseenter="showMe(props.position)">
                    <z-spot :image-path="props.avatar" class="test" :distance='61' :props="props" size=m :ref="'dev-' + props.position" style="border-color: var(--shade-color); border-width: 3px; background-color: white;" :style="$zircle.getCurrentViewName() === 'devs--0' && hideThis ===  'dev-' + props.position ? 'opacity: 1' : ''" :index="props.position" :label="show === props.position ? props.name : trimLabels(props.position, props.name)" @click.native="hideMe('dev-' + props.position)" @mouseup.native="sendMe('dev-' + props.position)">
                        <div slot="extension" class="extra">
                            <z-spot class="pos numeral" size="xs" :index="props.position" :distance="100" :angle="-135" style="">
                              <span >{{$zircle.getComponentWidth('xxl') > 260 ? getOrdinal(props.position + 1) : props.position + 1}}</span>
                          </z-spot>
                            <z-spot v-if="props.diff > 0 && props.prevPos !== -1" size="xs" :angle="0" :distance='100' style="border-color: white; background-color:#54a74c;">
                                <i style=" color: white" class="fas fa-arrow-up"></i>
                            </z-spot>
                            <z-spot v-if="props.diff > 0 && props.prevPos === -1" size="xs" :angle="0" :distance='100' style="font-weight: 700; font-size: 10px; color: hsl(47, 100%, 27%); border-color: white; background-color:#f2bd00;  ">
                                new
                            </z-spot>
                            <z-spot v-if="props.diff < 0" size="xs" :angle="0" :distance='100' style="border-color: white;  background-color:#da482f;  ">
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
      hideThis: '',
      prevPage: 0,
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
      if (this.prevPage < this.page) this.animee()
      this.prevPage = this.page
    },
    viewn: function () {
      if (this.$zircle.getCurrentViewName() === 'devs--0' && this.sharedState.clearResults) {
        this.collection = []
        this.getDevs()
        this.sharedState.clearResults = false
      }
    }
  },
  methods: {
    getOrdinal (n) {
      var s = ['th', 'st', 'nd', 'rd']
      var v = n % 100
      return n + (s[(v - 20) % 10] || s[v] || s[0])
    },
    trimLabels (index, name) {
      if (index === 2 || index === 3) {
        return name.length > 7 ? name.substring(0, 4) + '…' : name
      } else {
        return name.length > 11 ? name.substring(0, 7) + '…' : name
      }
    },
    hideMe (ref) {
      this.hideThis = ref
      this.$refs[ref].$el.style.opacity = 0
    },
    sendMe (ref) {
      this.$zircle.toView({
        to: 'dev',
        fromSpot: this.$refs[ref],
        params: {
          data: this.$refs[ref].$attrs.props
        }
      })
    },
    startPos (e) {
      if (e.touches.length === 1) {
        // just one finger touched
        this.startX = e.touches.item(0).clientX
      } else {
        // a second finger hit the screen, abort the touch
        this.startX = null
      }
    },
    endPos (e) {
      var offset = 60
      if (this.startX) {
        // the only finger that hit the screen left it
        var end = e.changedTouches.item(0).clientX

        if (end < this.startX - offset && this.$zircle.getCurrentPageIndex() <= 3) {
          // a left -> right swipe
          this.$zircle.setCurrentPageIndex(this.$zircle.getCurrentPageIndex() + 1)
        }
        if (end > this.startX + offset && this.$zircle.getCurrentPageIndex() >= 1) {
          // a right -> left swipe
          this.$zircle.setCurrentPageIndex(this.$zircle.getCurrentPageIndex() - 1)
        }
      }
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
          return 2000 + (i * 200)
        },
        delay: function (e, i) {
          return i * 120
        },
        complete: function () {
          return pag
        }
      })
    },
    init () {
      this.animee()
      this.day = true
    },
    showMe (index) {
      if (this.show === index) {
        this.show = 99
      } else {
        this.show = index
      }
    },
    getDevs () {
      var vm = this
      var rankingDB = '8d2zo'
      switch (this.sharedState.language) {
        case '':
          rankingDB = '8d2zo'
          this.sharedState.languageTracked = false
          break
        case 'vue':
          rankingDB = '9dv7w'
          this.sharedState.languageTracked = false
          break
        case 'html':
          rankingDB = 'oxbng'
          this.sharedState.languageTracked = false
          break
        case 'java':
          rankingDB = '1eiynw'
          this.sharedState.languageTracked = false
          break
        case 'javascript':
          rankingDB = 'j14rg'
          this.sharedState.languageTracked = false
          break
        case 'php':
          rankingDB = 'jmkd8'
          this.sharedState.languageTracked = false
          break
        case 'python':
          rankingDB = '181c64'
          this.sharedState.languageTracked = false
          break
        case 'ruby':
          rankingDB = '139vbw'
          this.sharedState.languageTracked = false
          break
        case 'c++':
          rankingDB = '1frz18'
          this.sharedState.languageTracked = false
          break
        case 'typescript':
          rankingDB = 'sk2fw'
          this.sharedState.languageTracked = false
          break
        case 'rust':
          rankingDB = '1b0i70'
          this.sharedState.languageTracked = false
          break
        case 'go':
          rankingDB = 'zrmks'
          this.sharedState.languageTracked = false
          break
        case 'swift':
          rankingDB = '6ldxo'
          this.sharedState.languageTracked = false
          break
        case 'css':
          rankingDB = 'v05qk'
          this.sharedState.languageTracked = false
          break
        case 'shell':
          rankingDB = '1e213g'
          this.sharedState.languageTracked = false
          break
        default:
          this.sharedState.languageTracked = true
      }
      axios.all([
        axios.get('https://zircle-github-trending-ranking.now.sh/' + rankingDB),
        axios.get('https://github-trending-api.now.sh/developers?since=' + this.sharedState.since + '&language=' + encodeURIComponent(this.sharedState.language))
      ])
        .then(axios.spread((myjson, github) => {
          vm.sharedState.axiosError = ''
          vm.collection = []
          var full = github.data.map(function (e, index) {
            var updated = myjson.data[myjson.data.length - 1].timestamp
            var search = myjson.data[myjson.data.length - 1][vm.sharedState.since].devs.find(el => el.username === e.username)
            if (search === undefined || vm.sharedState.languageTracked === true) {
              search = {
                prevPos: -1,
                diff: 0,
                stay: 3
              }
            }
            e.avatar = e.avatar.replace(/s=96/gi, 's=200')
            return {
              updated: updated,
              position: index,
              username: e.username,
              name: e.username,
              url: e.url,
              avatar: e.avatar,
              prevPos: search.prevPos,
              diff: search.diff,
              stay: search.stay
            }
          })
          if (full.length > 0) {
            vm.collection = full
            vm.init()
          } else {
            vm.day = true
            vm.sharedState.axiosError = 'No trending developers for ' + vm.sharedState.language + '. Try another language/time'
          }
        }))
        .catch((err) => {
          console.log(err)
          vm.sharedState.axiosError = err.message
        })
    }
  },
  mounted () {
    this.sharedState.axiosError = ''
    if (this.collection.length === 0) this.getDevs()
  }
}
</script>
