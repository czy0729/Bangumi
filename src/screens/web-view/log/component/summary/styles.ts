/*
 * @Author: czy0729
 * @Date: 2025-03-14 08:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:12:55
 */
import { _ } from '@stores'
import { HEADER_HEIGHT } from '@styles'

export const styles = _.create({
  summary: {
    position: 'absolute',
    zIndex: 1,
    top: HEADER_HEIGHT,
    right: 0,
    left: 0
  },
  blur: {
    paddingTop: _.md,
    paddingBottom: _.sm
  },
  row: {
    paddingHorizontal: _._wind,
    paddingBottom: _.sm
  }
})
