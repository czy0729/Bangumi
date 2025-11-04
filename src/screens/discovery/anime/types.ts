/*
 * @Author: czy0729
 * @Date: 2022-09-10 16:47:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-04 15:46:38
 */
import type { WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = {
  _tags?: string[] | string
}

export type TitleType = 'Anime' | '文库' | 'Manga' | '游戏' | 'ADV' | 'Hentai' | 'NSFW'
