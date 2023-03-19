/*
 * @Author: czy0729
 * @Date: 2022-09-23 06:21:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-20 04:31:04
 */
import { observable, computed } from 'mobx'
import { pick } from '@utils'
import store from '@utils/store'
import { gets } from '@utils/kv'
import { pick as animePick } from '@utils/subject/anime'
import { pick as mangaPick } from '@utils/subject/manga'
import { pick as gamePick } from '@utils/subject/game'
import { pick as advPick } from '@utils/subject/adv'
import { pick as wenkuPick } from '@utils/subject/wenku'
import { pick as hentaiPick } from '@utils/subject/hentai'
import { DEV } from '@constants'
import { StoreConstructor, SubjectId } from '@types'
import { LOG_INIT } from '../ds'
import { LOADED, NAMESPACE, STATE } from './init'
import { ADVItem, AnimeItem, GameItem, HentaiItem, MangaItem, WenkuItem } from './types'

type CacheKey = keyof typeof LOADED

class OTAStore extends store implements StoreConstructor<typeof STATE> {
  state = observable(STATE)

  private _loaded = LOADED

  init = (key: CacheKey) => {
    if (!key || this._loaded[key]) return true

    if (DEV && LOG_INIT) console.info('OTAStore /', key)

    this._loaded[key] = true
    return this.readStorage([key], NAMESPACE)
  }

  save = (key: CacheKey) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }

  // -------------------- get --------------------
  anime(subjectId: SubjectId) {
    this.init('anime')
    return computed<AnimeItem>(() => {
      return this.state.anime[`age_${subjectId}`] || {}
    }).get()
  }

  manga(subjectId: SubjectId) {
    this.init('manga')
    return computed<MangaItem>(() => {
      return this.state.manga[`mox_${subjectId}`] || {}
    }).get()
  }

  game(subjectId: SubjectId) {
    this.init('game')
    return computed<GameItem | ADVItem>(() => {
      return this.state.game[`game_${subjectId}`] || {}
    }).get()
  }

  wenku(subjectId: SubjectId) {
    this.init('wenku')
    return computed<WenkuItem>(() => {
      return this.state.wenku[`wk8_${subjectId}`] || {}
    }).get()
  }

  hentai(subjectId: SubjectId) {
    this.init('hentai')
    return computed<HentaiItem>(() => {
      return this.state.hentai[`hentai_${subjectId}`] || {}
    }).get()
  }

  // -------------------- anime --------------------
  animeSubjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = animePick(pickIndex)
      return item?.i || 0
    }).get()
  }

  fetchAnime = async (subjectId: SubjectId) => {
    if (!subjectId) return

    const key = `age_${subjectId}`
    if (!subjectId || key in this.state.anime) return

    const datas = await gets([key])
    if (datas) {
      const key = 'anime'
      const data = {}
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

    const keys = []
    list.forEach(index => {
      const subjectId = this.animeSubjectId(index)
      const key = `age_${subjectId}`
      if (!subjectId || key in this.state.anime) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets(keys)
    if (datas) {
      const key = 'anime'
      const data = {}
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

  // -------------------- manga --------------------
  mangaSubjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = mangaPick(pickIndex)
      return item?.i || 0
    }).get()
  }

  onMangaPage = async (list: number[]) => {
    if (!list.length) return

    const keys = []
    list.forEach(index => {
      const subjectId = this.mangaSubjectId(index)
      const key = `mox_${subjectId}`
      if (!subjectId || key in this.state.manga) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets(keys)
    if (datas) {
      const key = 'manga'
      const data = {}
      Object.keys(datas).forEach(key => {
        const item = datas[key]
        if (item && typeof item === 'object') {
          data[key] = pick(item, [
            'id',
            'mid',
            'title',
            'image',
            'score',
            'rank',
            'total',
            'ep',
            'author',
            'status',
            'cates',
            'publish',
            'update',
            'hot'
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

  // -------------------- game | adv --------------------
  gameSubjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = gamePick(pickIndex)
      return item?.i || 0
    }).get()
  }

  advSubjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = advPick(pickIndex)
      return item?.i || 0
    }).get()
  }

  fetchGame = async (subjectId: SubjectId) => {
    if (!subjectId) return

    const key = `game_${subjectId}`
    if (!subjectId || key in this.state.game) return

    const datas = await gets([key])
    if (datas) {
      const key = 'game'
      const data = {}
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

    const keys = []
    list.forEach(index => {
      const subjectId = this.gameSubjectId(index)
      const key = `game_${subjectId}`
      if (!subjectId || key in this.state.game) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets(keys)
    if (datas) {
      const key = 'game'
      const data = {}
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

  onADVPage = async (list: number[]) => {
    if (!list.length) return

    const keys = []
    list.forEach(index => {
      const subjectId = this.advSubjectId(index)
      const key = `game_${subjectId}`
      if (!subjectId || key in this.state.game) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets(keys)
    if (datas) {
      const key = 'game'
      const data = {}
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

  // -------------------- wenku --------------------
  wenkuSubjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = wenkuPick(pickIndex)
      return item?.i || 0
    }).get()
  }

  onWenkuPage = async (list: number[]) => {
    if (!list.length) return

    const keys = []
    list.forEach(index => {
      const subjectId = this.wenkuSubjectId(index)
      const key = `wk8_${subjectId}`
      if (!subjectId || key in this.state.wenku) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets(keys)
    if (datas) {
      const key = 'wenku'
      const data = {}
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

  // -------------------- hentai --------------------
  hentaiSubjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = hentaiPick(pickIndex)
      return item?.id || 0
    }).get()
  }

  onHentaiPage = async (list: number[]) => {
    if (!list.length) return

    const keys = []
    list.forEach(index => {
      const subjectId = this.hentaiSubjectId(index)
      const key = `hentai_${subjectId}`
      if (!subjectId || key in this.state.hentai) return
      keys.push(key)
    })
    if (!keys.length) return

    const datas = await gets(keys)
    if (datas) {
      const key = 'hentai'
      const data = {}
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

export default new OTAStore()
