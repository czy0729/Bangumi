/*
 * @Author: czy0729
 * @Date: 2023-04-26 14:48:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-01 05:51:38
 */
import { pick } from '@utils'
import { gets } from '@utils/kv'
import { CDN_ADV_DETAIL } from '@constants/cdn/adv'
import { CDN_GAME_DETAIL } from '@constants/cdn/game'
import { CDN_MANGA_DETAIL } from '@constants/cdn/manga'
import { CDN_MUSIC_DETAIL } from '@constants/cdn/music'
import { CDN_NSFW_DETAIL } from '@constants/cdn/nsfw'
import { CDN_REAL_DETAIL } from '@constants/cdn/real'
import Computed from './computed'
import { fetchDetails, isFailed, isRetried, log } from './utils'

import type { ResultData } from '@utils/kv/type'
import type { UnzipItem as NSFWItem } from '@utils/subject/nsfw/types'
import type { SubjectId } from '@types'
import type {
  ADVItem,
  AnimeItem,
  GameItem,
  HentaiItem,
  MangaItem,
  MusicItem,
  RealItem,
  WenkuItem
} from './types'

export default class Fetch extends Computed {
  fetchAnime = async (subjectId: SubjectId) => {
    if (!subjectId) return

    const key = `age_${subjectId}`
    if (!subjectId || key in this.state.anime) return

    const datas = await gets<ResultData<AnimeItem>>([key])
    if (datas) {
      const data: Record<string, Partial<AnimeItem>> = {}
      Object.keys(datas).forEach(itemKey => {
        const item = datas[itemKey]
        if (item && typeof item === 'object') {
          data[itemKey] = item
        } else {
          data[itemKey] = {}
        }
      })
      this.setState({
        anime: data
      })
      this.save('anime')
    }
  }

  onAnimePage = async (list: number[]) => {
    if (!list.length) return

    const keys: string[] = []
    list.forEach(index => {
      const subjectId = this.animeSubjectId(index)
      const key = `age_${subjectId}`
      if (!subjectId || key in this.state.anime) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets<ResultData<AnimeItem>>(keys)
    if (datas) {
      const data: Record<string, Partial<AnimeItem>> = {}
      Object.keys(datas).forEach(itemKey => {
        const item = datas[itemKey]
        if (item && typeof item === 'object') {
          data[itemKey] = pick(item, [
            'id',
            'ageId',
            'image',
            'cn',
            'jp',
            'ep',
            'type',
            'status',
            'begin',
            'tags',
            'official',
            'origin',
            'score',
            'rank',
            'total'
          ])
        } else {
          data[itemKey] = {}
        }
      })
      this.setState({
        anime: data
      })
      this.save('anime')
    }
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
    if (!list.length) return

    /** 判重: 无详情且本轮未失败过的直接请求, 已加载但缺封面的每轮冷启动重试一次 */
    const subjectIds: SubjectId[] = []
    list.forEach(index => {
      const subjectId = this.gameSubjectId(index)
      if (!subjectId) return

      const key = `game_${subjectId}`
      const item = this.state.game[key] as Partial<GameItem> | undefined
      if (item?.t) {
        if (item.c || isRetried(key)) return
      } else if (isFailed(key)) {
        return
      }
      subjectIds.push(subjectId)
    })
    if (!subjectIds.length) return

    const data = await fetchDetails<GameItem>(subjectIds, 'game', CDN_GAME_DETAIL, item => !!item.t)
    log('onGamePage', {
      total: list.length,
      requested: subjectIds.length,
      loaded: Object.keys(data).length,
      noCover: Object.keys(data).filter(key => !data[key].c)
    })
    if (!Object.keys(data).length) return

    this.setState({
      game: data
    })
    this.save('game')
  }

  /** ADV 详情: CDN 加密单文件 (每条一文件, Crypto.get 解密) */
  onADVPage = async (list: number[]) => {
    if (!list.length) return

    /** 判重: 无详情且本轮未失败过的直接请求, 已加载但缺封面的每轮冷启动重试一次 */
    const subjectIds: SubjectId[] = []
    list.forEach(index => {
      const subjectId = this.advSubjectId(index)
      if (!subjectId) return

      const key = `adv_${subjectId}`
      const item = this.state.adv[key] as Partial<ADVItem> | undefined
      if (item?.title) {
        if (item.cover || isRetried(key)) return
      } else if (isFailed(key)) {
        return
      }
      subjectIds.push(subjectId)
    })
    if (!subjectIds.length) return

    const data = await fetchDetails<ADVItem>(
      subjectIds,
      'adv',
      CDN_ADV_DETAIL,
      item => !!item.title
    )
    log('onADVPage', {
      total: list.length,
      requested: subjectIds.length,
      loaded: Object.keys(data).length,
      noCover: Object.keys(data).filter(key => !data[key].cover)
    })
    if (!Object.keys(data).length) return

    this.setState({
      adv: data
    })
    this.save('adv')
  }

  /** 漫画详情: CDN 加密单文件 (每条一文件, Crypto.get 解密) */
  onMangaPage = async (list: number[]) => {
    if (!list.length) return

    /** 判重: 无详情且本轮未失败过的直接请求, 已加载但缺封面的每轮冷启动重试一次 */
    const subjectIds: SubjectId[] = []
    list.forEach(index => {
      const subjectId = this.mangaSubjectId(index)
      if (!subjectId) return

      const key = `manga_${subjectId}`
      const item = this.state.manga[key] as Partial<MangaItem> | undefined
      if (item?.title) {
        if (item.cover || isRetried(key)) return
      } else if (isFailed(key)) {
        return
      }
      subjectIds.push(subjectId)
    })
    if (!subjectIds.length) return

    const data = await fetchDetails<MangaItem>(
      subjectIds,
      'manga',
      CDN_MANGA_DETAIL,
      item => !!item.title
    )
    log('onMangaPage', {
      total: list.length,
      requested: subjectIds.length,
      loaded: Object.keys(data).length,
      noCover: Object.keys(data).filter(key => !data[key].cover)
    })
    if (!Object.keys(data).length) return

    this.setState({
      manga: data
    })
    this.save('manga')
  }

  onWenkuPage = async (list: number[]) => {
    if (!list.length) return

    const keys: string[] = []
    list.forEach(index => {
      const subjectId = this.wenkuSubjectId(index)
      const key = `wk8_${subjectId}`
      if (!subjectId || key in this.state.wenku) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets<ResultData<WenkuItem>>(keys)
    if (datas) {
      const data: Record<string, Partial<WenkuItem>> = {}
      Object.keys(datas).forEach(itemKey => {
        const item = datas[itemKey]
        if (item && typeof item === 'object') {
          data[itemKey] = item
        } else {
          data[itemKey] = {}
        }
      })
      this.setState({
        wenku: data
      })
      this.save('wenku')
    }
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
    if (!list.length) return

    /** 判重: 无详情且本轮未失败过的直接请求, 已加载但缺封面的每轮冷启动重试一次 */
    const subjectIds: SubjectId[] = []
    list.forEach(index => {
      const subjectId = this.nsfwSubjectId(index)
      if (!subjectId) return

      const key = `nsfw_${subjectId}`
      const item = this.state.nsfw[key] as Partial<NSFWItem> | undefined
      if (item?.title) {
        if (item.cover || isRetried(key)) return
      } else if (isFailed(key)) {
        return
      }
      subjectIds.push(subjectId)
    })
    if (!subjectIds.length) return

    const data = await fetchDetails<NSFWItem>(
      subjectIds,
      'nsfw',
      CDN_NSFW_DETAIL,
      item => !!item.title
    )
    log('onNSFWPage', {
      total: list.length,
      requested: subjectIds.length,
      loaded: Object.keys(data).length,
      noCover: Object.keys(data).filter(key => !data[key].cover)
    })
    if (!Object.keys(data).length) return

    this.setState({
      nsfw: data
    })
    this.save('nsfw')
  }

  /** 音乐详情: CDN 加密单文件 (每条一文件, Crypto.get 解密) */
  onMusicPage = async (list: number[]) => {
    if (!list.length) return

    /** 判重: 无详情且本轮未失败过的直接请求, 已加载但缺封面的每轮冷启动重试一次 */
    const subjectIds: SubjectId[] = []
    list.forEach(index => {
      const subjectId = this.musicSubjectId(index)
      if (!subjectId) return

      const key = `music_${subjectId}`
      const item = this.state.music[key] as Partial<MusicItem> | undefined
      if (item?.title) {
        if (item.cover || isRetried(key)) return
      } else if (isFailed(key)) {
        return
      }
      subjectIds.push(subjectId)
    })
    if (!subjectIds.length) return

    const data = await fetchDetails<MusicItem>(
      subjectIds,
      'music',
      CDN_MUSIC_DETAIL,
      item => !!item.title
    )
    log('onMusicPage', {
      total: list.length,
      requested: subjectIds.length,
      loaded: Object.keys(data).length,
      noCover: Object.keys(data).filter(key => !data[key].cover)
    })
    if (!Object.keys(data).length) return

    this.setState({
      music: data
    })
    this.save('music')
  }

  /** 三次元详情: CDN 加密单文件 (每条一文件, Crypto.get 解密) */
  onRealPage = async (list: number[]) => {
    if (!list.length) return

    /** 判重: 无详情且本轮未失败过的直接请求, 已加载但缺封面的每轮冷启动重试一次 */
    const subjectIds: SubjectId[] = []
    list.forEach(index => {
      const subjectId = this.realSubjectId(index)
      if (!subjectId) return

      const key = `real_${subjectId}`
      const item = this.state.real[key] as Partial<RealItem> | undefined
      if (item?.title) {
        if (item.cover || isRetried(key)) return
      } else if (isFailed(key)) {
        return
      }
      subjectIds.push(subjectId)
    })
    if (!subjectIds.length) return

    const data = await fetchDetails<RealItem>(
      subjectIds,
      'real',
      CDN_REAL_DETAIL,
      item => !!item.title
    )
    log('onRealPage', {
      total: list.length,
      requested: subjectIds.length,
      loaded: Object.keys(data).length,
      noCover: Object.keys(data).filter(key => !data[key].cover)
    })
    if (!Object.keys(data).length) return

    this.setState({
      real: data
    })
    this.save('real')
  }
}
