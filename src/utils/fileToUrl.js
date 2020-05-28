/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-07 15:49:17
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-07 16:21:47
 */

/**
 * 图片文件转图片url
 * @function
 * @param {File} file 文件
 * @returns 返回Promise；then(url=>{}).catch(err=>{})
 */
export const fileToUrl = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      resolve(reader.result)
    })
    reader.addEventListener('error', err => {
      reject(err)
    })
    reader.readAsDataURL(file)
  })
}
