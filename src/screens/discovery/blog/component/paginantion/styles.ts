/*
 * @Author: czy0729
 * @Date: 2022-09-01 13:50:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 05:34:21
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const styles = _.create({
  pagination: {
    marginTop: _.xs,
    marginBottom: STORYBOOK ? 0 : _.ios(_.md + _.sm, _.md)
  }
})
