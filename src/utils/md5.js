/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-16 16:53:32
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-16 22:17:45
 */

import CryptoJS from 'crypto-js'

// 只适合小文件，大文件最好分片(blobSlice)读取
export const md5File = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = () => resolve(CryptoJS.MD5(CryptoJS.lib.WordArray.create(reader.result)).toString())
    reader.onerror = e => reject(e)
  })
}
