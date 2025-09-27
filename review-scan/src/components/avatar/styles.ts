/*
 * @Author: czy0729
 * @Date: 2022-05-12 04:33:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 17:03:58
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  dev: {
    borderWidth: 1,
    borderColor: _.colorDanger
  }
}))
