/*
 * @Author: czy0729
 * @Date: 2024-05-16 13:09:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 20:13:48
 */
import { useCallback, useRef, useState } from 'react'
import { uiStore, useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'
import { getData, initBangumiData } from './utils'

import type { ListViewInstance } from '@components'
import type { NavigationProps, ScrollEvent } from '@types'
import type { Ctx, Data } from './types'

let fetched = false
let memo: Data | null = null

/** 评分月刊页面逻辑 */
export function useVIBPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  const [loaded, setLoaded] = useState(fetched)
  const [index, setIndex] = useState(0)
  const [data, setData] = useState<Data>(memo || (require('@assets/json/vib.json') as Data))
  const callback = async () => {
    if (fetched) return true

    const remote = await getData()
    if (remote.length > data.length) {
      setData(remote)
      memo = remote
    }

    setLoaded(true)
    fetched = true
  }

  const scrollToRef = useRef<ListViewInstance | null>(null)
  const handleSelect = useCallback(
    (index: number) => {
      setIndex(index)
      setTimeout(() => {
        scrollToRef.current?.scrollToOffset({
          offset: 0,
          animated: true
        })
      }, 40)
    },
    [setIndex]
  )

  const handleScroll = useCallback(
    (event: ScrollEvent) => {
      $.onScroll(event)
      uiStore.closePopableSubject()
    },
    [$]
  )

  usePageLifecycle(
    {
      onEnterComplete() {
        initBangumiData(() => {
          callback()
        })

        $.init()
      },
      onLeaveComplete() {
        $.unmount()
      }
    },
    id
  )

  return {
    ...context,
    loaded,
    data,
    index,
    scrollToRef,
    handleSelect,
    handleScroll
  }
}
