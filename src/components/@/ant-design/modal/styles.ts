/*
 * @Author: czy0729
 * @Date: 2022-11-04 12:02:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-14 19:37:31
 */
import { syncThemeStore } from '@utils/async'
import { window } from '@styles'

const _ = syncThemeStore()

export const styles = _.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  maxHeight: {
    maxHeight: window.height
  },
  transparent: {
    backgroundColor: 'transparent'
  },
  title: {
    paddingHorizontal: 24
  },
  close: {
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
  },
  font: {
    fontFamily: ''
  }
})
