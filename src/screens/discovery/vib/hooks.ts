/*
 * @Author: czy0729
 * @Date: 2024-05-16 13:09:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 10:22:29
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInitStore } from '@stores'
import { NavigationProps } from '@types'
import store from './store'
import { getData, initBangumiData } from './utils'
import { Ctx, Data } from './types'

let fetched = false
let memo = null

/** 评分月刊页面逻辑 */
export function useVIBPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const [loaded, setLoaded] = useState(fetched)
  const [index, setIndex] = useState(0)

  const [data, setData] = useState<Data>(memo || require('@assets/json/vib.json'))
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

  const scrollTo = useRef(null)
  const handleSelect = useCallback(
    (index: number) => {
      setIndex(index)
      setTimeout(() => {
        if (typeof scrollTo.current === 'function') {
          scrollTo.current({
            x: 0,
            y: 0,
            animated: true,
            duration: 640
          })
        }
      }, 40)
    },
    [setIndex]
  )

  useEffect(() => {
    initBangumiData(() => {
      callback()
    })
  })

  return {
    ...context,
    loaded,
    data,
    index,
    scrollTo,
    handleSelect
  }
}
