/*
 * @Author: czy0729
 * @Date: 2022-05-03 17:47:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-05 21:42:36
 */
import { _ } from '@stores'
import './index.scss'

export const memoStyles = _.memoStyles(() => ({
  container: {
    width: Number(_.window.width * 0.48),
    maxWidth: 200,
    maxHeight: _.window.height / 1.4,
    backgroundColor: 'rgba(48, 48, 48, 0.64)',
    backdropFilter: 'blur(24px)',
    borderRadius: _.radiusMd,
    overflow: 'scroll',
    ..._.shadow
  },
  title: {
    width: '100%',
    paddingVertical: _.r(12),
    paddingHorizontal: _.r(24)
  },
  item: {
    width: '100%',
    paddingVertical: _.r(12),
    paddingHorizontal: _.r(24)
  },
  border: {
    borderTopWidth: _.hairlineWidth,
    borderTopColor: 'rgba(255, 255, 255, 0.05)'
  }
}))
