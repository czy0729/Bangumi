/*
 * @Author: czy0729
 * @Date: 2024-09-27 02:45:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-02 07:15:41
 */
import { _ } from '@stores'
import { IMG_HEIGHT_SM } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    padding: _.sm,
    marginTop: _.headerHeight,
    marginBottom: _.sm,
    backgroundColor: _.ios('transparent', 'rgba(0, 0, 0, 0.32)'),
    borderWidth: _.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  body: {
    height: IMG_HEIGHT_SM,
    paddingTop: 3,
    paddingBottom: 4,
    marginLeft: 12
  },
  rank: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  opacity: {
    opacity: 0.64
  }
}))
