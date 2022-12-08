/*
 * @Author: czy0729
 * @Date: 2022-12-03 10:14:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-08 14:30:07
 */
import { computed, observable, toJS } from 'mobx'
import { Parser } from 'json2csv'
import { userStore } from '@stores'
import store from '@utils/store'
import { request } from '@utils/fetch.v0'
import { API_COLLECTIONS } from '@utils/fetch.v0/ds'
import { Collection } from '@utils/fetch.v0/types'
import {
  COLLECTION_STATUS,
  MODEL_COLLECTION_STATUS,
  MODEL_SUBJECT_TYPE,
  SUBJECT_TYPE
} from '@constants'
import {
  CollectionStatusCn,
  CollectionStatusValue,
  SubjectType,
  SubjectTypeCn,
  SubjectTypeValue
} from '@types'
import { asc, getTimestamp } from '@utils'
import { NAMESPACE, LIMIT, EXCLUDE_STATE, CSV_HEADS } from './ds'
import { Item } from './types'

export default class ScreenActions extends store {
  state = observable({
    anime: [] as Item[],
    book: [] as Item[],
    music: [] as Item[],
    game: [] as Item[],
    real: [] as Item[],
    last: 0,
    imports: [],
    ...EXCLUDE_STATE,
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    if (getTimestamp() - this.state.last >= 60 * 60 * 24) {
      await this.fetchCollectionsAll()
    } else {
      // const data = await update(`backup_${this.userId}`, this.csv)
      // console.log(this.csv)
    }

    return true
  }

  /** 循环获取所有类型和状态的条目收藏信息 */
  fetchCollectionsAll = async () => {
    if (this.state.progress.fetching) return false

    this.setState({
      anime: [],
      book: [],
      music: [],
      game: [],
      real: [],
      progress: {
        fetching: true,
        total: SUBJECT_TYPE.length * COLLECTION_STATUS.length
      }
    })

    try {
      let current = 0
      for (let i = 0; i < SUBJECT_TYPE.length; i += 1) {
        for (let j = 0; j < COLLECTION_STATUS.length; j += 1) {
          const subjectType = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(
            SUBJECT_TYPE[i].value
          )
          const type = MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(
            COLLECTION_STATUS[j].title
          )
          current += 1
          this.setState({
            progress: {
              current,
              message: `${subjectType} (${type}) `
            }
          })

          await this.fetchCollections(SUBJECT_TYPE[i].value, COLLECTION_STATUS[j].title)
        }
        this.setStorage(NAMESPACE)
      }

      this.setState({
        last: getTimestamp()
      })
      this.setStorage(NAMESPACE)
    } catch (error) {
      //
    } finally {
      this.setState({
        progress: EXCLUDE_STATE.progress
      })
    }
  }

  /** 获取收藏信息 */
  fetchCollections = async (
    subjectType: SubjectTypeValue,
    type: CollectionStatusValue,
    page: number = 1
  ) => {
    const data = await request<Collection>(
      API_COLLECTIONS(this.userId, subjectType, page, LIMIT, type)
    )

    const key = MODEL_SUBJECT_TYPE.getLabel<SubjectType>(subjectType)
    if (Array.isArray(data?.data)) {
      const list = data.data.map(item => {
        const { subject: s } = item || {}
        return {
          type: item.type,
          rate: item.rate,
          ep_status: item.ep_status,
          vol_status: item.vol_status,
          comment: item.comment,
          tags: item.tags,
          updated_at: item.updated_at,
          subject: {
            id: s?.id,
            date: s?.date,
            eps: s?.eps,
            image: s?.images?.medium,
            jp: s?.name,
            cn: s?.name_cn,
            rank: s?.rank,
            score: s?.score,
            type: item?.subject_type
          }
        }
      })

      this.setState({
        [key]: [...toJS(this.state[key]), ...list]
      })
    }

    if (data.total && data.offset + LIMIT < data.total) {
      return this.fetchCollections(subjectType, type, page + 1)
    }

    return true
  }

  // -------------------- get --------------------
  @computed get userId() {
    return userStore.usersInfo(userStore.myUserId).username || userStore.myUserId
  }

  @computed get data() {
    if (this.state.progress.fetching) return []

    const { anime, book, music, game, real } = this.state
    return [...anime, ...book, ...music, ...game, ...real].sort((a, b) =>
      asc(a.updated_at, b.updated_at)
    )
  }

  @computed get csv() {
    if (this.state.progress.fetching) return ''

    if (!this.data.length) return ''

    const data = this.data.map(item => {
      const { subject } = item
      return {
        [CSV_HEADS[0]]: subject.id,
        [CSV_HEADS[1]]: MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type),
        [CSV_HEADS[2]]: subject.cn,
        [CSV_HEADS[3]]: subject.jp,
        [CSV_HEADS[4]]: subject.date,
        [CSV_HEADS[5]]: subject.rank,
        [CSV_HEADS[6]]: subject.score,
        [CSV_HEADS[7]]: subject.eps,
        [CSV_HEADS[8]]: item.ep_status,
        [CSV_HEADS[9]]: MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(item.type),
        [CSV_HEADS[10]]: item.tags.join(' '),
        [CSV_HEADS[11]]: item.rate || '',
        [CSV_HEADS[12]]: item.comment || '',
        [CSV_HEADS[13]]: item.updated_at
      }
    })

    const json2csvParser = new Parser(CSV_HEADS)
    return json2csvParser.parse(data)
  }

  review() {
    return computed(() => {
      return ''
    }).get()
  }

  // -------------------- action --------------------
  onRefreshCollection = () => {}

  onBottom = () => {}

  onSubmit = () => {}

  onPage = () => {}
}
