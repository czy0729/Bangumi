/*
 * @Author: czy0729
 * @Date: 2024-04-19 16:42:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-01 16:29:06
 */
import { useCallback, useRef, useState } from 'react'
import { systemStore } from '@stores'
import { Setting } from '@stores/system/types'
import { scrollToView } from '@utils'
import { useMount, useRunAfter } from '@utils/hooks'
import { BooleanKeys, NavigationProps, NonBooleanKeys } from '@types'

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
export function useAsyncSwitchSetting(key: BooleanKeys<Setting>) {
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
export function useAsyncSetSetting<T extends NonBooleanKeys<Setting>>(key: T) {
  const [value, setValue] = useState(systemStore.setting[key])
  const handleSet = useCallback(
    (updateValue: Setting[T]) => {
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
