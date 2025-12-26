/*
 * @Author: czy0729
 * @Date: 2024-05-04 18:23:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 01:52:47
 */
import type { WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type ItemNew = {
  id: string
  title: string
  rating?: string
  value1?: string
  value2?: string
}

export type ItemTrend = {
  id: string
  title: string
  value?: string
}

export type Data = {
  title: string
  desc: string
  data: {
    title: string
    data: (ItemNew | ItemTrend)[]
  }[]
}[]
