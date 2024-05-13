/*
 * @Author: czy0729
 * @Date: 2024-05-14 06:21:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-14 06:23:17
 */
import { useState } from 'react'
import { useMount } from '@utils/hooks'
import { getData } from './utils'
import { Data } from './types'

let fetched = false
let memo = null

/** Bangumi 半月刊页面逻辑 */
export function useBiWeeklyPage() {
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

  useMount(() => {
    callback()
  })

  return {
    loaded,
    data
  }
}
