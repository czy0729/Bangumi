/*
 * @Author: czy0729
 * @Date: 2022-09-29 19:16:05
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-29 19:16:05
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingRight: _.wind,
    paddingLeft: _.wind,
    paddingVertical: _.md,
    marginBottom: _.sm
  },
  body: {
    paddingLeft: _.md
  },
  selectors: {
    width: 48
  },
  toolbar: {
    width: '100%',
    paddingRight: _._wind,
    marginTop: _.xs
  },
  loading: {
    marginTop: 13
  },
  ft: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    left: 0
  }
}))
