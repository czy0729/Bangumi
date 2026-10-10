/*
 * @Author: czy0729
 * @Date: 2024-05-14 06:21:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 11:00:00
 *
 * Bangumi 半月刊页面逻辑: 本地 json 兜底展示, 远端数据更新后替换
 */
import { useState } from 'react'
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'
import { getData } from './utils'

import type { NavigationProps } from '@types'
import type { Ctx, Data } from './types'

let fetched = false
let memo: Data | null = null

/** Bangumi 半月刊页面逻辑 */
export function useBiWeeklyPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  const [loaded, setLoaded] = useState(fetched)
  const [data, setData] = useState<Data>(memo || (require('@assets/json/biweekly.json') as Data))
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

  usePageLifecycle(
    {
      async onEnterComplete() {
        await $.init()

        callback()
      },
      onLeaveComplete() {
        $.unmount()
      }
    },
    id
  )

  return {
    ...context,

    /** 是否加载完成 */
    loaded,

    /** 列表数据 */
    data
  }
}
