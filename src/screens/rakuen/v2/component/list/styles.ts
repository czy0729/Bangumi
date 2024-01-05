/*
 * @Author: czy0729
 * @Date: 2022-06-20 17:20:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-27 18:12:10
 */
import { _ } from '@stores'
import { H_TABBAR } from '../../ds'

export const styles = _.create({
  contentContainerStyle: {
    paddingTop: _.headerHeight + H_TABBAR,
    paddingBottom: _.bottom
  }
})
