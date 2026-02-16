/*
 * @Author: czy0729
 * @Date: 2024-03-10 04:03:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-10 04:35:11
 */
import { _ } from '@stores'

export const styles = _.create({
  contentContainerStyle: {
    paddingTop: _.sm + _.ios(0, _.statusBarHeight + 1),
    paddingHorizontal: _.md,
    paddingBottom: _.sm
  }
})
