/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:32:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-10 07:32:42
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  section: {
    marginTop: 24,
    marginHorizontal: _.windSm
  },
  touch: {
    paddingVertical: _.xs,
    paddingLeft: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
