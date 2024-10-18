/*
 * @Author: czy0729
 * @Date: 2023-11-01 05:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-02 13:29:13
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  notice: {
    display: 'flex',
    paddingVertical: _.sm,
    paddingHorizontal: _.sm + 2,
    marginVertical: _.sm,
    marginHorizontal: _.wind,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusSm
  }
}))
