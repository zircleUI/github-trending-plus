<template>
  <z-view style="border-width: 7px;">
    <div v-if="sharedState.axiosError !== ''">
        Oops!! {{sharedState.axiosError}}
      </div>
    <div v-if="search">
      <input type="text" placeholder="type a language ..." :value="language"
      @input="searchLanguages($event.target.value)">
    </div>
    <div slot="extension">
      <div v-if="results.length && search && $zircle.getCurrentViewName() === 'languages--0'">
      <z-spot

      v-for="(language, index) in wt"
      button
      :key="'lang' + index"
      :distance="60"
      :angle="-90 + (360 / wt.length * index)"
      size="xs"
      class="test1 accent"
      :label="language.name"
      @click.native="sharedState.language = language.urlParam"
      style="border: none"
      :style="sharedState.language === language.urlParam ? 'background-color: #f2bd00;' : ''"

      >
      </z-spot>
      </div>
    <z-spot button
            size='s'
            :angle="45"
            label="+ languages"
            :distance="120"
            @click.native="search = !search"
            >
            <i class="fas fa-search"></i>
          </z-spot>
          <div v-if="popular.length && !search && $zircle.getCurrentViewName() === 'languages--0'">
     <z-list
        :items="popular"
        :per-page="8">
          <z-spot
           class="test1"
            button
            size='xs'
            :distance='60'
            slot-scope="props"

            :index="props.index"
            :label="props.name"

            @click.native="sharedState.language = props.urlParam"
            style="border: none"
            :style="sharedState.language === props.urlParam ? 'background-color:#f2bd00;' : ''"
            >
          </z-spot>
      </z-list>
    </div>
      <z-spot button size=xs :distance=120 :angle=-45 label="today"
      style="border: none; color: white"
      :style="sharedState.since === 'daily' ? 'background-color: #5484f8' : ''"
      @click.native="sharedState.since = 'daily'" >T</z-spot>

      <z-spot button size=xs :distance=120 :angle=-20 label="this week"
      style="border: none; color: white"
      :style="sharedState.since === 'weekly' ? 'background-color: #5484f8' : ''"
      @click.native="sharedState.since = 'weekly'" >W</z-spot>

      <z-spot button size=xs :distance=120 :angle=5 label="this month"
      style="border: none; color: white"
      :style="sharedState.since === 'monthly' ? 'background-color: #5484f8' : ''"
      @click.native="sharedState.since = 'monthly'" >M</z-spot>
    </div>
  </z-view>
</template>
<script>
// :angle="(180 - (180 - ($zircle.getNumberOfPages() * 10))) / $zircle.getNumberOfPages() * ($zircle.getNumberOfPages() - index) + ((180 - (180 - (180 - ($zircle.getNumberOfPages() * 10)))) - ((180 - (180 - ($zircle.getNumberOfPages() * 10))) / $zircle.getNumberOfPages())) / 2"
import state from '../store/state'
import axios from 'axios'
function fetchGalleries (results, stateError) {
  return Promise.all(results.map(record => {
    return axios.get('https://github-trending-api.now.sh/repositories?language=' + encodeURIComponent(record.urlParam))
      .catch((err) => {
        console.log(err)
        stateError = err.message
      })
  })).then(gal => {
    var papa = gal.filter(function (el) {
      return el.data.length > 0
    })
    console.log(papa.map(a => a.data[0].language))
    return papa.map(a => a.data[0].language)
  })
}
export default {
  data () {
    return {
      time: false,
      popular: [],
      other: [],
      results: [],
      query: '',
      wt: [],
      search: false,
      sharedState: state.$data
    }
  },
  computed: {
    viewn () {
      return this.$zircle.getCurrentViewName()
    },
    language () {
      return this.query
    }
  },
  watch: {
    viewn: function () {
      // if (this.$zircle.getCurrentViewName() === 'repos--0') {
      this.popular = []
      this.results = []
      // }
    }
  },
  methods: {
    searchLanguages (e) {
      var vm = this
      if (e !== '') {
        var input = e.toLowerCase()
        this.results = this.other.filter(function (el) {
          var data = el.name.toLowerCase()
          return data.indexOf(input) > -1
        }).slice(-8)
        var papa = fetchGalleries(vm.results, vm.sharedState.axiosError)
        papa.then(result => {
          vm.wt = result.map(a => {
            var url = a.replace(/\s+/g, '-').toLowerCase()
            return {
              name: a,
              urlParam: url
            }
          })
        })
        this.query = e
      } else {
        this.query = ''
        this.results = []
      }
    },
    getLanguages () {
      var vm = this
      axios
        .get('https://github-trending-api.now.sh/languages')
        .then(function (response) {
          var res = response.data.popular
          res.push({ name: 'all code lang.', urlParam: '' })
          vm.popular = res
          vm.other = response.data.all
        })
        .catch((err) => {
          console.log(err)
          this.sharedState.axiosError = err.message
        })
    }
  },
  mounted () {
    this.getLanguages()
  }
}
</script>
<style>
.test1>.z-label.bottom>.inside {
  background-color: transparent;
  font-size: 13px !important;
  top: 105% !important;
  color: white
}
</style>
