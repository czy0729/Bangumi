/*
 * @Author: czy0729
 * @Date: 2023-04-25 14:48:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-30 21:37:09
 */
import { getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import { webhookCollection } from '@utils/webhooks'
import { LIKE_TYPE_RAKUEN, MODEL_COLLECTION_STATUS } from '@constants'
import { RatingStatus, SubjectId, TopicId } from '@types'
import collectionStore from '../collection'
import rakuenStore from '../rakuen'
import subjectStore from '../subject'
import userStore from '../user'
import Computed from './computed'
import { SubmitManageModalValues } from './types'

export default class Action extends Computed {
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

  /** ==================== likesGrid ==================== */
  /**  显示回复表情选择弹出层 */
  showLikesGrid = (
    /** 同 mainId, 主类型唯一编号 */
    topicId: string | number,

    /** 同 realatedId, 贴贴关联唯一编号 */
    floorId: string | number,

    /** 授权参数 */
    formhash: string,

    /** 贴贴类型 */
    likeType: string | number = LIKE_TYPE_RAKUEN,

    /** 偏移量 */
    offsets?: {
      recommandPosition?: '' | 'top' | 'bottom'
      x?: number
      y?: number
    }
  ) => {
    setTimeout(() => {
      const likesList = rakuenStore.likesList(topicId, floorId) || []
      let value: string
      try {
        if (likesList.length) {
          value = likesList.find(item => item.selected === true)?.value || ''
        }
      } catch (error) {}

      this.setState({
        likesGrid: {
          visible: true,
          x: this.tapXY.x,
          y: this.tapXY.y,
          topicId,
          floorId,
          formhash,
          value,
          likeType,
          offsets: {
            recommandPosition: offsets?.recommandPosition || '',
            x: offsets?.x || 0,
            y: offsets?.y || 0
          }
        }
      })
    }, 80)
  }

  /** 关闭回复表情选择弹出层 */
  closeLikesGrid = () => {
    if (!this.state.likesGrid.visible) return

    this.setState({
      likesGrid: {
        visible: false,
        topicId: '',
        floorId: '',
        formhash: '',
        value: '',
        likeType: '',
        offsets: {
          recommandPosition: '',
          x: 0,
          y: 0
        }
      }
    })
  }

  /** ==================== likesUsers ==================== */
  /** 显示贴贴用户列表弹出层 */
  showLikesUsers = (list: any[], emoji: number) => {
    this.setState({
      likesUsers: {
        list,
        emoji
      }
    })

    setTimeout(() => {
      this.setState({
        likesUsers: {
          show: true
        }
      })
    }, 0)
  }

  /** 关闭贴贴用户列表弹出层 */
  closeLikesUsers = () => {
    this.setState({
      likesUsers: {
        show: false
      }
    })

    setTimeout(() => {
      this.setState({
        likesUsers: {
          list: [],
          emoji: 0
        }
      })
    }, 800)
  }

  /** ==================== manageModal ==================== */
  /** 存放提交全局条目管理后的回调 */
  private _manageModalSubmitCallback: (values?: SubmitManageModalValues) => any

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

  /** 暂时禁用提交全局条目管理 Modal */
  disabledManageModal = () => {
    this.setState({
      manageModal: {
        disabled: true
      }
    })
  }

  /** 恢复提交全局条目管理 Modal */
  enabledManageModal = () => {
    this.setState({
      manageModal: {
        disabled: false
      }
    })
  }

  /** 调用提交全局条目管理 Modal 回调 */
  callManageModalCallback = async (values: SubmitManageModalValues) => {
    try {
      if (typeof this._manageModalSubmitCallback === 'function') {
        await this._manageModalSubmitCallback(values)
      }
    } catch (error) {}
  }

  /** 提交全局条目管理 Modal */
  submitManageModal = async (values: SubmitManageModalValues) => {
    const { visible, screen } = this.state.manageModal
    if (!visible) return

    t('其他.管理条目', {
      subjectId: values.subjectId,
      screen
    })

    this.disabledManageModal()
    await collectionStore.doUpdateCollection(values)
    this.enabledManageModal()

    await this.callManageModalCallback(values)
    this.closeManageModal()

    this.preFlip(values.subjectId)
    await collectionStore.fetchCollectionStatusQueue([values.subjectId])

    if (values.status !== MODEL_COLLECTION_STATUS.getValue<RatingStatus>('在看')) {
      // 不是在看的话要在进度中删掉对应条目信息
      userStore.removeCollection(values.subjectId)
    } else {
      // 在看的话要在进度中添加对应条目信息
      userStore.addCollection(values.subjectId)
    }

    // 虽然 Flip 组件会通过 onAnimated 调用, 但是要保证之后无论如何都关闭动画
    setTimeout(() => {
      this.afterFlip()
    }, 4000)

    this.callWebhookCollection(values)
  }

  /** ==================== flip ==================== */
  /** 设置允许全局开启翻转动画 */
  preFlip = (subjectId: SubjectId) => {
    this.setState({
      flip: {
        animate: true,
        subjectId,
        topicId: 0,
        floorId: 0,
        key: this.state.flip.key + 1
      }
    })
  }

  /** 设置允许全局开启翻转动画 */
  preFlipLikes = (topicId: TopicId, floorId: number) => {
    this.setState({
      flip: {
        animate: true,
        subjectId: 0,
        topicId,
        floorId,
        key: this.state.flip.key + 1
      }
    })
  }

  /** 关闭全局翻转动画 */
  afterFlip = () => {
    this.setState({
      flip: {
        animate: false,
        subjectId: 0,
        topicId: 0,
        floorId: 0
      }
    })
  }

  /** ==================== webhook ==================== */
  /** 更新收藏时间线的 webhook */
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
