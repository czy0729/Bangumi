/*
 * @Author: czy0729
 * @Date: 2022-06-19 12:33:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-27 20:33:26
 */
import { _ } from '@stores'
import { H_TABBAR } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  listView: _.ios(
    {},
    {
      backgroundColor: _.colorBg
    }
  ),
  contentContainerStyle: {
    paddingTop: _.ios(_.headerHeight + H_TABBAR, 0),
    paddingBottom: _.bottom
  }
}))
