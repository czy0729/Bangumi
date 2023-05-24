/*
 * @Author: czy0729
 * @Date: 2023-05-24 11:13:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-24 16:57:01
 */
import { computed, observable } from 'mobx'
import { getTimestamp, pick, queue } from '@utils'
import store from '@utils/store'
import { gets } from '@utils/kv'
import { subjectStore } from '@stores'
import { xhrCustom } from '@utils/fetch'
import { SubjectId } from '@types'
import { NAMESPACE, STATE, EXCLUDE_STATE } from './ds'

export default class ScreenRecommend extends store {
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
    const ids = [...this.ids]
    if (!ids.length) return true

    await subjectStore.initSubjectV2(ids)
    const now = getTimestamp()
    const fetchs = []
    ids.forEach(id => {
      const { _loaded } = subjectStore.subjectV2(id)
      if (!_loaded || now - Number(_loaded) >= 60 * 60) {
        fetchs.push(() => {
          console.info('fetchSubjects', id)
          return subjectStore.fetchSubjectV2(id)
        })
      }
    })
    if (!fetchs.length) return true

    return queue(fetchs)
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
        if (!_loaded || now - Number(_loaded) >= 60 * 60) {
          fetchIds.push(`subject_${id}`)
        }
      }
    })
    if (!fetchIds.length) return true

    try {
      console.info('fetchSubjectsFromOSS', fetchIds)
      const data = await gets(fetchIds)
      Object.entries(([key, item]) => {
        try {
          data[key] = pick(item, [
            'name',
            'name_cn',
            'image',
            'rank',
            'rating',
            'totalEps',
            'info'
          ])
          if (data[key].info) {
            data[key].date =
              data[key].info.match(
                /<li><span>(发售日|放送开始|上映年度|上映时间): <\/span>(.+?)<\/li>/
              )?.[2] || ''
            delete data[key].info
          }
        } catch (error) {}
      })
      this.setState({
        subjects: data
      })
      this.setStorage(NAMESPACE)
    } catch (error) {}
  }

  // -------------------- get --------------------
  @computed get ids() {
    const ids: SubjectId[] = []
    const { data } = this.state
    ;['top', 'pop', 'tv', 'old_tv', 'movie', 'old_movie', 'nsfw'].forEach(key => {
      data[key].forEach((id: SubjectId) => {
        ids.push(id)
      })
    })
    return ids
  }

  subject(id: SubjectId) {
    return computed(() => {
      return subjectStore.subjectV2(id)
    }).get()
  }

  subjectOSS(id: SubjectId) {
    return computed(() => {
      return this.state.subjects[id] || {}
    }).get()
  }

  // -------------------- page --------------------
  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      value: text
    })
  }

  // -------------------- action --------------------
  doSearch = async () => {
    try {
      const { value } = this.state
      if (!value) return

      this.setState({
        searching: true
      })
      const { _response } = await xhrCustom({
        url: `http://101.43.236.40/api/rec/${value.trim()}`
      })
      const data = JSON.parse(_response)
      if ('tv' in data) {
        this.setState({
          data
        })
        await this.fetchSubjects()
        await this.fetchSubjectsFromOSS()
        this.setStorage(NAMESPACE)
      }
    } catch (ex) {}

    this.setState({
      searching: false
    })
  }
}
