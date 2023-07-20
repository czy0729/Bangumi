/*
 * @Author: czy0729
 * @Date: 2022-06-20 17:20:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 05:19:20
 */
import { _ } from '@stores'
import { H_TABBAR } from '../ds'

export const styles = _.create({
  contentContainerStyle: {
    paddingTop: _.ios(_.headerHeight + H_TABBAR, 0),
    paddingBottom: _.ios(_.bottom, 0)
  }
})
