/*
 * @Author: czy0729
 * @Date: 2024-04-19 16:42:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 23:41:46
 */
import { useCallback, useRef, useState } from 'react'
import { systemStore, userStore } from '@stores'
import { feedback, scrollToView } from '@utils'
import { useMount, useRunAfter } from '@utils/hooks'

import type { ScrollView, View } from 'react-native'
import type { ScrollTo } from '@components'
import type { Setting } from '@stores/system/types'
import type { NavigationProps } from '@types'
import type { Params, SetSettingKeys, SwitchSettingKeys } from './types'

/** 设置页面逻辑 */
export function useSettingPage({ navigation, route }: NavigationProps<Params>) {
  /** 设置筛选 */
  const [filter, setFilter] = useState('')

  /** 设置默认展开 */
  const [open, setOpen] = useState('')

  /** ScrollView.ref */
  const scrollViewRef = useRef<ScrollView | null>(null)

  /** Block 容器 View 实例引用集合 */
  const blockRefs = useRef<Record<string, View | null>>({})

  useRunAfter(() => {
    systemStore.fetchAdvance()
    if (userStore.isWebLogin) userStore.fetchUserSetting()
  })

  useMount(() => {
    const open = route?.params?.open || ''
    if (!open) return

    const component = 'module'
    setTimeout(() => {
      scrollToView(blockRefs.current[component], scrollViewRef.current, () => {
        setOpen(open)
      })
    }, 400)
  })

  return {
    navigation,
    filter,
    setFilter,
    open,

    /** 收集 ScrollView.ref */
    forwardRef: useCallback((_scrollTo: ScrollTo, ref?: ScrollView | null) => {
      scrollViewRef.current = ref ?? null
    }, []),

    /** 收集 Block 容器 View 的 ref */
    onBlockRef: useCallback((ref: View | null, component: string) => {
      setTimeout(() => {
        blockRefs.current[component] = ref
      }, 0)
    }, [])
  }
}

/** 延迟切换设置, 更快响应且避免卡住 UI */
export function useAsyncSwitchSetting(key: SwitchSettingKeys) {
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
export function useAsyncSetSetting<T extends SetSettingKeys>(key: T) {
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
