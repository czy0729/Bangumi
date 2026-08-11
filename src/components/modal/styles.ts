/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import { syncThemeStore } from '@utils/async'
import { window } from '@styles'

const _ = syncThemeStore()

export const styles = _.create({
  maxHeight: {
    maxHeight: window.height
  },
  title: {
    paddingHorizontal: 24
  },
  body: {},
  closeWrap: {
    position: 'absolute',
    top: 0,
    left: 24,
    zIndex: 1,
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