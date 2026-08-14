/*
 * @Author: czy0729
 * @Date: 2022-06-14 15:54:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-14 22:00:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.r(_.window.width - 2 * (_.wind - 4)),
    maxWidth: _.device(408, 560),
    marginTop: _.isSmallDevice ? -24 : 0
  },
  container: {
    minHeight: _.device(380, 448),
    marginTop: _.sm
  },
  content: {
    width: '100%',
    maxWidth: _.window.maxWidth,
    paddingBottom: _.sm,
    marginTop: _.isMobileLanscape ? -24 : 0
  },
  tags: {
    width: '100%',
    minHeight: _.r(96),
    maxHeight: _.r(_.select(136, 132)),
    paddingVertical: 12,
    marginTop: 6
  }
}))
