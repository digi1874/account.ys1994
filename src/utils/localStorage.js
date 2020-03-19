/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-19 11:52:25
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-19 11:55:27
 */

import _ from 'lodash'

export const setLocalStorageItem = (key, value) => {
  if (_.isObject(value)) {
    value = JSON.stringify(value)
  }

  localStorage.setItem(key, value)
}

export const getLocalStorageItem = key => {
  let value = localStorage.getItem(key)

  if (!value) return value

  try {
    value = JSON.parse(value)
  } catch (err) {
    // no todo
  }

  return value
}
