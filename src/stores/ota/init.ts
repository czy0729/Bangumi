/*
 * @Author: czy0729
 * @Date: 2022-09-23 06:31:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-01 04:54:10
 */
import type { UnzipItem as NSFWItem } from '@utils/subject/nsfw/types'
import type {
  ADVItem,
  AnimeItem,
  GameItem,
  HentaiItem,
  MangaItem,
  MusicItem,
  RealItem,
  AlbumItem,
  WenkuItem
} from './types'

/** 命名空间 */
export const NAMESPACE = 'OTA'

export const STATE = {
  /** 找番剧 */
  anime: { anime_0: {} } as Record<string, Partial<AnimeItem>>,

  /** 找漫画 */
  manga: { manga_0: {} } as Record<string, Partial<MangaItem>>,

  /** 找游戏  */
  game: { game_0: {} } as Record<string, Partial<GameItem>>,

  /** 找 ADV */
  adv: { adv_0: {} } as Record<string, Partial<ADVItem>>,

  /** 找文库 */
  wenku: { wenku_0: {} } as Record<string, Partial<WenkuItem>>,

  /** 找画集 */
  album: { album_0: {} } as Record<string, Partial<AlbumItem>>,

  /** @deprecated 找 Hentai */
  hentai: { hentai_0: {} } as Record<string, Partial<HentaiItem>>,

  /** 找 NSFW */
  nsfw: { nsfw_0: {} } as Record<string, Partial<NSFWItem>>,

  /** 找音乐 */
  music: { music_0: {} } as Record<string, Partial<MusicItem>>,

  /** 找三次元 */
  real: { real_0: {} } as Record<string, Partial<RealItem>>
}

export const LOADED = {
  anime: false,
  manga: false,
  game: false,
  adv: false,
  wenku: false,
  album: false,
  hentai: false,
  nsfw: false,
  music: false,
  real: false
}
