/*
 * @Author: czy0729
 * @Date: 2022-05-12 04:33:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-25 17:17:34
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
