/*
 * @Author: czy0729
 * @Date: 2022-06-20 17:20:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-26 15:10:24
 */
import { _ } from '@stores'
import { H_TABBAR } from '../store'

export const styles = _.create({
  contentContainerStyle: {
    paddingTop: _.ios(_.headerHeight + H_TABBAR, 0),
    paddingBottom: _.bottom
  }
})
