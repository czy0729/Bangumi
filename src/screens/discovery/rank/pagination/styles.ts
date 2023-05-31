/*
 * @Author: czy0729
 * @Date: 2022-07-22 15:48:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-15 05:00:53
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const styles = _.create({
  pagination: {
    marginTop: _.xs,
    marginBottom: STORYBOOK ? 0 : _.ios(_.md + _.sm, _.md)
  }
})
