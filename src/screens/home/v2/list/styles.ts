/*
 * @Author: czy0729
 * @Date: 2022-06-19 12:33:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-19 12:57:08
 */
import { _ } from '@stores'
import { OFFSET_LISTVIEW } from '../store'

export const memoStyles = _.memoStyles(() => ({
  listView: _.ios(
    {},
    {
      backgroundColor: _.colorBg
    }
  ),
  contentContainerStyle: {
    paddingTop: OFFSET_LISTVIEW,
    paddingBottom: _.bottom
  }
}))
