/*
 * @Author: czy0729
 * @Date: 2022-08-26 01:43:59
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-26 01:43:59
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.md,
    paddingRight: _.wind,
    paddingLeft: _.xs,
    margin: _.wind,
    borderWidth: 1,
    borderColor: _.colorMain,
    borderRadius: _.radiusSm
  }
}))
