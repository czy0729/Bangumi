/*
 * @Author: czy0729
 * @Date: 2022-10-30 04:26:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-19 10:49:11
 */
import { factory } from '@utils'
import { Cover, Navigation, Rating, SubjectId, SubjectTypeValue } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type SMBRawItem = {
  createTime: string
  hidden: boolean
  isDirectory: boolean
  lastModified: string
  name: string
  readOnly: boolean
  shortName: string
  size: string
}

export type WebDAVRawItem = {
  basename: string
  etag: string
  filename: string
  lastmod: string
  size: number
  type: string
}

export type SMBListItem = {
  name: string
  lastModified: string
  path: string
  list: {
    name: string
    type: string
    lastModified: string
  }[]
  ids: SubjectId[]
  tags: string[]
}

export type SubjectOSS = {
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
  _loaded: number
}
