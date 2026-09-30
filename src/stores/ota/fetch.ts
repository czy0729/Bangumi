/*
 * @Author: czy0729
 * @Date: 2023-04-26 14:48:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-30 18:43:13
 */
import { pick } from '@utils'
import { gets } from '@utils/kv'
import Crypto from '@utils/thirdParty/crypto'
import { CDN_ADV_DETAIL } from '@constants/cdn/adv'
import Computed from './computed'

import type { SubjectId } from '@types'
import type { ResultData } from '@utils/kv/type'
import type { UnzipItem as NSFWItem } from '@utils/subject/nsfw/types'
import type { ADVItem, AnimeItem, GameItem, HentaiItem, MangaItem, WenkuItem } from './types'

export default class Fetch extends Computed {
  fetchAnime = async (subjectId: SubjectId) => {
    if (!subjectId) return

    const key = `age_${subjectId}`
    if (!subjectId || key in this.state.anime) return

    const datas = await gets<ResultData<AnimeItem>>([key])
    if (datas) {
      const key = 'anime'
      const data: Record<string, Partial<AnimeItem>> = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = item
        } else {
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
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
      const key = 'anime'
      const data: Record<string, Partial<AnimeItem>> = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = pick(item, [
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
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
    }
  }

  fetchGame = async (subjectId: SubjectId) => {
    if (!subjectId) return

    const key = `game_${subjectId}`
    if (!subjectId || key in this.state.game) return

    const datas = await gets<ResultData<GameItem>>([key])
    if (datas) {
      const key = 'game'
      const data: Record<string, Partial<GameItem>> = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = item
        } else {
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
    }
  }

  onGamePage = async (list: number[]) => {
    if (!list.length) return

    const keys: string[] = []
    list.forEach(index => {
      const subjectId = this.gameSubjectId(index)
      const key = `game_${subjectId}`
      if (!subjectId || key in this.state.game) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets<ResultData<GameItem>>(keys)
    if (datas) {
      const key = 'game'
      const data: Record<string, Partial<GameItem>> = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = item
        } else {
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
    }
  }

  /** ADV 详情: CDN 加密单文件 (每条一文件, Crypto.get 解密) */
  onADVPage = async (list: number[]) => {
    if (!list.length) return

    const subjectIds: SubjectId[] = []
    list.forEach(index => {
      const subjectId = this.advSubjectId(index)
      if (!subjectId) return
      if (`adv_${subjectId}` in this.state.adv) return
      subjectIds.push(subjectId)
    })
    if (!subjectIds.length) return

    const datas = await Promise.all(
      subjectIds.map(async subjectId => {
        try {
          const res = await fetch(CDN_ADV_DETAIL(subjectId))
          if (!res.ok) return [subjectId, {}] as const

          const item = Crypto.get<ADVItem>(await res.text())
          return [subjectId, item && typeof item === 'object' ? item : {}] as const
        } catch (error) {
          return [subjectId, {}] as const
        }
      })
    )

    const data: Record<string, Partial<ADVItem>> = {}
    datas.forEach(([subjectId, item]) => {
      data[`adv_${subjectId}`] = item
    })
    this.setState({
      adv: {
        ...this.state.adv,
        ...data
      }
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
      const key = 'manga'
      const data: Record<string, Partial<MangaItem>> = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = pick(item, [
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
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
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
      const key = 'wenku'
      const data: Record<string, Partial<WenkuItem>> = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = item
        } else {
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
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
      const key = 'hentai'
      const data: Record<string, Partial<HentaiItem>> = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = item
        } else {
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
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
      const key = 'nsfw'
      const data: Record<string, Partial<NSFWItem>> = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = item
        } else {
          data[key] = {}
        }
      })
      this.setState({
        [key]: data
      })
      this.save(key)
    }
  }
}
