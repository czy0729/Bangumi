/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:06:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-03 06:51:35
 */
import { getTimestamp, info } from '@utils'
import { t } from '@utils/fetch'
import { extract, gets, update } from '@utils/kv'
import { D, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectId, SubjectTypeCn } from '@types'
import { MAX_PAGE } from '../ds'
import { CutType, SnapshotSubjectsItem } from '../types'
import Fetch from './fetch'
import { getSubjectCutList } from './utils'
import { FILTER_WORD } from './ds'

export default class Action extends Fetch {
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
      const data = await this.fetchSubjectComments(true)
      const pageTotal = data?.[this.subjectId]?.pagination?.pageTotal || 0
      for (let i = 2; i <= Math.min(MAX_PAGE, pageTotal); i += 1) {
        this.setState({
          fetching: i
        })
        await this.fetchSubjectComments()
      }
    } catch (error) {}
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
  batchUserSubject = async () => {
    await this.fetchCollection()

    const subjectIds: SubjectId[] = []
    const now = getTimestamp()
    this.userCollections.forEach(item => {
      const subjectId = item.id
      const subject = this.state.subjects[subjectId]
      if (!subject?._loaded || (subject?._loaded && now - Number(subject?._loaded) >= D)) {
        subjectIds.push(subjectId)
      }
    })
    if (!subjectIds.length) return true

    const data: Record<`subject_${SubjectId}`, SnapshotSubjectsItem> = await gets(
      subjectIds.map(item => `subject_${item}`),
      ['id', 'name', 'name_cn', 'image', 'tags', 'character', 'staff', 'rating', 'rank']
    )
    const subjects: Record<SubjectId, SnapshotSubjectsItem> = {}
    Object.entries(data).forEach(([, value]: [any, SnapshotSubjectsItem]) => {
      if (value) {
        subjects[value.id] = {
          ...value,
          _loaded: now
        }
      }
    })
    this.setState({
      subjects
    })
    this.save()
  }

  /** 计算条目本地分词 */
  genSubjectCut = () => {
    this.setState({
      user: {
        [this.userId]: {
          list: getSubjectCutList(
            this.state.cutType,
            this.subjectIds,
            this.state.subjectType,
            this.state.subjects
          ),
          _loaded: getTimestamp()
        }
      }
    })
  }

  /** 批量获取收藏条目信息后分词 */
  batchUserSubjectThenCut = async () => {
    await this.batchUserSubject()
    this.genSubjectCut()
    this.save()
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
      show: false
    })
  }

  /** 选择条目类型 */
  selectSubjectType = (title: SubjectTypeCn) => {
    if (this.state.fetchingCollections) return

    this.setState({
      subjectType: MODEL_SUBJECT_TYPE.getLabel(title)
    })
    this.batchUserSubjectThenCut()
    this.save()
  }

  /** 选择条目类型 */
  selectCutType = (title: CutType) => {
    this.setState({
      cutType: title
    })
    this.genSubjectCut()
    this.save()
  }
}
