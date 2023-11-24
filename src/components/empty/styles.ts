/*
 * @Author: czy0729
 * @Date: 2022-05-03 18:19:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 16:54:19
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const styles = _.create({
  empty: {
    paddingHorizontal: _.wind,
    minHeight: STORYBOOK ? _.window.height * 0.92 : 400
  }
})
