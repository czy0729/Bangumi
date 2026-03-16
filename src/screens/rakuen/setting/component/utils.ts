/*
 * @Author: czy0729
 * @Date: 2022-08-22 17:15:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 02:35:10
 */
export function getYuqueThumbs<T extends readonly string[]>(src: T) {
  return src.map(item => ({
    url: `https://cdn.nlark.com/yuque/${item}` as const
  })) as {
    [K in keyof T]: {
      url: `https://cdn.nlark.com/yuque/${T[K] & string}`
    }
  }
}
