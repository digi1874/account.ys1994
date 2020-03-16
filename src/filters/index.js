import _           from 'lodash'
import Vue         from 'vue'
import { request } from '@/utils'

_.forEach({
  imageUrl: (value) => { return value && !/^https?:\/\//i.test(value) ? request.defaults.baseURL + 'user/image' + value : value }
}, (filter, key) => {
  Vue.filter(key, (data, ...agm) => filter(data, ...agm))
})
