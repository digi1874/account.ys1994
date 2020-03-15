/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-07 16:21:56
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-07 16:27:57
 */

/**
 * 图片url转Image
 * @function
 * @param {String} url 图片url
 * @returns 返回Promise；then(image=>{}).catch(err=>{})
 */
export const urlToImage = url => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => {
      resolve(img)
    })
    img.addEventListener('error', err => {
      reject(err)
    })
    img.src = url
  })
}
