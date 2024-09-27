/*
 * @Author: czy0729
 * @Date: 2024-09-27 02:45:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 22:51:45
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    padding: _.sm,
    marginTop: _.headerHeight - _.sm,
    marginBottom: _.sm,
    backgroundColor: _.ios('transparent', 'rgba(0, 0, 0, 0.32)'),
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
