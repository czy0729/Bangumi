/*
 * @Author: czy0729
 * @Date: 2023-12-03 21:42:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-26 07:39:10
 */
import { addListener, launch, setDetectDelay } from 'devtools-detector'
import { DEV } from '@src/config'

const devtools = {
  isOpen: false
}

;(() => {
  if (DEV) return

  const url = new window.URL(window.location.href)
  const params = new window.URLSearchParams(url.search)
  if (params.get('dev') === '1') return

  addListener(isOpen => (devtools.isOpen = isOpen))
  setDetectDelay(6400)
  launch()
})()

/** 控制台是否开启 */
export function isDevtoolsOpen() {
  return devtools.isOpen
}
