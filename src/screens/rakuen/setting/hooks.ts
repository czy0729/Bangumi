/*
 * @Author: czy0729
 * @Date: 2024-01-30 16:24:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-01 18:04:16
 */
import { useCallback, useState } from 'react'
import { rakuenStore, uiStore, userStore } from '@stores'
import { Setting } from '@stores/rakuen/types'
import { usePageLifecycle } from '@utils/hooks'
import { BooleanKeys, NonBooleanKeys } from '@types'

/** 超展开设置页面逻辑 */
export function useRakuenSettingPage() {
  usePageLifecycle(
    {
      onEnterComplete() {
        if (!userStore.isWebLogin) return

        rakuenStore.downloadSetting()
        rakuenStore.fetchPrivacy()
      },
      onBlur() {
        uiStore.closePopableSubject()
      }
    },
    'RakuenSetting'
  )
}

/** 延迟切换设置, 更快响应且避免卡住 UI */
export function useAsyncSwitchSetting(key: BooleanKeys<Setting>) {
  const [value, setValue] = useState(rakuenStore.setting[key])
  const handleSwitch = useCallback(() => {
    setValue(!value)
    setTimeout(() => {
      rakuenStore.switchSetting(key)
    }, 40)
  }, [key, value])

  return {
    value,
    handleSwitch
  }
}

/** 延迟更新设置, 更快响应且避免卡住 UI */
export function useAsyncSetSetting<T extends NonBooleanKeys<Setting>>(key: T) {
  const [value, setValue] = useState(rakuenStore.setting[key])
  const handleSet = useCallback(
    (updateValue: Setting[T]) => {
      setValue(updateValue)
      setTimeout(() => {
        rakuenStore.setSetting(key, updateValue)
      }, 40)
    },
    [key]
  )

  return {
    value,
    handleSet
  }
}
