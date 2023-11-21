/*
 * @Author: czy0729
 * @Date: 2023-11-18 09:26:16
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-11-18 09:26:16
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const styles = _.create({
  pagination: {
    marginTop: _.xs,
    marginBottom: STORYBOOK ? 0 : _.ios(_.md + _.sm, _.md)
  }
})
