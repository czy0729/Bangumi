/*
 * @Author: czy0729
 * @Date: 2022-09-03 03:49:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-26 18:30:57
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const styles = _.create({
  bottomContainer: {
    width: _.r(300),
    height: 400,
    marginTop: STORYBOOK ? 120 : _.lg
  }
})
