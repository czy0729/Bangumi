/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:14:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-30 05:24:45
 */
import { _ } from '@stores'

export const styles = _.create({
  html: {
    minHeight: _.r(120)
  },
  loading: {
    height: _.r(120)
  },
  iconTranslate: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: -4
  },
  likes: {
    marginRight: 28
  }
})
