/*
 * @Author: lin.zhenhui
 * @Date: 2020-03-07 15:48:12
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-07 16:32:38
 */

import { fileToUrl } from './fileToUrl'
import { urlToImage } from './urlToImage'
import { imageToFile } from './imageToFile'

/**
 * 压缩图片
 * @function
 * @param   {File}    file    图片文件
 * @param   {Number}  width   图片宽度
 * @param   {Number}  height  图片高度
 * @param   {Number}  quality 压缩质量，值0~1，默认值1
 * @returns 返回Promise；then(blob=>{})
 */
export const compressImage = (file, width, height, quality) => {
  return new Promise(resolve => {
    // file -> Image -> blob
    fileToUrl(file).then(url => {
      urlToImage(url).then(image => {
        imageToFile(image, width, height, file.type, quality).then(resolve)
      })
    })
  })
}
