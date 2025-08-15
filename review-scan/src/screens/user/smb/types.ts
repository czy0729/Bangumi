/*
 * @Author: czy0729
 * @Date: 2022-10-30 04:26:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 00:02:36
 */
import { factory } from '@utils'
import { Cover, Expand, Navigation, Override, Rating, SubjectId, SubjectTypeValue } from '@types'
import Store from './store'
import { ACTIONS_SORT } from './ds'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Sort = (typeof ACTIONS_SORT)[number]

export type SMBRawItem = Expand<{
  createTime: string
  hidden: boolean
  isDirectory: boolean
  lastModified: string
  name: string
  readOnly: boolean
  shortName: string
  size: string
}>

export type WebDAVRawItem = Expand<{
  basename: string
  etag: string
  filename: string
  lastmod: string
  size: number
  type: string
}>

export type SMBListItem = Expand<{
  name: string
  lastModified: string
  path: string
  list: {
    name: string
    type: string
    lastModified: string
    size?: string
  }[]
  ids: SubjectId[]
  tags: string[]
}>

export type SubjectOSS = Expand<{
  id: SubjectId
  jp: string
  cn: string
  date: string
  image: Cover<'c'>
  rank: number
  rating: Rating
  eps: number | ''
  info: string
  type: SubjectTypeValue
  tags?: string[]
  _loaded: number
}>

export type ListItem = Override<
  SMBListItem,
  {
    subjectId: SubjectId
  }
>

export type MergeListItem = Override<
  ListItem,
  {
    merge?: ListItem[]
  }
>
