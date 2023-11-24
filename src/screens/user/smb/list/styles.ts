/*
 * @Author: czy0729
 * @Date: 2023-11-18 09:26:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 11:52:55
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const styles = _.create({
  scrollView: STORYBOOK
    ? {
        paddingTop: 104,
        paddingBottom: 32
      }
    : {},
  grids: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md
  }
})
