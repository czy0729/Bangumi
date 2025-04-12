/*
 * @Author: czy0729
 * @Date: 2024-04-19 16:42:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-11 19:59:10
 */
import { useCallback, useRef, useState } from 'react'
import { systemStore } from '@stores'
import { Setting } from '@stores/system/types'
import { feedback, scrollToView } from '@utils'
import { useMount, useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import { SetSettingKeys, SwitchSettingKeys } from './types'

/** 设置页面逻辑 */
export function useSettingPage({ route }: NavigationProps) {
  /** 设置筛选 */
  const [filter, setFilter] = useState('')

  /** 设置默认展开 */
  const [open, setOpen] = useState('')

  /** ScrollView.ref */
  const scrollViewRef = useRef<any>(null)

  /** 子组件的 ref */
  const blockRefs = useRef<any>({})

  useRunAfter(() => {
    systemStore.fetchAdvance()
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
    filter,
    setFilter,
    open,

    /** 收集 ScrollView.ref */
    forwardRef: useCallback((_scrollTo: any, ref: any) => {
      scrollViewRef.current = ref
    }, []),

    /** 收集子组件的 ref */
    onBlockRef: useCallback((ref: any, component: string) => {
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
