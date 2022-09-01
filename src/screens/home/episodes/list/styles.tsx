/*
 * @Author: czy0729
 * @Date: 2022-09-01 09:56:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 10:01:17
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: _.sm + 2,
    paddingHorizontal: _.wind
  },
  status: {
    width: 6,
    height: 6,
    marginTop: _.r(6),
    marginRight: _.sm,
    backgroundColor: _.colorSub,
    borderRadius: 3
  },
  statusSuccess: {
    backgroundColor: _.colorSuccess
  },
  statusPrimary: {
    backgroundColor: _.colorPrimary
  }
}))
