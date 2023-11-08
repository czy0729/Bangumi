/*
 * @Author: czy0729
 * @Date: 2023-11-02 03:58:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-08 20:56:22
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  bottomTab: {
    position: 'absolute',
    zIndex: 99999,
    right: _.sm + 2,
    left: _.sm + 2,
    bottom: _.sm,
    ..._.shadow
  },
  blurView: {
    paddingHorizontal: _.sm,
    borderWidth: _.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: _.radiusMd,
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
