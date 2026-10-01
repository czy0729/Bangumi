/*
 * @Author: czy0729
 * @Date: 2022-09-23 06:31:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-01 04:54:10
 */
import type { UnzipItem as NSFWItem } from '@utils/subject/nsfw/types'
import type { ADVItem, AnimeItem, GameItem, HentaiItem, MangaItem, WenkuItem } from './types'

/** 命名空间 */
export const NAMESPACE = 'OTA'

export const STATE = {
  /** 找番剧 */
  anime: { age_0: {} } as Record<string, Partial<AnimeItem>>,

  /** 找漫画 */
  manga: { mox_0: {} } as Record<string, Partial<MangaItem>>,

  /** 找游戏  */
  game: { game_0: {} } as Record<string, Partial<GameItem>>,

  /** 找 ADV */
  adv: { adv_0: {} } as Record<string, Partial<ADVItem>>,

  /** 找文库 */
  wenku: { wk8_0: {} } as Record<string, Partial<WenkuItem>>,

  /** @deprecated 找 Hentai */
  hentai: { hentai_0: {} } as Record<string, Partial<HentaiItem>>,

  /** 找 NSFW */
  nsfw: { nsfw_0: {} } as Record<string, Partial<NSFWItem>>
}

export const LOADED = {
  anime: false,
  manga: false,
  game: false,
  adv: false,
  wenku: false,
  hentai: false,
  nsfw: false
}
