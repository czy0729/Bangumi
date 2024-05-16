/*
 * @Author: czy0729
 * @Date: 2024-05-04 18:23:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 14:14:29
 */
import { Navigation } from '@types'

export type Props = { navigation: Navigation }

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
