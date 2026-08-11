/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-12 05:34:19
 */
import { syncThemeStore } from '@utils/async'
import { window } from '@styles'

const _ = syncThemeStore()

export const styles = _.create({
  body: {
    maxHeight: window.height,
    paddingTop: 4,
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  title: {
    paddingHorizontal: 36
  },
  close: {
    position: 'absolute',
    zIndex: 1,
    top: 20,
    left: 16,
    width: 36,
    height: 36,
    marginTop: -10,
    marginLeft: -4
  },
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    width: 36,
    height: 36
  }
})
