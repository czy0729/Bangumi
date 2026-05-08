/*
 * @Author: czy0729
 * @Date: 2022-07-04 12:56:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 00:55:06
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  containerRight: {
    position: 'absolute',
    right: 0,
    bottom: _.ios(64, 46),
    width: 16,
    backgroundColor: _.ios(_.colorPlain, 'transparent')
  },
  containerLeft: {
    position: 'absolute',
    left: 0,
    bottom: _.ios(64, 46),
    width: 16,
    backgroundColor: _.ios(_.colorPlain, 'transparent')
  },
  containerBottom: {
    position: 'absolute',
    left: _.wind,
    right: _.wind,
    height: 24,
    paddingHorizontal: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd,
    borderWidth: _.hairlineWidth,
    borderColor: _.select('rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.1)'),
    overflow: 'hidden'
  },
  itemVertical: {
    width: 16,
    height: '100%'
  },
  itemHorizontal: {
    width: '100%',
    height: '100%'
  },
  itemNew: {
    borderRightWidth: 6,
    borderColor: _.select(_.colorMainLightBorder, 'rgb(59, 48, 51)')
  },
  itemNewFull: {
    backgroundColor: _.select(_.colorMainLightBorder, 'rgb(59, 48, 51)')
  },
  itemText: {
    minHeight: 16
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: _.colorIcon,
    borderRadius: 4
  }
}))
