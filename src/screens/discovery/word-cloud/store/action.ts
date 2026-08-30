/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:06:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 07:36:24
 */
import { getTimestamp, info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { extract, gets, update } from '@utils/kv'
import { D, MODEL_SUBJECT_TYPE } from '@constants'
import { MAX_PAGE } from '../ds'
import Fetch from './fetch'
import { getSubjectCutList, rebuildSnapshotSubjects } from './utils'
import { EXCLUDE_STATE, FILTER_WORD } from './ds'

import type { SubjectId, SubjectTypeCn, TimerRef } from '@types'
import type { CutType, SnapshotSubjectsItem } from '../types'

export default class Action extends Fetch {
  /** 分词防抖计时器 */
  genTimer: TimerRef = null

  /** 批量获取吐槽 */
  batchSubjectThenCut = async (refresh: boolean = false) => {
    if (this.state.fetching) return

    if (refresh) {
      t('词云.刷新', {
        id: this.id
      })
    }

    if (!refresh) {
      if (this.state.data._loaded) return

      if (this.subjectComments._loaded) {
        const { pagination } = this.subjectComments
        if (
          pagination.page >= MAX_PAGE ||
          (pagination.pageTotal && pagination.page >= pagination.pageTotal)
        ) {
          return this.cut()
        }
      }
    }

    this.setState({
      fetching: 1
    })
    try {
      const pages: number[] = []
      if (refresh || !this.subjectComments._loaded) {
        // 强制刷新或无缓存: 拉第 1 页重置, 再并发补剩余页
        const data = await this.fetchSubjectComments(true)
        const pageTotal = data?.[this.subjectId]?.pagination?.pageTotal || 0
        for (let i = 2; i <= Math.min(MAX_PAGE, pageTotal); i += 1) pages.push(i)
      } else {
        // 部分缓存: 从当前已加载页继续拉取, 避免重复请求
        const { pagination } = this.subjectComments
        const pageTotal = pagination.pageTotal || pagination.page + 1
        for (let i = pagination.page + 1; i <= Math.min(MAX_PAGE, pageTotal); i += 1) pages.push(i)
      }

      if (pages.length) {
        const base = this.subjectComments.pagination.page || 1
        this.setState({
          fetching: base
        })
        await this.fetchSubjectCommentsBatch(pages, done => {
          this.setState({
            fetching: base + done
          })
        })
      }
    } catch (error) {
      this.error('batchSubjectThenCut', error)
    }

    this.setState({
      fetching: 0
    })

    return this.cut()
  }

  /** 帖子 */
  cutTopic = async () => {
    await this.fetchTopic()
    await this.cut()
    return true
  }

  /** 角色 */
  cutMono = async () => {
    await this.fetchMono()
    await this.cut()
    return true
  }

  /** 批量获取收藏条目信息 */
  batchUserSubject = async (refresh: boolean = false) => {
    await this.fetchCollectionV0(refresh)

    const subjectIds: SubjectId[] = []
    const now = getTimestamp()
    this.collections.forEach(item => {
      const subjectId = item.id
      const subject = this.state.subjects[subjectId]
      if (!subject?._loaded || (subject?._loaded && now - Number(subject?._loaded) >= D)) {
        subjectIds.push(subjectId)
      }
    })
    if (!subjectIds.length) return true

    this.setState({
      fetchingCollections: true
    })
    // [gets 泛型] picker 类型为 keyof T, T 无推断来源需显式给出
    const data = await gets<SnapshotSubjectsItem, keyof SnapshotSubjectsItem>(
      subjectIds.map(item => `subject_${item}`),
      ['id', 'name', 'name_cn', 'image', 'tags', 'character', 'staff', 'rating', 'rank']
    )
    this.setState({
      subjects: rebuildSnapshotSubjects(data || {}, now),
      fetchingCollections: false
    })
    this.save()
  }

  /** 计算条目本地分词 (防抖: 快速切换类型/年份只重算一次) */
  genSubjectCut = () => {
    if (this.genTimer) clearTimeout(this.genTimer)

    this.genTimer = setTimeout(() => {
      this.genTimer = null
      this.setState({
        user: {
          [this.userId]: {
            list: getSubjectCutList(
              this.state.cutType,
              this.state.subCutType,
              this.subjectIdsWithYear,
              this.state.subjectType,
              this.state.subjects,
              this.collections
            ),
            _loaded: getTimestamp()
          }
        }
      })
      this.save()
    }, 80)
  }

  /** 批量获取收藏条目信息后分词 */
  batchUserSubjectThenCut = async (refresh: boolean = false) => {
    await this.batchUserSubject(refresh)
    this.genSubjectCut()
  }

  /** 分词 */
  cut = async () => {
    const result = await extract(this.plainText)
    if (result) {
      const data = {
        list: result.filter(item => !FILTER_WORD.includes(item[0])),
        _loaded: getTimestamp()
      }
      this.setState({
        data
      })
      this.save()

      if (data.list.length >= 40) {
        update(this.snapshotId, {
          data
        })
      }
    }

    t('词云.分词', {
      id: this.id
    })

    return true
  }

  /** 分词点击 */
  onWordPress = (title: string) => {
    this.setState({
      title: title.trim()
    })

    setTimeout(() => {
      if (this.userId) {
        if (!this.selectedSubjects.length) {
          info('没有找到对应条目')
          return
        }
      } else if (!this.selectedComment.length) {
        info('没有找到对应吐槽')
        return
      }

      this.setState({
        show: true
      })

      t('词云.点击', {
        id: this.id,
        title
      })
    }, 0)
  }

  /** 收起吐槽列表 */
  onClose = () => {
    this.setState({
      show: false,
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })
  }

  /** 选择条目类型 */
  selectSubjectType = (title: SubjectTypeCn) => {
    if (this.state.fetchingCollections) return

    this.setState({
      subjectType: MODEL_SUBJECT_TYPE.getLabel(title),
      subCutType: '',
      year: ''
    })
    this.save()

    setTimeout(() => {
      this.batchUserSubjectThenCut()
    }, 40)
  }

  /** 选择条目分词类型 */
  selectCutType = (title: CutType) => {
    this.setState({
      cutType: title,
      subCutType: ''
    })
    this.genSubjectCut()
  }

  /** 选择条目分词二级类型 */
  selectSubCutType = (title: string) => {
    this.setState({
      subCutType: (title === '全部' || title === '全部职位' ? '' : title.split(' (')?.[0]) || ''
    })
    this.genSubjectCut()
  }

  /** 选择收藏年份 */
  selectYear = (title: string) => {
    this.setState({
      year: title === '收藏时间' ? '' : title
    })
    this.genSubjectCut()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
