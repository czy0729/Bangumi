/*
 * @Author: czy0729
 * @Date: 2024-04-19 16:42:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-20 16:11:25
 */
import { useCallback, useState } from 'react'
import { systemStore } from '@stores'
import { INIT_SETTING } from '@stores/system/init'
import { BooleanKeys, NonBooleanKeys } from '@types'

/** 延迟切换设置, 更快响应且避免卡住 UI */
export function useAsyncSwitchSetting(key: BooleanKeys<typeof INIT_SETTING>) {
  const [value, setValue] = useState(systemStore.setting[key])
  const handleSwitch = useCallback(() => {
    setValue(!value)
    setTimeout(() => {
      systemStore.switchSetting(key)
    }, 40)
  }, [value])

  return {
    value,
    handleSwitch
  }
}

/** 延迟更新设置, 更快响应且避免卡住 UI */
export function useAsyncSetSetting<T extends NonBooleanKeys<typeof INIT_SETTING>>(key: T) {
  const [value, setValue] = useState(systemStore.setting[key])
  const handleSet = useCallback(
    (updateValue: (typeof INIT_SETTING)[T]) => {
      setValue(updateValue)
      setTimeout(() => {
        systemStore.setSetting(key, updateValue)
      }, 40)
    },
    [value]
  )

  return {
    value,
    handleSet
  }
}
