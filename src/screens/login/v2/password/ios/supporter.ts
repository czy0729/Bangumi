/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * Expo Go 没有原生能力, 登录期间临时借用支持者节点 (只改内存, 不落盘)
 */
import { systemStore } from '@stores'
import { getSupporterConfig } from '@utils/kv/worker'
import { getProxyStrategy } from '@utils/proxy'

export type SupporterSwitch = {
  /** 切换到内置节点, false 表示当前路径仍不可用 */
  apply(): boolean

  /** 还原切换前的设置 */
  restore(): void
}

export function createSupporterSwitch(): SupporterSwitch {
  let restoreValue: (() => void) | null = null

  const restore = () => {
    restoreValue?.()
  }

  const apply = (): boolean => {
    if (restoreValue) return true

    const before = getProxyStrategy()
    if (before.enabled && before.rewriteHeaders && !!before.host) return true

    const builtin = getSupporterConfig()
    if (!builtin.host) return false

    const { setting } = systemStore
    const snapshot = {
      preset: setting.workerPreset,
      disabled: setting.workerProxyDisabled,
      proxy: setting.workerProxy,
      secret: setting.workerSecret,
      direct: setting.workerProxyDirect
    }

    systemStore.setState({
      setting: {
        workerProxyDisabled: false,
        workerPreset: '',
        workerProxy: builtin.host,
        workerSecret: builtin.secret,
        workerProxyDirect: false
      }
    })

    restoreValue = () => {
      systemStore.setState({
        setting: {
          workerPreset: snapshot.preset,
          workerProxyDisabled: snapshot.disabled,
          workerProxy: snapshot.proxy,
          workerSecret: snapshot.secret,
          workerProxyDirect: snapshot.direct
        }
      })
      restoreValue = null
    }

    // 切换后校验: 内置节点地址异常时立即还原
    const after = getProxyStrategy()
    if (!after.rewriteHeaders || !after.host) {
      restore()

      return false
    }

    return true
  }

  return { apply, restore }
}
