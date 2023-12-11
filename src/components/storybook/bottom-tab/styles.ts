/*
 * @Author: czy0729
 * @Date: 2023-11-02 03:58:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-09 21:53:01
 */
import { _ } from '@stores'
import { isMobile } from '@utils/dom'

export const memoStyles = _.memoStyles(() => ({
  bottomTab: {
    position: 'absolute',
    zIndex: 99999,
    right: _.sm + 2,
    left: _.sm + 2,
    bottom: isMobile() ? _.sm : _.sm + 4,
    ..._.shadow
  },
  blurView: {
    paddingHorizontal: _.sm,
    borderWidth: _.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: _.radiusMd + 2,
    overflow: 'hidden'
  },
  item: {
    paddingTop: _.sm,
    paddingBottom: _.sm + 2
  },
  icon: {
    height: 24
  }
}))
