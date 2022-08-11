/*
 * @Author: czy0729
 * @Date: 2022-08-05 05:39:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 06:55:54
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    height: 48
  },
  filter: {
    paddingTop: _.sm - 4,
    paddingBottom: _.sm
  },
  wrap: {
    width: 248
  },
  input: {
    height: 44,
    paddingVertical: 0,
    ..._.fontSize(16),
    textAlign: 'center',
    backgroundColor: _.select('rgba(238, 238, 238, 0.8)', _._colorDarkModeLevel1),
    borderRadius: 44
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  loading: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0,
    width: 44,
    height: 44
  }
}))
