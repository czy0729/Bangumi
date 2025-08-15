import { useState } from 'react'
import { postTask } from '@utils'
/*
 * @Author: czy0729
 * @Date: 2025-02-14 07:10:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-14 08:54:22
 */
import { useMount } from '@utils/hooks'
import { Data as VIBData } from '@screens/discovery/vib/types'
import { SubjectId } from '@types'
import { TrendData } from './types'

const FILTER = [
  '朴素排名增加最多',
  '朴素排名减少最多',
  '评分增加最多',
  '评分减少最多',
  '评分人数增加最多'
]

const MEMO = new Map<SubjectId, TrendData>()

export function useVIBTrend(id: SubjectId) {
  const [data, setData] = useState<TrendData>(MEMO.get(id) || [])

  useMount(() => {
    if (MEMO.has(id)) return

    postTask(() => {
      const vib: VIBData = require('@assets/json/vib.json')
      const data: TrendData = []
      vib.forEach(month => {
        month.data.forEach(item => {
          const { title } = item
          if (FILTER.includes(title)) {
            const find = item.data.find(i => i.id == id)
            if (find && 'value' in find && find.value) {
              const text = title.includes('人数')
                ? '评分人数'
                : title.includes('排名')
                ? '排名'
                : title.includes('评分')
                ? '评分'
                : ''
              if (text) {
                data.push({
                  month: month.title,
                  title: text,
                  value: find.value
                })
              }
            }
          }
        })
      })

      MEMO.set(id, data)
      setData(data)
    })
  })

  return data
}
