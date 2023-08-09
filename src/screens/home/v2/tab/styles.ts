/*
 * @Author: czy0729
 * @Date: 2022-06-19 16:16:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 04:37:10
 */
import { _ } from '@stores'
import { H_TABBAR } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  sceneContainerStyle: {
    marginTop: _.ios(-_.headerHeight - H_TABBAR, 0)
  }
}))
