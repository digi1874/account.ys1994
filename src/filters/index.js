import _           from 'lodash'
import Vue         from 'vue'
import { request } from '@/utils'

const { baseURL } = request.defaults

_.forEach({
  imageUrl: (value) => { return value && !/^https?:\/\//i.test(value) ? baseURL + 'image/' + value : value }
}, (filter, key) => {
  Vue.filter(key, (data, ...agm) => filter(data, ...agm))
})
