/*
 * @Author: czy0729
 * @Date: 2024-05-03 23:08:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-04 18:30:33
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  title: {
    marginBottom: _.md,
    borderBottomWidth: 2,
    borderBottomColor: _.colorWarning
  },
  primary: {
    marginBottom: 0,
    borderBottomColor: _.colorPrimary
  }
}))
