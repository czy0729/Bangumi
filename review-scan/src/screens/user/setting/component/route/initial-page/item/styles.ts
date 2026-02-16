/*
 * @Author: czy0729
 * @Date: 2022-07-18 09:43:27
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-07-18 09:43:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  tab: {
    paddingTop: _.sm + 2,
    paddingBottom: _.sm + 4,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2)
  },
  icon: {
    height: 24
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
