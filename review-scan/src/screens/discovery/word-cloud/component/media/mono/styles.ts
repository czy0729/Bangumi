/*
 * @Author: czy0729
 * @Date: 2024-09-28 16:51:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 18:49:24
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    padding: _.sm,
    marginTop: _.headerHeight + _.xs,
    marginBottom: _.sm,
    backgroundColor: _.ios('transparent', 'rgba(0, 0, 0, 0.32)'),
    borderWidth: _.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  body: {
    height: 60,
    paddingTop: 3,
    paddingBottom: 2,
    marginLeft: 12
  },
  rank: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  opacity: {
    opacity: 0.64
  }
}))
