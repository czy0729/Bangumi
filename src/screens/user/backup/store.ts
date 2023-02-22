/*
 * @Author: czy0729
 * @Date: 2022-12-03 10:14:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-23 05:29:01
 */
import { computed, observable, toJS } from 'mobx'
import { Parser } from 'json2csv'
import csv2json from 'csvjson-csv2json'
import { userStore } from '@stores'
import { asc, date, feedback, getTimestamp, info, open } from '@utils'
import store from '@utils/store'
import { temp, download } from '@utils/kv'
import { t } from '@utils/fetch'
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
  SubjectId,
  SubjectType,
  SubjectTypeCn,
  SubjectTypeValue
} from '@types'
import { NAMESPACE, LIMIT, EXCLUDE_STATE, CSV_HEADS, HOST_API } from './ds'
import { actionStatus } from './utils'
import { Item } from './types'

export default class ScreenActions extends store {
  state = observable({
    anime: [] as Item[],
    book: [] as Item[],
    music: [] as Item[],
    game: [] as Item[],
    real: [] as Item[],
    last: 0,
    includeUrl: false,
    includeImage: false,
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

    if (!this.state.last) await this.fetchCollectionsAll()

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

          current += 1
          this.setState({
            progress: {
              current,
              message: `${subjectType} (${actionStatus(
                COLLECTION_STATUS[j].title,
                subjectType
              )}) `
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
      t('本地备份.获取', {
        userId: this.userId
      })
    } catch (error) {
      t('本地备份.报错', {
        userId: this.userId
      })
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
          private: item.private,
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

  /** 更新一项收藏信息 */
  fetchCollection = async (subjectId: SubjectId) => {
    console.log(subjectId)
  }

  // -------------------- get --------------------
  /** 当前用户 ID */
  @computed get userId() {
    return userStore.usersInfo(userStore.myUserId).username || userStore.myUserId
  }

  /** 导出的 CSV */
  @computed get csv() {
    if (this.state.progress.fetching) return ''

    if (!this.data.length) return ''

    const { includeUrl, includeImage } = this.state
    const data = this.data.map(item => {
      const { subject } = item
      let row: any = {
        [CSV_HEADS[0]]: subject.id
      }
      if (includeImage) row[CSV_HEADS[1]] = subject.image
      if (includeUrl) row[CSV_HEADS[2]] = `https://bgm.tv/subject/${subject.id}`

      row = {
        ...row,
        [CSV_HEADS[3]]: MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type),
        [CSV_HEADS[4]]: subject.cn,
        [CSV_HEADS[5]]: subject.jp,
        [CSV_HEADS[6]]: subject.date,
        [CSV_HEADS[7]]: subject.rank || '',
        [CSV_HEADS[8]]: subject.score || '',
        [CSV_HEADS[9]]: subject.eps || '',
        [CSV_HEADS[10]]: item.ep_status || '',
        [CSV_HEADS[11]]: MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(
          item.type
        ),
        [CSV_HEADS[12]]: item.tags.join(' '),
        [CSV_HEADS[13]]: item.rate || '',
        [CSV_HEADS[14]]: item.comment || '',
        [CSV_HEADS[15]]: item.private ? '是' : '',
        [CSV_HEADS[16]]: item.updated_at
      }

      const typeCn = row[CSV_HEADS[3]]
      if (typeCn === '书籍') {
        row[CSV_HEADS[11]] = row[CSV_HEADS[11]].replace('看', '读')
      } else if (typeCn === '游戏') {
        row[CSV_HEADS[11]] = row[CSV_HEADS[11]].replace('看', '玩')
      } else if (typeCn === '音乐') {
        row[CSV_HEADS[11]] = row[CSV_HEADS[11]].replace('看', '听')
      }

      return row
    })

    const json2csvParser = new Parser(CSV_HEADS)
    return json2csvParser.parse(data)
  }

  /** 导入的收藏项 */
  upload(subjectId: SubjectId) {
    return computed(() => {
      const { upload } = this.state
      return upload[subjectId] || null
    }).get()
  }

  /** 收藏列表 */
  @computed get list() {
    const { anime, book, music, game, real } = this.state
    return [...anime, ...book, ...music, ...game, ...real]
  }

  /** 收藏列表映射 */
  @computed get listMap() {
    const map = {}
    this.list.forEach(item => {
      map[item.subject.id] = true
    })
    return map
  }

  /** 实际显示的信息列表 */
  @computed get data() {
    // 请求中不返回数据
    if (this.state.progress.fetching) return []

    const { upload } = this.state

    // 导入模式
    if (Object.keys(upload).length) {
      const data: Item[] = []
      Object.keys(upload).forEach(subjectId => {
        // 导入的数据可能不在收藏中，需要创建新项用于同步成新收藏
        if (!(subjectId in this.listMap)) {
          data.push({
            ...upload[subjectId],
            type: '',
            ep_status: '',
            rate: '',
            tags: [],
            comment: ''
          })
        }
      })
      data.push(...this.list)

      const { bottom } = this.state
      return data
        .slice()
        .sort((a, b) => asc(upload[a.subject.id] ? 0 : 1, upload[b.subject.id] ? 0 : 1))
        .sort((a, b) => asc(bottom[a.subject.id] || 0, bottom[b.subject.id] || 0))
    }

    // 导出模式
    return this.list.slice().sort((a, b) => asc(a.updated_at, b.updated_at))
  }

  // -------------------- action --------------------
  /** 切换 CSV 导出设置 */
  onSetting = (key: 'includeUrl' | 'includeImage') => {
    this.setState({
      [key]: !this.state[key]
    })
    this.setStorage(NAMESPACE)
  }

  /** 导出 CSV */
  onExport = async () => {
    if (!this.csv.length) {
      info('没有获取到收藏信息，请检查登录状态')
      return false
    }

    const { data } = await temp(
      `${this.userId}_${date('Y-m-d_H-i-s', getTimestamp())}.csv`,
      `\uFEFF${this.csv}`
    )
    if (!data?.downloadKey) {
      info('未知错误，下载失败，重试或联系作者')
      return false
    }

    t('本地备份.导出', {
      data: `${this.userId}|${this.csv.length}`
    })
    open(download(data.downloadKey))
  }

  /** 置底 (导入模式) */
  onBottom = (subjectId: SubjectId) => {
    const { bottom } = this.state
    const current = bottom.current + 1
    this.setState({
      bottom: {
        current,
        [subjectId]: current
      }
    })
    this.setStorage(NAMESPACE)

    t('本地备份.置底')
  }

  /** 同步 (导入模式) */
  onSubmit = async (subjectId: SubjectId, collectionData, epData) => {
    if (!subjectId) return false

    if (Object.keys(collectionData).length) {
      await request(`${HOST_API}/collection/${subjectId}/update`, {
        ...collectionData,
        privacy: collectionData.privacy ? 1 : 0
      })
    }

    if (Object.keys(epData).length) {
      await request(`${HOST_API}/subject/${subjectId}/update/watched_eps`, {
        watched_eps: epData.ep || 0
      })
    }

    await this.fetchCollection(subjectId)
    feedback()

    t('本地备份.同步')
  }

  /** 切换显示导入 CSV 模态框 */
  onToggleUpload = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  /** 导入CSV (导入模式) */
  onMessage = (text: string) => {
    try {
      const data = csv2json(text)
      if (data.length) {
        const upload: Record<SubjectId, Item> = {}
        data.map((item: any) => {
          if (item.ID) {
            let type = item['状态']
            if (type.includes('在')) type = '3'
            else if (type.includes('想')) type = '1'
            else if (type.includes('过')) type = '2'
            else if (type.includes('搁置')) type = '4'
            else if (type.includes('抛弃')) type = '5'

            upload[item.ID] = {
              type,
              rate: item['我的评价'] || '',
              ep_status: item['看到'] || '',
              vol_status: '',
              comment: item['我的简评'] || '',
              tags: (item['标签'] || '').split(' '),
              private: item['私密'] === '是',
              updated_at: item['更新时间'] || '',
              subject: {
                id: item.ID,
                date: item['放送'] || '',
                eps: item['话数'] || '',
                image: item['封面'] || '',
                jp: item['日文'] || '',
                cn: item['中文'] || '',
                rank: item['排名'] || '',
                score: item['评分'] || '',
                type: MODEL_SUBJECT_TYPE.getValue<SubjectTypeValue>(item['类型']) || '2'
              }
            }
          }
        })
        this.setState({
          upload
        })
        this.setStorage(NAMESPACE)
        this.onToggleUpload()
        t('本地备份.导入', {
          data: `${this.userId}|${data.length}`
        })
      }
    } catch (error) {
      info('解析CSV出错，请重新导入')
    }
  }
}
