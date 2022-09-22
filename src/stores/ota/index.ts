/*
 * @Author: czy0729
 * @Date: 2022-09-23 06:21:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-23 06:41:56
 */
import { observable, computed } from 'mobx'
import store from '@utils/store'
import { gets } from '@utils/kv'
import { pick as mangaPick } from '@utils/subject/manga'
import { StoreConstructor, SubjectId } from '@types'
import { NAMESPACE } from './ds'
import { MangaItem } from './types'
import { pick } from '@utils'

const state = {
  /** 找漫画 */
  manga: {
    mox_0: {}
  }
}

class OTAStore extends store implements StoreConstructor<typeof state> {
  state = observable(state)

  init = () => {
    return this.readStorage(['manga'], NAMESPACE)
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
      if (!subjectId || subjectId in this.state.manga) return
      keys.push(`mox_${subjectId}`)
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
