/*
 * @Author: czy0729
 * @Date: 2026-11-21 11:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-21 11:00:00
 */
import { NativeModules } from 'react-native'
import { systemStore } from '@stores'
import { ANDROID } from '@constants/env'
import { logger } from '@utils/dev'

const TAG = 'text-share'

/** TextShareModule (android/app/src/main/java/com/czy0729/bangumi/TextShareModule.java) */
type TextShareModuleType = {
  setProcessTextEnabled?: (enabled: boolean) => Promise<boolean>
}

const TextShareModule = NativeModules.TextShareModule as TextShareModuleType | undefined

/**
 * 按设置开关系统长按文字菜单入口 (Android)
 *  - PackageManager 的组件状态会因应用升级重置为默认开启, 启动时需要重新应用
 *  - 不传值时读取当前设置, 传入值用于设置页切换时立即生效
 * */
export function syncProcessTextEnabled(enabled?: boolean) {
  if (!ANDROID) return

  const value = enabled ?? systemStore.setting.processText
  TextShareModule?.setProcessTextEnabled?.(value)?.catch(error => {
    logger.warn(TAG, 'setProcessTextEnabled failed:', value, error)
  })
}
