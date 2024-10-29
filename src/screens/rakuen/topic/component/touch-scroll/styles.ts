/*
 * @Author: czy0729
 * @Date: 2022-07-04 12:56:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-16 17:07:16
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  containerRight: {
    position: 'absolute',
    top: _.headerHeight,
    right: 0,
    bottom: _.ios(64, 46),
    width: 16,
    backgroundColor: _.colorPlain
  },
  containerLeft: {
    position: 'absolute',
    top: _.headerHeight,
    left: 0,
    bottom: _.ios(64, 46),
    width: 16,
    backgroundColor: _.colorPlain
  },
  containerBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 40,
    width: '100%',
    height: 24,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1)
  },
  notLogin: {
    bottom: 0,
    height: 32,
    paddingBottom: 8
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
