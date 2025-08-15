/*
 * @Author: czy0729
 * @Date: 2024-05-01 13:57:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-03 20:18:38
 */
import { useCallback, useState } from 'react'
import { systemStore } from '@stores'
import { Setting } from '@stores/system/types'
import { BooleanKeys, NonBooleanKeys } from '@types'
import { feedback } from '../ui'

/** 延迟切换设置, 更快响应且避免卡住 UI */
export function useAsyncSwitchSetting(key: BooleanKeys<Setting>) {
  const [value, setValue] = useState(systemStore.setting[key])
  const handleSwitch = useCallback(() => {
    setValue(!value)
    feedback(true)

    setTimeout(() => {
      systemStore.switchSetting(key)
    }, 40)
  }, [key, value])

  return {
    value,
    handleSwitch
  }
}

/** 延迟更新设置, 更快响应且避免卡住 UI */
export function useAsyncSetSetting<T extends NonBooleanKeys<Setting>>(key: T) {
  const [value, setValue] = useState(systemStore.setting[key])
  const handleSet = useCallback(
    (updateValue: Setting[T]) => {
      setValue(updateValue)
      feedback(true)

      setTimeout(() => {
        systemStore.setSetting(key, updateValue)
      }, 40)
    },
    [key]
  )

  return {
    value,
    handleSet
  }
}
