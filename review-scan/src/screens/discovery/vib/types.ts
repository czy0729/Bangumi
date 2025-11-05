/*
 * @Author: czy0729
 * @Date: 2024-05-04 18:23:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-06 06:32:38
 */
import { WithNavigation } from '@types'
import Store from './store'

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
