/*
 * @Author: czy0729
 * @Date: 2022-08-26 01:43:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-09 08:48:16
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.md,
    paddingRight: _._wind,
    paddingLeft: _.xs,
    marginTop: _.md,
    marginBottom: _.lg,
    borderWidth: 1,
    borderColor: _.colorMain,
    borderRadius: _.radiusSm
  }
}))
