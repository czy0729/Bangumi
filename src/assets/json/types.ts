/*
 * @Author: czy0729
 * @Date: 2024-08-28 19:23:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-30 22:13:40
 */
import { Expand, Id, SubjectId, SubjectType } from '@types'

type Substring = `substrings/${'anime' | 'book' | 'game' | 'alias' | 'addon'}`

type TypeRank = `typerank/${SubjectType}`

type TypeRankIds = `typerank/${SubjectType}-ids`

export type JSONPath =
  | Substring
  | TypeRank
  | TypeRankIds
  | 'katakana'
  | 'group'
  | 'mono'
  | 'thirdParty/ja.min'
  | 'thirdParty/ja.addon'
  | 'thirdParty/d.min'
  | 'thirdParty/h.min'
  | 'thirdParty/nsfw.min'
  | 'thirdParty/wenku.min'

export type JSONSubString = Record<string, SubjectId>

export type JSONTypeRank = Record<string, SubjectId[]>

export type JSONTypeRankIds = Record<string, SubjectId[]>

export type JSONKatakana = Record<string, string>

export type JSONGroup = {
  t: string
  n: number
  i: number
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

export type JSONWenku = {
  i: number
  f?: string
  v?: number
  m?: number
  a?: number
  b: string
  u: string
  c: number
  h: number
  p?: number
  l: number
  s?: number
  r?: number
  k?: number
  j?: number[]
}[]

export type JSONData = Expand<
  {
    [K in Substring]: JSONSubString
  } & {
    [K in TypeRank]: JSONTypeRank
  } & {
    [K in TypeRankIds]: JSONTypeRankIds
  } & {
    katakana: JSONKatakana
    group: JSONGroup
    mono: JSONMono
    'thirdParty/ja.min': JSONJA
    'thirdParty/ja.addon': JSONJA
    'thirdParty/d.min': JSONDouban
    'thirdParty/h.min': JSONHentai
    'thirdParty/nsfw.min': JSONNSFW
    'thirdParty/wenku.min': JSONWenku
  }
>
