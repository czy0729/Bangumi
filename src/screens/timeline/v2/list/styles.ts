/*
 * @Author: czy0729
 * @Date: 2022-06-20 16:57:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-20 16:58:27
 */
import { _ } from '@stores'
import { H_TABBAR } from '../store'

export const styles = _.create({
  contentContainerStyle: {
    paddingTop: _.headerHeight + H_TABBAR,
    paddingBottom: _.bottom
  }
})
