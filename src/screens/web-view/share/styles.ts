/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:49:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * 页面底色 + 截图生成前的遮罩
 */
import { _ } from '@stores'

export const styles = _.create({
  screen: {
    flex: 1,
    backgroundColor: '#000'
  },
  mask: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  maskLight: {
    backgroundColor: '#fff'
  },
  maskDark: {
    backgroundColor: '#000'
  }
})
