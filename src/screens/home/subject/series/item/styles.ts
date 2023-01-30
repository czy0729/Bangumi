/*
 * @Author: czy0729
 * @Date: 2022-11-24 19:25:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-24 19:36:58
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  touch: {
    paddingRight: _.xs,
    marginLeft: _.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
