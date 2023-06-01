/*
 * @Author: czy0729
 * @Date: 2022-09-01 13:50:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-01 01:52:03
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: _.window.height * 0.75
  },
  pagination: {
    marginTop: _.xs,
    marginBottom: STORYBOOK ? 0 : _.ios(_.md + _.sm, _.md)
  }
}))
