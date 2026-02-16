/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:49:56
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-29 17:49:56
 */
import { SubjectId, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type BilibiliItem = {
  /** 21226899 */
  id: number

  /** "鬼灭之刃 柱训练篇" */
  title: string

  /** "https://i0.hdslb.com/bfs/bangumi/image/07a4ec8e2a95558a99859e1e374fe4b634e47aaf.png" */
  cover: string

  /** 2 */
  status: number

  /** 条目 ID, 需要经过 bangumi-data 中查找过才存在 */
  subjectId?: SubjectId

  /** "看到第1话 0:01" */
  progress: string

  /** 8 */
  total: number
}

export type Reviews = Record<
  SubjectId,
  {
    content: string
    score: number
  }
>
