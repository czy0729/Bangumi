/*
 * @Author: czy0729
 * @Date: 2022-09-23 06:21:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-23 06:41:56
 */
import { observable, computed } from 'mobx'
import store from '@utils/store'
import { gets } from '@utils/kv'
import { pick as animePick } from '@utils/subject/anime'
import { pick as mangaPick } from '@utils/subject/manga'
import { StoreConstructor, SubjectId } from '@types'
import { NAMESPACE } from './ds'
import { AnimeItem, MangaItem } from './types'
import { pick } from '@utils'

const state = {
  /** 找番剧 */
  anime: {
    age_0: {}
  },

  /** 找漫画 */
  manga: {
    mox_0: {}
  }
}

class OTAStore extends store implements StoreConstructor<typeof state> {
  state = observable(state)

  init = () => {
    return this.readStorage(['anime', 'manga'], NAMESPACE)
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
