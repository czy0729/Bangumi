/*
 * @Author: czy0729
 * @Date: 2026-06-21 02:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 02:54:34
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  indicator: {
    width: 3,
    height: 14,
    marginTop: 2,
    marginRight: _.sm,
    backgroundColor: _.colorMain,
    borderRadius: 1
  }
}))
