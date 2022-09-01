/*
 * @Author: czy0729
 * @Date: 2022-09-01 12:47:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 13:46:26
 */
import { SUBJECT_TYPE } from '@constants'

export const NAMESPACE = 'ScreenDiscoveryBlog'

export const TABS = [
  {
    title: '全部',
    key: 'all'
  },
  ...SUBJECT_TYPE.map(item => ({
    title: item.title,
    key: item.label
  }))
] as const
