/*
 * @Author: czy0729
 * @Date: 2022-09-10 16:47:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 页面上下文与筛选类型
 */
import type { Query } from '@utils/subject/anime/types'
import type { WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = {
  /** 深链传入的预选标签 */
  _tags?: string[] | string
}

/** 找番剧筛选条件 (subject Query + 页面本地维度) */
export type ScreenQuery = Query & {
  /** 收藏筛选 (页面本地维度, 不参与 search) */
  collected: string
}

/**
 * 页面标题类型 (多个频道共用同一个 Header)
 *  - Anime / 文库 / 画集 / Manga / 游戏 / ADV / Hentai / NSFW / Music / Real
 */
export type TitleType =
  | 'Anime'
  | '文库'
  | '画集'
  | 'Manga'
  | '游戏'
  | 'ADV'
  | 'Hentai'
  | 'NSFW'
  | 'Music'
  | 'Real'
