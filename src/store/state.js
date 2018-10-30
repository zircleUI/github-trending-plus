import Vue from 'vue'
const state = new Vue({
  data: {
    language: '',
    since: 'daily',
    refresh: false,
    initRepos: false,
    colorMe: {},
    axiosError: '',
    clearResults: false
  }
})

export default state
