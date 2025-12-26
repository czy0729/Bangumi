/*
 * @Author: czy0729
 * @Date: 2022-06-06 05:26:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:58:06
 */
import { _ } from '@stores'
import { IS_IOS_5_6_7_8 } from '@styles'

export const styles = _.create({
  back: {
    zIndex: 1,
    marginTop: _.ios(IS_IOS_5_6_7_8 ? -6 : -7, -4)
  },
  more: {
    zIndex: 1,
    marginTop: _.ios(-6, -4),
    opacity: 0.88
  },
  menu: {
    zIndex: 1,
    padding: _.sm,
    marginTop: _.ios(IS_IOS_5_6_7_8 ? -14 : -16, -12),
    marginLeft: -4,
    opacity: 0.88
  },
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 36,
    height: 36
  },
  timeline: {
    zIndex: 1,
    marginTop: _.ios(IS_IOS_5_6_7_8 ? -6 : -6, -4),
    marginRight: _.device(44, 54),
    opacity: 0.88
  },
  setting: {
    zIndex: 1,
    marginTop: _.ios(IS_IOS_5_6_7_8 ? -6 : -6, -4),
    opacity: 0.88
  }
})
