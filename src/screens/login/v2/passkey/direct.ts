/*
 * @Author: czy0729
 * @Date: 2026-11-17
 *
 * Passkey 登录的直连辅助：默认模式切换与临时直连窗口
 */
import { systemStore } from '@stores'
import { feedback } from '@utils'
import {
  disableEchProxy,
  enableEchProxy,
  isEchProxyRunning,
  setEchAutoRestorePaused
} from '@utils/proxy/ech'

/** 空恢复函数 (无需变更网络时使用) */
const noopRestore = async () => {}

/**
 * 把默认代理模式切换为直连 (永久, 可在「设置 → 代理」改回)
 * 行为对齐设置页 useProxyMode.setProxyMode('disabled'), 但不依赖组件
 */
export async function switchDefaultToDirect(): Promise<void> {
  feedback(true)

  if (systemStore.setting.echProxyEnabled) {
    await disableEchProxy()
    systemStore.switchSetting('echProxyEnabled')
  }

  if (!systemStore.setting.workerProxyDisabled) {
    systemStore.switchSetting('workerProxyDisabled')
  }
}

/**
 * 开启临时直连窗口, 登录结束自动恢复, 不修改默认设置
 * - ECH 接管中: 先暂停生命周期自动重建再停掉本地代理, 请求才能直达 bgm.tv
 * - 仅镜像 / 反代开启: direct 请求本来不经它, 无需变更网络
 *
 * 返回恢复函数, 无论登录成败都必须调用一次
 */
export async function beginTempDirect(): Promise<() => Promise<void>> {
  const wasRunning = isEchProxyRunning()
  const echSettingEnabled = systemStore.setting.echProxyEnabled === true

  if (!wasRunning && !echSettingEnabled) return noopRestore

  // 暂停自动重建, 防止切后台选凭据回来时代理被中途拉起
  setEchAutoRestorePaused(true)

  if (wasRunning) await disableEchProxy()

  return async () => {
    // enable 失败时内部自行回滚并返回 0, 下次回前台由生命周期自动重建
    if (wasRunning) await enableEchProxy()
    setEchAutoRestorePaused(false)
  }
}
