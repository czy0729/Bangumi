/*
 * @Author: czy0729
 * @Date: 2024-01-04 14:26:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 06:13:36
 */
import { systemStore } from '@stores'
import { confirm, open } from '@utils'

/** 代理模式下是否已经确认过打开浏览器 (本次热启动共享) */
let _proxyOpenConfirmed = false

/** 代理模式下打开年鉴页面，首次需要 confirm，之后直接 open */
export function openAwardProxy(url: string) {
  const { workerProxyDisabled, workerProxy } = systemStore.setting
  if (!workerProxyDisabled && workerProxy) {
    if (_proxyOpenConfirmed) {
      open(url)
      return true
    }

    confirm('代理模式下暂不支持此页面，使用浏览器打开？', () => {
      _proxyOpenConfirmed = true
      open(url)
    })
    return true
  }

  return false
}
