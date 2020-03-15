/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-07 16:08:17
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-07 16:28:02
 */

/**
 * Image转图片文件
 * @function
 * @param {Image} image    必需，Image图片
 * @param {Number} width   必需，图片宽度
 * @param {Number} height  必需，图片高度
 * @param {String} type    必需，图片格式
 * @param {Number} quality 压缩质量，值0~1，默认值1
 * @returns 返回Promise; then(blob=>{})
 */
export const imageToFile = (image, width, height, type, quality) => {
  return new Promise(resolve => {
    const cvs  = document.createElement('canvas')
    const ctx  = cvs.getContext('2d')
    cvs.width  = width
    cvs.height = height
    ctx.drawImage(image, 0, 0, width, height)
    cvs.toBlob(resolve, type, quality || 1)
  })
}
