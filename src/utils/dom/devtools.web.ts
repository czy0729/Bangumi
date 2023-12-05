/*
 * @Author: czy0729
 * @Date: 2023-12-03 21:42:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-05 03:07:56
 */
import { addListener, setDetectDelay, launch } from 'devtools-detector'
import { DEV } from '@/config'

const devtools = {
  isOpen: false
}

;(() => {
  if (DEV) return

  addListener(isOpen => (devtools.isOpen = isOpen))
  setDetectDelay(5000)
  launch()
})()

/** 控制台是否开启 */
export function isDevtoolsOpen() {
  return devtools.isOpen
}
