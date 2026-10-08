/*
 * @Author: czy0729
 * @Date: 2024-08-28 19:23:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 06:16:53
 */
import type { Expand, Id, SubjectId } from '@types'

type Substring = `substrings/${'anime' | 'book' | 'game' | 'real' | 'alias' | 'addon'}`

// typerank 的 ids / ranks 已迁移到 protobuf (见 @utils/thirdParty/protobuf)
export type JSONPath =
  | Substring
  | 'group'
  | 'nsfw_id_distribution'
  | 'thirdParty/ja.addon'
  | 'thirdParty/h.min'

export type JSONSubString = Record<string, SubjectId>

export type JSONKatakana = Record<string, string>

export type JSONGroup = {
  t: string
  n: number
  i: number
  u?: number
}[]

export type JSONMono = {
  i: number
  n: string
  c: string
  r: number
  p?: 1
}[]

export type JSONJA = Record<string, SubjectId>

export type JSONDouban = Record<Id, SubjectId>

export type JSONHentai = {
  id: number
  f?: string
  s?: number
  r?: number
  n?: number
  a: string
  t: number[]
}[]

export type JSONNSFW = {
  i: number
  t?: number
  d?: string
  s?: number
  r?: number
  l?: number
  c?: number
  e?: number
}[]

export type JSONData = Expand<
  {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [K in Substring]: JSONSubString
  } & {
    group: JSONGroup
    nsfw_id_distribution: number[]
    'thirdParty/ja.addon': JSONJA
    'thirdParty/h.min': JSONHentai
  }
>
