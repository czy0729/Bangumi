/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 */
import { SWIPE_HANDLE_RIGHT } from '@components/drawer/ds'
import { _ } from '@stores'

export const styles = _.create({
  header: {
    zIndex: 6,
    paddingLeft: _._wind,
    paddingRight: SWIPE_HANDLE_RIGHT - _.sm - 10,
    paddingBottom: _.sm
  },
  headerContent: {
    flex: 1
  }
})
