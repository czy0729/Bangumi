/*
 * @Author: czy0729
 * @Date: 2026-08-27 02:45:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 03:53:13
 */
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { EXCLUDE_STATE, STATE } from '../ds'
import Base from './base'

import type { SubjectId } from '@types'

export default class Ui extends Base {
  /** 显示收藏管理 Modal */
  showManageModal = (subjectId: SubjectId, modal?: typeof EXCLUDE_STATE.modal) => {
    this.setState({
      visible: true,
      subjectId,
      modal: modal || EXCLUDE_STATE.modal // 游戏没有主动请求条目数据, 需要手动传递标题
    })

    t('首页.显示收藏管理', {
      subjectId
    })
  }

  /** 隐藏收藏管理 Modal */
  closeManageModal = () => {
    this.setState({
      visible: false,
      modal: EXCLUDE_STATE.modal
    })
  }

  /** 展开或收起 Item */
  itemToggleExpand = (subjectId: SubjectId) => {
    const state = this.$Item(subjectId)
    const { expand } = state
    this.setState({
      item: {
        [subjectId]: {
          ...state,
          expand: !expand
        }
      }
    })
    this.save()

    if (!expand) {
      this.fetchSubject(subjectId)
      this.fetchUserProgress(subjectId)
    }

    t('首页.展开或收起条目', {
      subjectId
    })
  }

  /** 置顶或取消置顶 Item */
  itemToggleTop = (subjectId: SubjectId, isTop?: boolean) => {
    const { top } = this.state
    const _top = [...top]
    const index = _top.indexOf(subjectId)
    if (index === -1) {
      _top.push(subjectId)
    } else {
      _top.splice(index, 1)

      // 再置顶
      if (isTop) _top.push(subjectId)
    }

    this.setState({
      top: _top
    })
    this.save()

    t('首页.置顶或取消置顶', {
      subjectId,
      isTop
    })
  }

  /** 全部展开 (书籍不展开, 展开就收不回去了) */
  expandAll = () => {
    const item = {}
    this.collection.list.forEach(({ subject_id: subjectId, subject }) => {
      const type = MODEL_SUBJECT_TYPE.getTitle(subject.type)
      if (type !== '书籍') {
        item[subjectId] = {
          expand: true,
          doing: false
        }
      }
    })
    this.setState({
      item
    })
    this.save()

    t('首页.全部展开')
  }

  /** 全部关闭 */
  closeAll = () => {
    this.clearState('item')
    this.save()

    t('首页.全部关闭')
  }

  /** 格子布局条目选择 */
  selectGirdSubject = (subjectId: SubjectId, grid?: typeof STATE.grid) => {
    this.setState({
      current: subjectId,
      grid: grid || STATE.grid
    })
    this.fetchSubject(subjectId)
    this.fetchUserProgress(subjectId)
    this.save()

    t('首页.格子布局条目选择', {
      subjectId
    })
  }
}
