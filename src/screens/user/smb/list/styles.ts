/*
 * @Author: czy0729
 * @Date: 2023-11-18 09:26:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-25 10:52:18
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const styles = _.create({
  scrollView: STORYBOOK
    ? {
        paddingTop: 104,
        paddingBottom: 32
      }
    : {}
})
