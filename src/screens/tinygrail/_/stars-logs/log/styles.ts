/*
 * @Author: czy0729
 * @Date: 2022-11-09 07:03:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 07:40:02
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    marginBottom: _.md,
    backgroundColor: _.colorTinygrailContainer
  },
  change: {
    paddingHorizontal: _.xs,
    marginTop: -1,
    marginRight: 4,
    color: _.__colorPlain__,
    borderRadius: 2,
    overflow: 'hidden'
  }
}))
