/*
 * @Author: czy0729
 * @Date: 2022-08-22 17:15:14
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-22 17:15:14
 */
export function getYuqueThumbs(src: string[]) {
  return src.map(item => ({
    url: `https://cdn.nlark.com/yuque/${item}`
  }))
}
