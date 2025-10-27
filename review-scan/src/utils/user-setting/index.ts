/*
 * @Author: czy0729
 * @Date: 2022-08-15 04:47:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 10:07:01
 */
import { HOST_DOGE } from '@constants'
import { AVATARS, BGS } from './ds'

/** 随机取头像 */
export function randomAvatars(n: number = 15) {
  const min = 0
  const max = AVATARS.length
  const arr = []

  while (arr.length < n) {
    const index = Math.floor(Math.random() * (max - min) + min)
    if (!arr.includes(index)) arr.push(index)
  }

  return arr.map(index => `https://p.sda1.dev/6/${AVATARS[index]}.jpg`)
}

/** v7.1.1+ 替换源头 */
export function fixedRemote(src: string, isAvatar: boolean = false): string {
  try {
    if (typeof src !== 'string') return src
    const splits = src.split('/')
    const last = splits[splits.length - 1]

    if (isAvatar) {
      if (last) {
        let flag = false
        AVATARS.forEach(item => {
          if (flag) return
          flag = src.includes(item)
        })

        if (flag) return `${HOST_DOGE}/avatars/${last}`
      }
    } else {
      // @ts-expect-error
      if (last && BGS.includes(last)) return `${HOST_DOGE}/bgs/${last}`
    }

    return src
  } catch (error) {
    return src
  }
}
