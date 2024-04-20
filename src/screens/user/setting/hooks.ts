/*
 * @Author: czy0729
 * @Date: 2024-04-19 16:42:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-20 16:11:25
 */
import { useCallback, useState } from 'react'
import { systemStore } from '@stores'
import { INIT_SETTING } from '@stores/system/init'

type Keys = keyof typeof INIT_SETTING

/** 延迟设置, 更快响应, 且避免卡住 UI */
export function useAsyncSwitchSetting(key: Keys) {
  const [value, setValue] = useState(systemStore.setting[key])
  const handleSwitch = useCallback(() => {
    setValue(!value)
    setTimeout(() => {
      systemStore.switchSetting(key)
    }, 40)
  }, [value])

  return {
    value: value as boolean,
    handleSwitch
  }
}
