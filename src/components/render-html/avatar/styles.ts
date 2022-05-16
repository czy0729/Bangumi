/*
 * @Author: czy0729
 * @Date: 2022-05-17 05:12:52
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-05-17 05:12:52
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  avatar: {
    borderWidth: _.hairlineWidth,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  dev: {
    borderWidth: 1,
    borderColor: _.colorDanger
  }
}))
