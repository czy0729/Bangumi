/*
 * @Author: czy0729
 * @Date: 2026-06-21 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 04:08:17
 */
import { useCallback, useState } from 'react'
import { systemStore } from '@stores'
import { feedback } from '@utils'
import { logger } from '@utils/dev'
import { disableEchProxy, enableEchProxy } from '@utils/proxy/ech'
import { COMPONENT } from '../ds'

/** 代理模式 */
export type ProxyMode = 'ech' | 'worker' | 'disabled'

/** 代理模式切换逻辑 */
export function useProxyMode() {
  const [echPort, setEchPort] = useState<number>(0)

  /** 计算当前代理模式 */
  const proxyMode: ProxyMode = systemStore.setting.echProxyEnabled
    ? 'ech'
    : systemStore.setting.workerProxyDisabled
    ? 'disabled'
    : 'worker'

  /** 切换代理模式 */
  const setProxyMode = useCallback(async (mode: ProxyMode) => {
    feedback(true)

    if (mode === 'ech') {
      // 启用 ECH, 取消全局禁用
      if (systemStore.setting.workerProxyDisabled) {
        systemStore.switchSetting('workerProxyDisabled')
      }
      if (!systemStore.setting.echProxyEnabled) {
        try {
          const port = await enableEchProxy()
          if (port > 0) {
            logger.log(COMPONENT, 'setProxyMode ech running', port)
            setEchPort(port)
            systemStore.switchSetting('echProxyEnabled')
          } else {
            logger.warn(COMPONENT, 'setProxyMode ech failed: port=0')
          }
        } catch (e) {
          logger.warn(COMPONENT, 'setProxyMode ech error', e)
        }
      }
    } else if (mode === 'worker') {
      // 启用 Worker, 关闭 ECH, 取消全局禁用
      if (systemStore.setting.echProxyEnabled) {
        try {
          await disableEchProxy()
        } catch {}
        setEchPort(0)
        systemStore.switchSetting('echProxyEnabled')
      }
      if (systemStore.setting.workerProxyDisabled) {
        systemStore.switchSetting('workerProxyDisabled')
      }
    } else {
      // 禁用代理, 关闭 ECH
      if (systemStore.setting.echProxyEnabled) {
        try {
          await disableEchProxy()
        } catch {}
        setEchPort(0)
        systemStore.switchSetting('echProxyEnabled')
      }
      if (!systemStore.setting.workerProxyDisabled) {
        systemStore.switchSetting('workerProxyDisabled')
      }
    }
  }, [])

  return {
    proxyMode,
    setProxyMode,
    echPort,
    setEchPort
  }
}
