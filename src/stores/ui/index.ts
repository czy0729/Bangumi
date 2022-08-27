/*
 * @Author: czy0729
 * @Date: 2022-08-13 05:35:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-27 14:31:36
 */
import { observable, computed } from 'mobx'
import { feedback, getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { Actions, RatingStatus, StoreConstructor, SubjectId } from '@types'
import subjectStore from '../subject'
import collectionStore from '../collection'

const state = {
  /** 存放带监听组件的页面上面, 最近一次点击的 x, y 坐标 */
  tapXY: {
    x: 0,
    y: 0
  },

  /** 条目缩略信息弹出层 */
  popableSubject: {
    subjectId: 0,
    visible: false,
    portalKey: 0,
    x: 0,
    y: 0
  },

  /** 全局条目管理 Modal */
  manageModal: {
    visible: false,
    subjectId: 0,
    title: '',
    desc: '',
    status: '' as '' | RatingStatus,
    action: '看' as Actions,
    screen: ''
  }
}

class UIStore extends store implements StoreConstructor<typeof state> {
  state = observable(state)

  @computed get tapXY() {
    return this.state.tapXY
  }

  @computed get popableSubject() {
    return this.state.popableSubject
  }

  @computed get manageModal() {
    return this.state.manageModal
  }

  /** ==================== tapXY ==================== */
  setXY = (x = 0, y = 0) => {
    this.setState({
      tapXY: {
        x,
        y
      }
    })
  }

  /** ==================== popableSubject ==================== */
  showPopableSubject = ({ subjectId }) => {
    const { _loaded } = subjectStore.subject(subjectId)
    if (!_loaded) subjectStore.fetchSubject(subjectId)

    if (this.popableSubject.visible) {
      this.closePopableSubject()

      if (subjectId !== this.popableSubject.subjectId) {
        setTimeout(() => {
          this.setState({
            popableSubject: {
              subjectId,
              visible: true,
              x: this.tapXY.x,
              y: this.tapXY.y
            }
          })
        }, 240)
      }
      return
    }

    setTimeout(() => {
      this.setState({
        popableSubject: {
          subjectId,
          visible: true,
          x: this.tapXY.x,
          y: this.tapXY.y
        }
      })
    }, 80)
  }

  closePopableSubject = () => {
    if (!this.state.popableSubject.visible) return

    this.setState({
      popableSubject: {
        visible: false
      }
    })

    setTimeout(() => {
      this.setState({
        popableSubject: {
          subjectId: 0
        }
      })
    }, 160)
  }

  updatePopableSubjectPortalKey = () => {
    this.setState({
      popableSubject: {
        portalKey: getTimestamp() || this.popableSubject.portalKey
      }
    })
  }

  /** ==================== manageModal ==================== */
  showManageModal = (
    { subjectId, title, desc, status, action = '看' },
    screen = ''
  ) => {
    this.setState({
      manageModal: {
        visible: true,
        subjectId: subjectId || 0,
        title: title || '',
        desc: desc || '',
        status: status || '',
        action: action || '看',
        screen: screen || ''
      }
    })
  }

  closeManageModal = () => {
    if (!this.state.manageModal.visible) return

    this.setState({
      manageModal: {
        visible: false
      }
    })
  }

  submitManageModal = async (values: {
    subjectId: SubjectId
    status?: RatingStatus | ''
    tags?: string
    comment?: string
    rating?: string | number
    privacy?: 0 | 1 | '0' | '1'
  }) => {
    const { visible, screen } = this.state.manageModal
    if (!visible) return

    await collectionStore.doUpdateCollection(values)
    feedback()

    collectionStore.fetchCollectionStatusQueue([values.subjectId])
    this.closeManageModal()

    t('其他.管理条目', {
      subjectId: values.subjectId,
      screen
    })
  }
}

export default new UIStore()
