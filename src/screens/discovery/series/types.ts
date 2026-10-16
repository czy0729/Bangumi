/*
 * @Author: czy0729
 * @Date: 2022-08-27 22:12:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-02 17:19:57
 *
 * 页面上下文与数据模型
 */
import type { SubjectId, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

/** 用户收藏条目 */
export type CollectionItem = {
  id: SubjectId
  type: number
  ep: number
  updated_at: string
}

/** 条目信息 */
export type SubjectItem = {
  id: SubjectId
  name?: string
  name_cn?: string
  image: string
  date: string
  eps?: number
  total_episodes: number
  platform: string
  rank: number
  score: number
  total: number
  _loaded: number
}
