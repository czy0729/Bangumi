/*
 * @Author: czy0729
 * @Date: 2024-09-14 07:08:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 07:12:44
 */
import { computed } from 'mobx'
import { Parser } from 'json2csv'
import { userStore } from '@stores'
import { asc } from '@utils'
import { computedFn } from '@utils/computed-fn'
import { applyLainProxy, applyProxy } from '@utils/proxy'
import { HOST, MODEL_COLLECTION_STATUS, MODEL_SUBJECT_TYPE } from '@constants'
import { CSV_HEADS } from '../ds'
import State from './state'

import type { CollectionStatusCn, SubjectId, SubjectTypeCn } from '@types'
import type { Item } from '../types'

export default class Computed extends State {
  /** 当前用户 ID */
  @computed get userId() {
    return userStore.usersInfo(userStore.myUserId).username || userStore.myUserId
  }

  /** 构建完整行 */
  private _buildRow(item: Item) {
    const { subject } = item
    const row: Record<string, any> = {
      [CSV_HEADS[0]]: subject.id,
      [CSV_HEADS[1]]: applyLainProxy(subject.image),
      [CSV_HEADS[2]]: applyProxy(`${HOST}/subject/${subject.id}`).url,
      [CSV_HEADS[3]]: MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type),
      [CSV_HEADS[4]]: subject.cn,
      [CSV_HEADS[5]]: subject.jp,
      [CSV_HEADS[6]]: subject.date,
      [CSV_HEADS[7]]: subject.rank || '',
      [CSV_HEADS[8]]: subject.score || '',
      [CSV_HEADS[9]]: subject.eps || '',
      [CSV_HEADS[10]]: item.ep_status || '',
      [CSV_HEADS[11]]: MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(item.type),
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
  }

  /** 导出的列头 (根据选择过滤) */
  @computed get exportHeads() {
    const { includeColumns } = this.state
    if (!includeColumns.length) return [...CSV_HEADS]
    return CSV_HEADS.filter(head => includeColumns.includes(head))
  }

  /** 导出的 CSV */
  @computed get csv() {
    if (this.state.progress.fetching || !this.data.length) return ''

    const heads = this.exportHeads
    const data = this.data.map(item => {
      const row = this._buildRow(item)
      const filtered: Record<string, any> = {}
      heads.forEach(head => {
        filtered[head] = row[head]
      })
      return filtered
    })

    const json2csvParser = new Parser(heads)
    return json2csvParser.parse(data)
  }

  /** 导出的 JSON (扁平化) */
  @computed get json() {
    if (this.state.progress.fetching || !this.data.length) return []

    const heads = this.exportHeads
    return this.data.map(item => {
      const row = this._buildRow(item)
      const filtered: Record<string, any> = {}
      heads.forEach(head => {
        filtered[head] = row[head]
      })
      return filtered
    })
  }

  /** 导入的收藏项 */
  upload = computedFn((subjectId: SubjectId) => {
    return this.state.upload[subjectId] || null
  })

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
}
