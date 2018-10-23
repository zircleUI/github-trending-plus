<template>
  <z-view>
    <div slot="extension">
    <z-spot

        button
        size="xxs"
        :distance="100"
        :angle="225"
        label="trending devs"
        label-pos="left"
        >
        </z-spot>

        <z-spot
        button
        size="xxs"
        :distance="100"
        :angle="205"
        :label="sharedState.since"
        label-pos="left"
        >
        </z-spot>

        <z-spot
        button
        size="xxs"
        :distance="100"
        :angle="185"
        :label="sharedState.language === '' ? 'all languages' : sharedState.language"
        label-pos="left"
        >
        </z-spot>
     <z-list v-if="collection.length > 1"
        :items="collection"
        :per-page="5">
          <z-spot
            :distance='60'
            slot-scope="props"
            :index="props.index"
            :label="props.username"
            :image-path="props.avatar"
            @click.native="showMe(props.index)"
            >
            <div slot=extension >
              <div v-show="show === props.index && props.index >= 0 && props.index < 3" style="position: absolute;
                opacity: 1;
                width: 1px;
                line-height: 1.7;

                border-left: 1px dashed gray;
                margin: 50% 0 0 50%;
                font-size: 13px;
                transform-origin: 0 0;"
                :style="{
                  height: '60px',
                  transform: 'rotate(225deg) translate(0px, ' + $zircle.getComponentWidth('m') / 2 + 'px)'
                }"
                >
                  <div style="position: absolute;
                  opacity: 1;
                  width: 200px;
                  min-height: 20px;
                  border-left: 2px solid red;
                  margin: 50% 0 0 50%;
                  border-radius: 5px;
                  padding: 9px;
                  background-color: rgba(0,0,0, 0.6);

                  text-align: left;
                  transform-origin: 0 0;"
                  :style="{transform: 'rotate(135deg) translate(' + $zircle.getComponentWidth('m') / 2 + 'px, -50px)'}">
                   <b>Url: </b> <a :href="props.url" target="_blank">{{props.url}}</a> <br>
                  <b>Username:</b> {{props.username}}
                  </div>
                </div>
                <div v-show="show === props.index && props.index >= 3" style="position: absolute;
                opacity: 1;
                width: 1px;
                border-left: 1px dashed gray;
                margin: 50% 0 0 50%;
                font-size: 13px;
                line-height: 1.7;
                transform-origin: 0 0;"
                :style="{
                  height: '60px',
                  transform: 'rotate(135deg) translate(0px, ' + $zircle.getComponentWidth('m') / 2 + 'px)'
                }"
                >
                  <div style="position: absolute;
                  opacity: 1;
                  width: 200px;
                  min-height: 20px;
                  border-right: 2px solid red;
                  margin: 50% 0 0 50%;
                  border-radius: 5px;
                  padding: 9px;
                  background-color: rgba(0,0,0, 0.6);
                  text-align: right;
                  transform-origin: 0 0;"
                  :style="{transform: 'rotate(225deg) translate(-245px, -50px)'}">
                  <b>Url: </b> <a :href="props.url" target="_blank">{{props.url}}</a> <br>
                  <b>Username:</b> {{props.username}}
                  </div>
                </div>
              <z-spot
              size="xs"
              :angle="135"
              style="border: none; background-color: black;">
                <i :class="props.position === 0 ? 'fas fa-trophy' : props.position > 0 &&  props.position < 3 ? 'fas fa-medal' : 'fas fa-award'" :style="props.position === 0 ? 'color: gold' : props.position === 1 ? 'color: silver' : props.position === 2 ? 'color: peru' : 'color: green'"></i>
              </z-spot>

              <z-spot v-if="props.diff > 0 && props.prevPos !== -1"
              size="xs"
              :angle="0"
              style="font-size: 12px; border: none; background-color: black;  color:green;">
                <i class="fas fa-caret-up" style="font-size: 10px; color:green;"></i><br>
                {{props.diff}}
                <z-spot
                  slot="extension"
                  size="xxs"
                  :angle="-100"
                  :distance='props.position === 0 ? 100 : 100'
                  style="font-size: 12px; border: none; background-color: black;">
                  {{ (props.position + 1) }}
                  </z-spot>
              </z-spot>
              <z-spot v-if="props.diff > 0 && props.prevPos === -1"
              size="xs"
              :angle="0"
              style="font-size: 12px; border: none; background-color: black;  color:yellow;">
                <i class="fas fa-smile" style="font-size: 10px; color:yellow;"></i><br>
               new
               <z-spot
                  slot="extension"
                  size="xxs"
                  :angle="-100"
                  :distance='props.position === 0 ? 100 : 100'
                  style="font-size: 12px; border: none; background-color: black;">
                  {{ (props.position + 1) }}
                  </z-spot>
              </z-spot>
              <z-spot v-if="props.diff === 0"
              size="xs"
              :angle="0"
              style="font-size: 12px; border: none; background-color: black;  color:orange;">
                <i class="fas fa-equals" style="font-size: 10px; color:orange;"></i><br>
                <z-spot
                  slot="extension"
                  size="xxs"
                  :angle="-100"
                  :distance='props.position === 0 ? 100 : 100'
                  style="font-size: 12px; border: none; background-color: black;">
                  {{ (props.position + 1) }}
                  </z-spot>
              </z-spot>
              <z-spot v-if="props.diff < 0"
              size="xs"
              :angle="0"
              style="font-size: 12px; border: none; background-color: black;  color:red;">
                {{props.diff}}
                <i class="fas fa-caret-down" style="font-size: 10px; color:red;"></i><br>
                <z-spot
                  slot="extension"
                  size="xxs"
                  :angle="-100"
                  :distance='props.position === 0 ? 100 : 100'
                  style="font-size: 12px; border: none; background-color: black;">
                  {{ (props.position + 1) }}
                  </z-spot>
              </z-spot>
            </div>
          </z-spot>
      </z-list>
    </div>
  </z-view>
</template>
<script>
import state from '../store/state'
import axios from 'axios'
export default {
  data () {
    return {
      time: false,
      collection: [],
      sharedState: state.$data,
      show: 99
    }
  },
  computed: {
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
  methods: {
    showMe (index) {
      if (this.show === index) {
        this.show = 99
      } else {
        this.show = index
      }
    },
    getDevs () {
      // axios
      // .get('https://github-trending-api.now.sh/developers')
      // .then(response => (this.collection = response.data))
      var vm = this
      axios.all([
        axios.get('https://zircle-github-trending-ranking.now.sh/8d2zo'),
        axios.get('https://github-trending-api.now.sh/developers?since=' + this.sharedState.since + '&language=' + this.sharedState.language)
      ])
        .then(axios.spread((myjson, github) => {
          if (vm.sharedState.language === '') {
          // all languages
            var full = github.data.map(function (e, index) {
            // var diff = myjson.data[myjson.data.length -1].daily.repos[index].diff
              var search = myjson.data[myjson.data.length - 1][vm.sharedState.since].devs.find(el => el.username === e.username)
              // var suma = myjson.data[myjson.data.length -1].daily.devs.concat(myjson.data[myjson.data.length -1].weekly.devs).concat(myjson.data[myjson.data.length -1].monthly.devs)
              // var avatar = suma.find(el => el.username === e.author)
              if (search === undefined) search = { prevPos: -1, diff: 0 }
              // console.log(e.author, e.name)
              return {
                position: index,
                username: e.username,
                name: e.name,
                url: e.url,
                avatar: e.avatar,
                prevPos: search.prevPos,
                diff: search.diff
              }
            })
            vm.collection = full
          } else {
            vm.collection = github.data
            for (var i = 0; i < vm.collection.length; i++) {
              vm.collection[i].position = i
            }
          }
        }))
    }
  },
  mounted () {
    this.getDevs()
  }
}
</script>
