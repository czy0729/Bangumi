/*
 * @Author: czy0729
 * @Date: 2022-09-03 05:26:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 06:34:25
 */
import { _ } from '@stores'
import { H_TABBAR } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  sceneContainerStyle: {
    marginTop: _.ios(-_.headerHeight - H_TABBAR, 0)
  }
}))
