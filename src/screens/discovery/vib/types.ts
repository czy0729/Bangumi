/*
 * @Author: czy0729
 * @Date: 2024-05-04 18:23:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-04 21:10:13
 */
import { Navigation } from '@types'

export type Props = { navigation: Navigation }

export type Data = {
  title: string
  desc: string
  data: {
    key: string
    value: string
  }[]
}
