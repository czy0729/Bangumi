/*
 * @Author: czy0729
 * @Date: 2022-05-20 09:14:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:30:42
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  toolbar: {
    padding: _.sm
  },
  zhinan: {
    padding: _.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  btn: {
    width: _.r(160),
    marginTop: _.md,
    marginBottom: 96
  },
  setting: {
    marginTop: -3
  },
  go: {
    height: _.window.height - 120
  }
}))
