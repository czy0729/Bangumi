/*
 * @Author: czy0729
 * @Date: 2022-11-08 18:52:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:47:53
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _.wind,
    marginTop: _.md
  },
  item: {
    width: '47%',
    paddingVertical: _.sm,
    paddingRight: _.md,
    marginRight: '3%'
  }
}))
