/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:31:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 06:44:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind - _._wind,
    paddingBottom: _.xs
  }
}))
