/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:19:09
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-29 17:19:09
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  containerRight: {
    position: 'absolute',
    zIndex: 1,
    top: _.headerHeight,
    right: 0,
    bottom: 42,
    width: 16
  },
  containerLeft: {
    position: 'absolute',
    zIndex: 1,
    top: _.headerHeight,
    left: 0,
    bottom: 42,
    width: 16
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
  itemVertical: {
    width: 16,
    height: '100%'
  },
  itemHorizontal: {
    width: '100%',
    height: '100%'
  },
  itemNew: {
    backgroundColor: _.select('rgba(254, 138, 149, 0.64)', 'rgba(254, 113, 127, 0.16)')
  },
  text: {
    width: '100%'
  }
}))
