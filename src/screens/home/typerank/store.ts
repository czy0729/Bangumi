/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:42:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 11:32:02
 */
import { computed, observable } from 'mobx'
import { subjectStore } from '@stores'
import { getTimestamp, pick, updateVisibleBottom } from '@utils'
import store from '@utils/store'
import { gets } from '@utils/kv'
import { SubjectId } from '@types'
import { getIds } from './utils'
import { NAMESPACE, STATE, EXCLUDE_STATE } from './ds'
import { Params } from './types'

export default class ScreenTyperank extends store {
  params: Params

  state = observable(STATE)

  init = async () => {
    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    await this.fetchSubjects()
    this.fetchSubjectsFromOSS()
  }

  fetchSubjects = async () => {
    // 这个接口太慢了, 而且不太依赖, 暂时屏蔽
    return true

    // const ids = [...this.ids]
    // if (!ids.length) return true

    // await subjectStore.initSubjectV2(ids)
    // const now = getTimestamp()
    // const fetchs = []
    // ids.forEach(id => {
    //   const { _loaded } = subjectStore.subjectV2(id)
    //   if (!_loaded || now - Number(_loaded) >= 60 * 60) {
    //     fetchs.push(() => {
    //       console.info('fetchSubjects', id)
    //       return subjectStore.fetchSubjectV2(id)
    //     })
    //   }
    // })
    // if (!fetchs.length) return true

    // return queue(fetchs)
  }

  fetchSubjectsFromOSS = async () => {
    const ids = [...this.ids]
    if (!ids.length) return true

    const { subjects } = this.state
    const now = getTimestamp()
    const fetchIds = []
    ids.forEach(id => {
      // maybe nsfw
      if (!this.subject(id).id) {
        const { _loaded } = subjects[id] || {}
        if (!_loaded || now - Number(_loaded) >= 60 * 60 * 24) {
          const { _loaded } = this.subjectOSS(id)
          if (!_loaded || now - Number(_loaded) >= 60 * 60 * 24) {
            fetchIds.push(`subject_${id}`)
          }
        }
      }
    })
    if (!fetchIds.length) return true

    try {
      console.info('fetchSubjectsFromOSS', fetchIds)

      const data = await gets(fetchIds)
      Object.entries(data).forEach(([key, item]) => {
        try {
          data[key] = pick(item, [
            'name',
            'name_cn',
            'image',
            'rank',
            'rating',
            'totalEps',
            'info',
            'staff',
            'tags'
          ])

          if (data[key].info) {
            data[key].date =
              data[key].info.match(
                /<li><span>(发售日|放送开始|上映年度|上映时间): <\/span>(.+?)<\/li>/
              )?.[2] || ''
          }
          delete data[key].info

          if (!data[key].date && Array.isArray(data[key].tags)) {
            let find = data[key].tags.find(item => /^\d+年\d+月$/.test(item.name))
            if (find) data[key].date = find.name

            find = data[key].tags.find(item => /^\d{4}$/.test(item.name))
            if (find) data[key].date = find.name
          }
          delete data[key].tags

          if (Array.isArray(data[key].staff)) {
            // 原作
            const origin = data[key].staff.find(item => item.desc === '原作')
            data[key].origin = origin?.name || origin?.nameJP || ''

            // 导演
            let director = data[key].staff.find(item => item.desc === '导演')
            data[key].director = director?.name || director?.nameJP || ''

            if (!data[key].director) {
              director = data[key].staff.find(
                item =>
                  item.desc === '作者' || item.desc === '开发' || item.desc === '音乐'
              )
              data[key].director = director?.name || director?.nameJP || ''
            }
          }
          delete data[key].staff

          data[key]._loaded = getTimestamp()
        } catch (error) {}
      })

      this.setState({
        subjects: data
      })
      this.setStorage(NAMESPACE)
    } catch (error) {}
  }

  // -------------------- get --------------------
  @computed get tag() {
    return this.params.tag || ''
  }

  @computed get type() {
    return this.params.type || 'anime'
  }

  @computed get ids() {
    return getIds(this.type, this.tag)
  }

  subject(id: SubjectId) {
    return computed(() => {
      return subjectStore.subjectV2(id)
    }).get()
  }

  subjectOSS(id: SubjectId) {
    return computed(() => {
      return this.state.subjects[`subject_${id}`] || {}
    }).get()
  }

  // -------------------- page --------------------
  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
