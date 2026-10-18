/*
 * @Author: czy0729
 * @Date: 2024-05-16 13:09:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 20:13:48
 *
 * 评分月刊页面逻辑: 本地快照兜底, 远端数据更新时覆盖
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

  /** ListView.ref */
  const listRef = useRef<ListViewInstance | null>(null)

  /** 收集长列表的 ref */
  const handleForwardRef = useCallback((ref: ListViewInstance | null) => {
    listRef.current = ref
  }, [])

  /** 远端期数多于本地快照时覆盖 */
  const fetchRemote = async () => {
    if (fetched) return true

    const remote = await getData()
    if (remote.length > data.length) {
      setData(remote)
      memo = remote
    }

    setLoaded(true)
    fetched = true
  }

  /** 切期: 更新当前期并回到列表顶部 */
  const handleSelect = useCallback((index: number) => {
    setIndex(index)

    setTimeout(() => {
      listRef.current?.scrollToOffset({
        offset: 0,
        animated: true
      })
    }, 40)
  }, [])

  /** 滚动 */
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
          fetchRemote()
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

    /** 数据是否已就绪 */
    loaded,

    /** 各期数据 */
    data,

    /** 当前期下标 */
    index,

    /** 收集长列表的 ref */
    handleForwardRef,

    /** 切期 */
    handleSelect,

    /** 滚动 */
    handleScroll
  }
}
