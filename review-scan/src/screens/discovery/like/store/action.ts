/*
 * @Author: czy0729
 * @Date: 2024-11-11 10:46:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 16:19:08
 */
import { collectionStore, uiStore } from '@stores'
import { updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { ScrollEvent, SubjectType } from '@types'
import { ListItem } from '../types'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

export default class Action extends Fetch {
  /** 切换类型 */
  onChange = (title: string) => {
    const type = MODEL_SUBJECT_TYPE.getLabel<SubjectType>(title)
    this.setState({
      fetching: true,
      type,
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })
    this.save()

    setTimeout(() => {
      this.setState({
        fetching: false
      })
      this.getList()

      t('猜你喜欢.切换', {
        title
      })
    }, 80)
  }

  /** 渲染下一页 */
  onPage = (data: ListItem[]) => {
    if (!data.length) return

    const subjectIds = data.map(item => item.id)
    this.fetchSubjects(subjectIds)
    collectionStore.fetchCollectionStatusQueue(subjectIds)
  }

  /** 预渲染下一页 */
  onNextPage = (data: ListItem[]) => {
    setTimeout(() => {
      if (!data.length) return

      const subjectIds = data.map(item => item.id)
      this.fetchSubjects(subjectIds)
      collectionStore.fetchCollectionStatusQueue(subjectIds)
    }, 2000)
  }

  /** 更新可视范围底部 y */
  _onScroll = updateVisibleBottom.bind(this)

  /** 滑动时关闭 Popable 组件 */
  onScroll = (event: ScrollEvent) => {
    this._onScroll(event)
    uiStore.closePopableSubject()
  }
}
