/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:24:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-07 20:35:11
 */
import { _ } from '@stores'
import { BORDER_RADIUS } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  container: {
    zIndex: 10,
    marginTop: -BORDER_RADIUS,
    backgroundColor: _.colorPlain,
    borderTopRightRadius: BORDER_RADIUS,
    borderTopLeftRadius: BORDER_RADIUS
  },
  tabbarLeft: {
    marginRight: -8
  },
  scrollbar: {
    flexGrow: 0,
    height: 48
  },
  contentContainerStyle: {
    flexGrow: 1
  },
  tabbar: {
    flex: 1,
    justifyContent: 'space-evenly',
    height: '100%'
  }
}))
