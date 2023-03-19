/*
 * @Author: czy0729
 * @Date: 2022-08-13 05:35:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-20 04:48:59
 */
import { observable, computed } from 'mobx'
import { feedback, getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { webhookCollection } from '@utils/webhooks'
import { StoreConstructor } from '@types'
import subjectStore from '../subject'
import userStore from '../user'
import collectionStore from '../collection'
import { STATE } from './init'
import { SubmitManageModalValues } from './types'

class UIStore extends store implements StoreConstructor<typeof STATE> {
  state = observable(STATE)

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
  /** 存放带监听组件的页面上面, 最近一次点击的 x, y 坐标 */
  setXY = (x = 0, y = 0) => {
    this.setState({
      tapXY: {
        x,
        y
      }
    })
  }

  /** ==================== popableSubject ==================== */
  /** 显示条目缩略信息弹出层 */
  showPopableSubject = ({ subjectId }) => {
    const { id, _loaded } = subjectStore.subject(subjectId)
    if (!_loaded || !id) subjectStore.fetchSubject(subjectId)

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

  /** 关闭条目缩略信息弹出层 */
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

  /** 因为弹出层使用了 Portal, 所以主动刷新 key 可以使弹出层永远在最顶层 */
  updatePopableSubjectPortalKey = () => {
    this.setState({
      popableSubject: {
        portalKey: getTimestamp() || this.popableSubject.portalKey
      }
    })
  }

  /** ==================== manageModal ==================== */
  /** 存放提交全局条目管理后的回调 */
  _manageModalSubmitCallback: (values?: SubmitManageModalValues) => any

  /** 显示全局条目管理 Modal */
  showManageModal = (
    { subjectId, title, desc = '', status, action = '看' },
    screen = '',
    submitCallback?: (values?: SubmitManageModalValues) => any
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

    if (typeof submitCallback === 'function') {
      this._manageModalSubmitCallback = submitCallback
    }
  }

  /** 关闭全局条目管理 Modal */
  closeManageModal = () => {
    if (!this.state.manageModal.visible) return

    this.setState({
      manageModal: {
        visible: false
      }
    })
    this._manageModalSubmitCallback = null
  }

  /** 提交全局条目管理 Modal */
  submitManageModal = async (values: SubmitManageModalValues) => {
    const { visible, screen } = this.state.manageModal
    if (!visible) return

    t('其他.管理条目', {
      subjectId: values.subjectId,
      screen
    })
    await collectionStore.doUpdateCollection(values)
    feedback()

    try {
      if (typeof this._manageModalSubmitCallback === 'function') {
        this._manageModalSubmitCallback(values)
      }
    } catch (error) {}

    this.closeManageModal()
    collectionStore.fetchCollectionStatusQueue([values.subjectId])
    this.callWebhookCollection(values)
  }

  callWebhookCollection = (values: SubmitManageModalValues) => {
    setTimeout(async () => {
      let subject = subjectStore.subject(values.subjectId)
      if (!subject._loaded) await subjectStore.fetchSubject(values.subjectId)

      subject = subjectStore.subject(values.subjectId)
      if (!subject._loaded) return false

      webhookCollection(values, subject, userStore.userInfo)
    }, 0)
  }
}

const uiStore = new UIStore()

export type UIStoreType = typeof uiStore

export default uiStore
