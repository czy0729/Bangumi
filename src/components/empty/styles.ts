/*
 * @Author: czy0729
 * @Date: 2022-05-03 18:19:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-25 10:39:40
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const styles = _.create({
  empty: {
    paddingHorizontal: _.wind,
    minHeight: STORYBOOK ? _.window.height * 0.64 : 400
  }
})
