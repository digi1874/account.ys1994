import _           from 'lodash'
import moment      from 'moment'
import Vue         from 'vue'
import { request } from '@/utils'
import * as DICT   from '@/dict'

const filters = {}
const textsRE = /_TEXTS$/
_.forEach(DICT, (items, fKey) => {
  _.forEach(items, (item, key) => {
    if (textsRE.test(key)) {
      filters[_.camelCase(`${fKey} ${key.replace(textsRE, '')}`)] = value => item[value]
    }
  })
})

_.forEach({
  ...filters,
  imageUrl:   value => { return value && !/^https?:\/\//i.test(value) ? request.defaults.baseURL + 'user/image/' + value : value },
  formatDate: (date, format='YYYY-MM-DD HH:mm:ss') => moment(date).format(format),
  formatUnix: (unix, format='YYYY-MM-DD HH:mm:ss') => unix ? moment.unix(unix).format(format) : '-'
}, (filter, key) => {
  Vue.filter(key, (data, ...agm) => filter(data, ...agm))
})
