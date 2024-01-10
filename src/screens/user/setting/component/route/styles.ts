/*
 * @Author: czy0729
 * @Date: 2022-07-18 09:43:27
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-07-18 09:43:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  blocks: {
    paddingHorizontal: _.wind,
    paddingVertical: _.md - 2
  },
  tabs: {
    paddingHorizontal: _.xs,
    marginTop: _.md,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  tab: {
    paddingTop: _.sm + 2,
    paddingBottom: _.sm + 4,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2)
  },
  icon: {
    height: 24
  },
  iconStar: {
    marginTop: -1
  },
  iconTrophy: {
    marginTop: 3
  },
  disabledLine: {
    position: 'absolute',
    zIndex: 1,
    top: 5,
    bottom: 4,
    width: 5,
    backgroundColor: _.select(_.colorIcon, '#777'),
    borderLeftWidth: 2,
    borderRightWidth: 1,
    borderColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    transform: [
      {
        rotateZ: '45deg'
      }
    ]
  },
  split: {
    width: 1,
    height: 20,
    marginHorizontal: 2,
    backgroundColor: _.select(_.colorIcon, '#777'),
    borderRadius: _.radiusSm,
    overflow: 'hidden',
    opacity: 0.64
  },
  activeBar: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: 0,
    left: 0
  },
  activeLine: {
    width: 16,
    height: 4,
    backgroundColor: _.colorSuccess,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
