/*
 * @Author: czy0729
 * @Date: 2024-09-14 07:08:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 04:03:41
 *
 * 本地备份页派生数据与导出内容
 */
import { computed } from 'mobx'
import { userStore } from '@stores'
import { asc } from '@utils'
import { computedFn } from '@utils/computed-fn'
import { applyLainProxy, applyProxy, restoreNativeUrl } from '@utils/proxy'
import { toCsv } from '@utils/thirdParty/csv'
import { HOST, MODEL_COLLECTION_STATUS, MODEL_SUBJECT_TYPE } from '@constants'
import { CSV_HEADS } from '../ds'
import State from './state'

import type { CsvRecord } from '@utils/thirdParty/csv'
import type { CollectionStatusCn, SubjectId, SubjectTypeCn } from '@types'
import type { Item } from '../types'

export default class Computed extends State {
  /** 当前用户 ID */
  @computed get userId() {
    return userStore.usersInfo(userStore.myUserId).username || userStore.myUserId
  }

  /** 构建完整行 (列名与 CSV_HEADS 一一对应) */
  private _buildRow(item: Item) {
    const [
      ID,
      COVER,
      URL,
      TYPE,
      CN,
      JP,
      DATE,
      RANK,
      SCORE,
      EPS,
      EP_STATUS,
      STATUS,
      TAGS,
      RATE,
      COMMENT,
      PRIVATE,
      UPDATED_AT
    ] = CSV_HEADS

    const { subject } = item
    const row: CsvRecord = {
      [ID]: subject.id,
      [COVER]: restoreNativeUrl(applyLainProxy(subject.image)),
      [URL]: restoreNativeUrl(applyProxy(`${HOST}/subject/${subject.id}`).url),
      [TYPE]: MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type),
      [CN]: subject.cn,
      [JP]: subject.jp,
      [DATE]: subject.date,
      [RANK]: subject.rank || '',
      [SCORE]: subject.score || '',
      [EPS]: subject.eps || '',
      [EP_STATUS]: item.ep_status || '',
      [STATUS]: MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(item.type),
      [TAGS]: (item.tags || []).join(' '),
      [RATE]: item.rate || '',
      [COMMENT]: item.comment || '',
      [PRIVATE]: item.private ? '是' : '',
      [UPDATED_AT]: item.updated_at
    }

    const typeCn = row[TYPE]
    if (typeCn === '书籍') {
      row[STATUS] = String(row[STATUS]).replace('看', '读')
    } else if (typeCn === '游戏') {
      row[STATUS] = String(row[STATUS]).replace('看', '玩')
    } else if (typeCn === '音乐') {
      row[STATUS] = String(row[STATUS]).replace('看', '听')
    }

    return row
  }

  /** 按选中列裁剪后的导出行 */
  private _exportRows() {
    const heads = this.exportHeads
    return this.data.map(item => {
      const row = this._buildRow(item)
      const filtered: CsvRecord = {}
      heads.forEach(head => {
        filtered[head] = row[head]
      })
      return filtered
    })
  }

  /** 已选中的导出列 */
  @computed get includeColumnsSet() {
    return new Set(this.state.includeColumns)
  }

  /** 导出的列头 (根据选择过滤) */
  @computed get exportHeads() {
    if (!this.state.includeColumns.length) return [...CSV_HEADS]

    return CSV_HEADS.filter(head => this.includeColumnsSet.has(head))
  }

  /** 导出的 CSV */
  @computed get csv() {
    if (this.state.progress.fetching || !this.data.length) return ''

    return toCsv(this.exportHeads, this._exportRows())
  }

  /** 导出的 JSON (扁平化) */
  @computed get json() {
    if (this.state.progress.fetching || !this.data.length) return []

    return this._exportRows()
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
    const map: Record<SubjectId, boolean> = {}
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
        .sort((a, b) => asc(upload[a.subject.id] ? 0 : 1, upload[b.subject.id] ? 0 : 1))
        .sort((a, b) => asc(bottom[a.subject.id] || 0, bottom[b.subject.id] || 0))
    }

    // 导出模式
    return this.list.slice().sort((a, b) => asc(a.updated_at, b.updated_at))
  }
}
