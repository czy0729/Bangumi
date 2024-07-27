/*
 * @Author: czy0729
 * @Date: 2022-06-14 15:54:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-28 05:28:37
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.r(_.window.width - 2 * _.wind),
    maxWidth: _.device(408, 560),
    paddingTop: _.device(_.md + 2, 28),
    paddingHorizontal: _.device(0, _.sm),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
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
    minHeight: 96,
    maxHeight: _.select(136, 132),
    marginTop: 6,
    paddingVertical: 12
  }
}))
