/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 */
import { SWIPE_EDGE_EXTRA, SWIPE_HANDLE_RIGHT } from '@components/drawer/ds'
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingBottom: _.lg
  },
  dividerWrap: {
    height: _.md,
    justifyContent: 'center'
  },
  divider: {
    height: _.hairlineWidth,
    marginLeft: _._wind,
    marginRight: SWIPE_HANDLE_RIGHT + SWIPE_EDGE_EXTRA,
    backgroundColor: _.select(_.colorIcon, _.colorDarkModeLevel2)
  }
}))
