/*
 * @Author: czy0729
 * @Date: 2022-09-23 06:21:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-23 06:41:56
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
import { StoreConstructor, SubjectId } from '@types'
import { NAMESPACE } from './ds'
import { ADVItem, AnimeItem, GameItem, MangaItem, WenkuItem } from './types'

const state = {
  /** 找番剧 */
  anime: {
    age_0: {}
  },

  /** 找漫画 */
  manga: {
    mox_0: {}
  },

  /** 找游戏 | ADV */
  game: {
    game_0: {}
  },

  /** 找文库 */
  wenku: {
    wk8_0: {}
  }
}

class OTAStore extends store implements StoreConstructor<typeof state> {
  state = observable(state)

  init = () => {
    return this.readStorage(['anime', 'manga', 'game', 'wenku'], NAMESPACE)
  }

  // -------------------- anime --------------------
  anime(subjectId: SubjectId) {
    return computed<AnimeItem>(() => {
      return this.state.anime[`age_${subjectId}`] || {}
    }).get()
  }

  animeSubjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = animePick(pickIndex)
      return item?.i || 0
    }).get()
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
      this.setStorage(key, undefined, NAMESPACE)
    }
  }

  // -------------------- manga --------------------
  manga(subjectId: SubjectId) {
    return computed<MangaItem>(() => {
      return this.state.manga[`mox_${subjectId}`] || {}
    }).get()
  }

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
      this.setStorage(key, undefined, NAMESPACE)
    }
  }

  // -------------------- game | adv --------------------
  game(subjectId: SubjectId) {
    return computed<GameItem | ADVItem>(() => {
      return this.state.game[`game_${subjectId}`] || {}
    }).get()
  }

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
      this.setStorage(key, undefined, NAMESPACE)
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
      this.setStorage(key, undefined, NAMESPACE)
    }
  }

  // -------------------- wenku --------------------
  wenku(subjectId: SubjectId) {
    return computed<WenkuItem>(() => {
      return this.state.wenku[`wk8_${subjectId}`] || {}
    }).get()
  }

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
      if (!subjectId || this.wenku(subjectId).id) return

      keys.push(`wk8_${subjectId}`)
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
      this.setStorage(key, undefined, NAMESPACE)
    }
  }
}

export default new OTAStore()
