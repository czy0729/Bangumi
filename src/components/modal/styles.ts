/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-17 07:39:44
 */
import { syncThemeStore } from '@utils/async'
import { window } from '@styles'

const _ = syncThemeStore()

export const styles = _.create({
  body: {
    maxHeight: window.height,
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  head: {
    marginHorizontal: -2
  },
  side: {
    minWidth: 36,
    marginTop: -1
  },
  btn: {
    width: 36,
    height: 36
  }
})
