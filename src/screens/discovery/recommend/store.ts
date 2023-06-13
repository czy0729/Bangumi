/*
 * @Author: czy0729
 * @Date: 2023-05-24 11:13:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-13 18:50:45
 */
import { computed, observable } from 'mobx'
import { subjectStore, userStore } from '@stores'
import { desc, getTimestamp, info, pick, updateVisibleBottom } from '@utils'
import axios from '@utils/thirdParty/axios'
import store from '@utils/store'
import { gets } from '@utils/kv'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE, STORYBOOK } from '@constants'
import { SubjectId, SubjectTypeValue } from '@types'
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

    if (!STORYBOOK) {
      if (this.state.value === '' && userStore.myId) {
        this.setState({
          value: String(userStore.myId)
        })
      }

      await this.fetchSubjects()
    }
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
        if (!_loaded || now - Number(_loaded) >= 60 * 60) {
          const { _loaded } = this.subjectOSS(id)
          if (!_loaded || now - Number(_loaded) >= 60 * 60) {
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
  @computed get ids() {
    const ids: SubjectId[] = []
    const { cat } = this.state
    if (cat === 'v1') {
      const { data } = this.state
      ;['top', 'pop', 'tv', 'old_tv', 'movie', 'old_movie', 'nsfw'].forEach(key => {
        data[key].forEach((id: SubjectId) => {
          ids.push(id)
        })
      })
    } else {
      const data = this.state.dataV2[cat] || []
      data.forEach(item => ids.push(item.sid))
    }

    return ids
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
  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      value: text
    })
  }

  onChangeE = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      e: text
    })
  }

  onSelect = (cat: string) => {
    setTimeout(async () => {
      this.setState({
        cat
      })

      await this.doSearchV2()

      if (!STORYBOOK) await this.fetchSubjects()
      await this.fetchSubjectsFromOSS()
      this.setStorage(NAMESPACE)
    }, 16)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)

  // -------------------- action --------------------
  doSearch = async () => {
    try {
      const { value } = this.state
      if (!value) return

      this.setState({
        searching: true
      })

      // @ts-expect-error
      const { data } = await axios({
        method: 'get',
        url: `http://101.43.236.40/api/rec/${value.trim()}`
      })

      t('推荐.刷新', {
        value: value.trim(),
        type: 'v1'
      })

      if ('tv' in data) {
        data.old_tv = data.old_tv || data['old tv']
        delete data['old tv']

        data.old_movie = data.old_movie || data['old movie']
        delete data['old movie']

        this.setState({
          data
        })
        if (!STORYBOOK) await this.fetchSubjects()
        await this.fetchSubjectsFromOSS()
        this.setStorage(NAMESPACE)
      }
    } catch (ex) {
      console.log(ex)
    }

    this.setState({
      searching: false
    })
  }

  doSearchV2 = async () => {
    try {
      const { cat, value, e } = this.state
      if (!value) return

      // if (cat === 'v1') return this.doSearch()

      this.setState({
        searching: true
      })

      const subjectType = MODEL_SUBJECT_TYPE.getValue<SubjectTypeValue>(cat)

      // @ts-expect-error
      const { data } = await axios({
        method: 'get',
        url: `http://124.221.81.229/api/v3/rec/${value.trim()}?type=${
          subjectType || 0
        }&e=${e === '' ? 0.1 : e}`
      })

      t('推荐.刷新', {
        value: value.trim(),
        type: subjectType || 0
      })

      if (Array.isArray(data) && data.length) {
        this.setState({
          dataV2: {
            [cat]: data
              .sort((a, b) => desc(a.score, b.score))
              .map(item => {
                return {
                  sid: item.sid,
                  type: item.type,
                  score: item.score.toFixed(1)
                }
              })
          }
        })
        if (!STORYBOOK) await this.fetchSubjects()
        await this.fetchSubjectsFromOSS()
        this.setStorage(NAMESPACE)
      } else if (data?.message) {
        this.setState({
          dataV2: {
            [cat]: []
          }
        })
        this.setStorage(NAMESPACE)

        info(data.message)
      }
    } catch (ex) {
      console.log(ex)
    }

    this.setState({
      searching: false
    })
  }
}
