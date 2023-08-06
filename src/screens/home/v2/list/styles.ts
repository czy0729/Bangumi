/*
 * @Author: czy0729
 * @Date: 2022-06-19 12:33:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-25 18:15:23
 */
import { _ } from '@stores'
import { H_TABBAR } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.headerHeight + H_TABBAR,
    paddingBottom: _.bottom
  }
}))
