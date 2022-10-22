/*
 * @Author: czy0729
 * @Date: 2022-10-22 02:00:43
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-22 02:00:43
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  loading: {
    marginTop: _.window.height / 3
  },
  contentContainerStyle: {
    paddingHorizontal: _.wind - _._wind,
    paddingBottom: _.bottom,
    minHeight: _.window.height + _.parallaxImageHeight - _.tabBarHeight
  },
  sectionHeader: {
    paddingHorizontal: _._wind,
    backgroundColor: _.colorPlain
  },
  section: {
    backgroundColor: _.colorBg
  },
  touch: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  arrow: {
    marginRight: -3
  }
}))
