/*
 * @Author: czy0729
 * @Date: 2026-08-27 02:45:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 *
 * 首页界面操作: Modal 显隐 / 展开收起置顶 / 列表刷新
 */
import { feedback } from '@utils'
import { t } from '@utils/fetch'
import { logger } from '@utils/dev'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { EXCLUDE_STATE, NAMESPACE, STATE } from '../ds'
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
  selectGridSubject = (subjectId: SubjectId, grid?: typeof STATE.grid) => {
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

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    if (this.tabsLabel === '游戏') return this.fetchDoingGames(true)
    return this.initFetch(true)
  }

  /** 下一页 */
  onFooterRefresh = () => {
    return this.fetchDoingGames()
  }

  /** 刷新并返回到顶部 */
  onRefreshThenScrollTop = () => {
    try {
      const { page } = this.state
      if (typeof this.scrollToIndex[page] === 'function') {
        this.scrollToIndex[page]({
          animated: true,
          index: 0,
          viewOffset: 8000
        })
        setTimeout(() => {
          feedback()
        }, 400)

        this.onHeaderRefresh()

        t('其他.刷新到顶', {
          screen: 'Home'
        })
      }
    } catch (error) {
      logger.error(NAMESPACE, 'onRefreshThenScrollTop', error)
    }
  }
}
