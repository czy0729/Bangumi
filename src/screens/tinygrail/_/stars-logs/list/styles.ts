/*
 * @Author: czy0729
 * @Date: 2024-03-10 04:03:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:39:07
 */
import { _ } from '@stores'
import { STATUS_BAR_HEIGHT } from '@styles'

export const styles = _.create({
  contentContainerStyle: {
    paddingTop: _.sm + _.ios(0, STATUS_BAR_HEIGHT + 1),
    paddingHorizontal: _.md,
    paddingBottom: _.sm
  }
})
