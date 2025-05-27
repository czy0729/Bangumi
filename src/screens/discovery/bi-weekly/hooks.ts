/*
 * @Author: czy0729
 * @Date: 2024-05-14 06:21:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 12:11:07
 */
import { useState } from 'react'
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { getData } from './utils'
import { Ctx, Data } from './types'

let fetched = false
let memo = null

/** Bangumi 半月刊页面逻辑 */
export function useBiWeeklyPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  const [loaded, setLoaded] = useState(fetched)
  const [data, setData] = useState<Data>(memo || require('@assets/json/biweekly.json'))
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
    loaded,
    data
  }
}
