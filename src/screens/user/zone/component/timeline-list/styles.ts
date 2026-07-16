/*
 * @Author: czy0729
 * @Date: 2022-10-22 09:57:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-14 21:01:54
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  loading: {
    marginTop: Math.floor(_.window.height / 3)
  },
  nestScroll: {
    paddingBottom: _.bottom
  },
  nestScrollLoading: {
    marginTop: 160
  }
}))
