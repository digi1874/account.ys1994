import _           from 'lodash'
import moment      from 'moment'
import Vue         from 'vue'
import { request } from '@/utils'
import { LOGIN }   from '@/dict'

_.forEach({
  imageUrl:   value => { return value && !/^https?:\/\//i.test(value) ? request.defaults.baseURL + 'user/image/' + value : value },
  loginState: value => LOGIN.STATE_TEXTS[value] || value,
  formatDate: (date, format='YY-MM-DD HH:mm:ss') => moment(date).format(format),
  formatUnix: (unix, format='YY-MM-DD HH:mm:ss') => moment.unix(unix).format(format)
}, (filter, key) => {
  Vue.filter(key, (data, ...agm) => filter(data, ...agm))
})
