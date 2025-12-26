/*
 * @Author: czy0729
 * @Date: 2022-07-04 12:56:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 05:45:47
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
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
