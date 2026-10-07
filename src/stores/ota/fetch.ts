/*
 * @Author: czy0729
 * @Date: 2023-04-26 14:48:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-01 05:51:38
 */
import { gets } from '@utils/kv'
import { CDN_ADV_DETAIL } from '@constants/cdn/adv'
import { CDN_ALBUM_DETAIL } from '@constants/cdn/album'
import { CDN_ANIME_DETAIL } from '@constants/cdn/anime'
import { CDN_GAME_DETAIL } from '@constants/cdn/game'
import { CDN_MANGA_DETAIL } from '@constants/cdn/manga'
import { CDN_MUSIC_DETAIL } from '@constants/cdn/music'
import { CDN_NSFW_DETAIL } from '@constants/cdn/nsfw'
import { CDN_REAL_DETAIL } from '@constants/cdn/real'
import { CDN_WENKU_DETAIL } from '@constants/cdn/wenku'
import Computed from './computed'
import { fetchDetailPage, fetchDetails } from './utils'

import type { ResultData } from '@utils/kv/type'
import type { UnzipItem as NSFWItem } from '@utils/subject/nsfw/types'
import type { SubjectId } from '@types'
import type {
  ADVItem,
  AnimeItem,
  GameItem,
  AlbumItem,
  HentaiItem,
  MangaItem,
  MusicItem,
  RealItem,
  WenkuItem
} from './types'

export default class Fetch extends Computed {
  /** 番剧详情: CDN 加密单文件 (每条一文件, Crypto.get 解密) */
  fetchAnime = async (subjectId: SubjectId) => {
    if (!subjectId) return

    const key = `anime_${subjectId}`
    if (key in this.state.anime) return

    const data = await fetchDetails<AnimeItem>(
      [subjectId],
      'anime',
      CDN_ANIME_DETAIL,
      /** cn 可选 (bgm 条目可能无中文名, 仅 jp), 不能作为有效性依据 */
      item => !!(item.cn || item.jp)
    )
    if (!Object.keys(data).length) return

    this.setState({
      anime: data
    })
    this.save('anime')
  }

  /** 番剧详情: CDN 加密单文件 (每条一文件, Crypto.get 解密) */
  onAnimePage = async (list: number[]) => {
    const data = await fetchDetailPage<AnimeItem>({
      list,
      name: 'anime',
      label: 'onAnimePage',
      cache: this.state.anime,
      subjectId: index => this.animeSubjectId(index),
      getUrl: CDN_ANIME_DETAIL,
      isLoaded: item => !!(item.cn || item.jp),
      hasCover: item => !!item.image
    })
    if (!Object.keys(data).length) return

    this.setState({
      anime: data
    })
    this.save('anime')
  }

  fetchGame = async (subjectId: SubjectId) => {
    if (!subjectId) return

    const key = `game_${subjectId}`
    if (!subjectId || key in this.state.game) return

    const datas = await gets<ResultData<GameItem>>([key])
    if (datas) {
      const data: Record<string, Partial<GameItem>> = {}
      Object.keys(datas).forEach(itemKey => {
        const item = datas[itemKey]
        if (item && typeof item === 'object') {
          data[itemKey] = item
        } else {
          data[itemKey] = {}
        }
      })
      this.setState({
        game: data
      })
      this.save('game')
    }
  }

  /** 游戏详情: CDN 加密单文件 (每条一文件, Crypto.get 解密) */
  onGamePage = async (list: number[]) => {
    const data = await fetchDetailPage<GameItem>({
      list,
      name: 'game',
      label: 'onGamePage',
      cache: this.state.game,
      subjectId: index => this.gameSubjectId(index),
      getUrl: CDN_GAME_DETAIL,
      isLoaded: item => !!item.t,
      hasCover: item => !!item.c
    })
    if (!Object.keys(data).length) return

    this.setState({
      game: data
    })
    this.save('game')
  }

  /** ADV 详情: CDN 加密单文件 (每条一文件, Crypto.get 解密) */
  onADVPage = async (list: number[]) => {
    const data = await fetchDetailPage<ADVItem>({
      list,
      name: 'adv',
      label: 'onADVPage',
      cache: this.state.adv,
      subjectId: index => this.advSubjectId(index),
      getUrl: CDN_ADV_DETAIL,
      isLoaded: item => !!item.title,
      hasCover: item => !!item.cover
    })
    if (!Object.keys(data).length) return

    this.setState({
      adv: data
    })
    this.save('adv')
  }

  /** 漫画详情: CDN 加密单文件 (每条一文件, Crypto.get 解密) */
  onMangaPage = async (list: number[]) => {
    const data = await fetchDetailPage<MangaItem>({
      list,
      name: 'manga',
      label: 'onMangaPage',
      cache: this.state.manga,
      subjectId: index => this.mangaSubjectId(index),
      getUrl: CDN_MANGA_DETAIL,
      isLoaded: item => !!item.title,
      hasCover: item => !!item.cover
    })
    if (!Object.keys(data).length) return

    this.setState({
      manga: data
    })
    this.save('manga')
  }

  /** 文库详情: CDN 加密单文件 (每条一文件, Crypto.get 解密) */
  onWenkuPage = async (list: number[]) => {
    const data = await fetchDetailPage<WenkuItem>({
      list,
      name: 'wenku',
      label: 'onWenkuPage',
      cache: this.state.wenku,
      subjectId: index => this.wenkuSubjectId(index),
      getUrl: CDN_WENKU_DETAIL,
      isLoaded: item => !!item.title,
      hasCover: item => !!item.cover
    })
    if (!Object.keys(data).length) return

    this.setState({
      wenku: data
    })
    this.save('wenku')
  }

  /** 画集详情: CDN 加密单文件 (每条一文件, Crypto.get 解密) */
  onAlbumPage = async (list: number[]) => {
    const data = await fetchDetailPage<AlbumItem>({
      list,
      name: 'album',
      label: 'onAlbumPage',
      cache: this.state.album,
      subjectId: index => this.albumSubjectId(index),
      getUrl: CDN_ALBUM_DETAIL,
      isLoaded: item => !!item.title,
      hasCover: item => !!item.cover
    })
    if (!Object.keys(data).length) return

    this.setState({
      album: data
    })
    this.save('album')
  }

  onHentaiPage = async (list: number[]) => {
    if (!list.length) return

    const keys: string[] = []
    list.forEach(index => {
      const subjectId = this.hentaiSubjectId(index)
      const key = `hentai_${subjectId}`
      if (!subjectId || key in this.state.hentai) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets<ResultData<HentaiItem>>(keys)
    if (datas) {
      const data: Record<string, Partial<HentaiItem>> = {}
      Object.keys(datas).forEach(itemKey => {
        const item = datas[itemKey]
        if (item && typeof item === 'object') {
          data[itemKey] = item
        } else {
          data[itemKey] = {}
        }
      })
      this.setState({
        hentai: data
      })
      this.save('hentai')
    }
  }

  /** NSFW 详情: CDN 加密单文件 (每条一文件, Crypto.get 解密) */
  onNSFWPage = async (list: number[]) => {
    const data = await fetchDetailPage<NSFWItem>({
      list,
      name: 'nsfw',
      label: 'onNSFWPage',
      cache: this.state.nsfw,
      subjectId: index => this.nsfwSubjectId(index),
      getUrl: CDN_NSFW_DETAIL,
      isLoaded: item => !!item.title,
      hasCover: item => !!item.cover
    })
    if (!Object.keys(data).length) return

    this.setState({
      nsfw: data
    })
    this.save('nsfw')
  }

  /** 音乐详情: CDN 加密单文件 (每条一文件, Crypto.get 解密) */
  onMusicPage = async (list: number[]) => {
    const data = await fetchDetailPage<MusicItem>({
      list,
      name: 'music',
      label: 'onMusicPage',
      cache: this.state.music,
      subjectId: index => this.musicSubjectId(index),
      getUrl: CDN_MUSIC_DETAIL,
      isLoaded: item => !!item.title,
      hasCover: item => !!item.cover
    })
    if (!Object.keys(data).length) return

    this.setState({
      music: data
    })
    this.save('music')
  }

  /** 三次元详情: CDN 加密单文件 (每条一文件, Crypto.get 解密) */
  onRealPage = async (list: number[]) => {
    const data = await fetchDetailPage<RealItem>({
      list,
      name: 'real',
      label: 'onRealPage',
      cache: this.state.real,
      subjectId: index => this.realSubjectId(index),
      getUrl: CDN_REAL_DETAIL,
      isLoaded: item => !!item.title,
      hasCover: item => !!item.cover
    })
    if (!Object.keys(data).length) return

    this.setState({
      real: data
    })
    this.save('real')
  }
}
