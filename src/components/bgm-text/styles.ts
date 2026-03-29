/*
 * @Author: czy0729
 * @Date: 2022-05-03 22:44:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-29 23:30:15
 */
import { _ } from '@stores'

export const styles = _.create({
  text: {
    fontFamily: 'bgm',
    fontWeight: 'normal',

    // 一定要随便加个颜色，否则在安卓上面透明度会明显低于 1
    color: '#000',
    opacity: 1
  },
  textMusume: {
    fontFamily: 'bgm2'
  },
  textBlake: {
    fontFamily: 'bgm3'
  }
})
