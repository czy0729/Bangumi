/*
 * @Author: czy0729
 * @Date: 2022-10-17 11:43:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-10 06:17:15
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  label: {
    paddingHorizontal: _.xs,
    marginBottom: _.xs
  },
  input: {
    ..._.fontSize12,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusSm - 2
  }
}))
