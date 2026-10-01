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
import Computed from './computed'
import { fetchDetails, isFailed, isRetried, log } from './utils'

import type { ResultData } from '@utils/kv/type'
import type { UnzipItem as NSFWItem } from '@utils/subject/nsfw/types'
import type { SubjectId } from '@types'
import type { ADVItem, AnimeItem, GameItem, HentaiItem, MangaItem, WenkuItem } from './types'

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

  onMangaPage = async (list: number[]) => {
    if (!list.length) return

    const keys: string[] = []
    list.forEach(index => {
      const subjectId = this.mangaSubjectId(index)
      const key = `mox_${subjectId}`
      if (!subjectId || key in this.state.manga) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets<ResultData<MangaItem>>(keys)
    if (datas) {
      const data: Record<string, Partial<MangaItem>> = {}
      Object.keys(datas).forEach(itemKey => {
        const item = datas[itemKey]
        if (item && typeof item === 'object') {
          data[itemKey] = pick(item, [
            'id',
            'mid',
            'title',
            'ep',
            'author',
            'status',
            'cates',
            'publish',
            'update',
            'hot',
            'score',
            'rank',
            'total',
            'image',
            'end'
          ])
        } else {
          data[itemKey] = {}
        }
      })
      this.setState({
        manga: data
      })
      this.save('manga')
    }
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

  onNSFWPage = async (list: number[]) => {
    if (!list.length) return

    const keys: string[] = []
    list.forEach(index => {
      const subjectId = this.nsfwSubjectId(index)
      const key = `nsfw_${subjectId}`
      if (!subjectId || key in this.state.nsfw) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets<ResultData<NSFWItem>>(keys)
    if (datas) {
      const data: Record<string, Partial<NSFWItem>> = {}
      Object.keys(datas).forEach(itemKey => {
        const item = datas[itemKey]
        if (item && typeof item === 'object') {
          data[itemKey] = item
        } else {
          data[itemKey] = {}
        }
      })
      this.setState({
        nsfw: data
      })
      this.save('nsfw')
    }
  }
}
