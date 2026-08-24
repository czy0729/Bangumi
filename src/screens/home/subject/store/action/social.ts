/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 01:32:44
 */
import { toJS } from 'mobx'
import {
  collectionStore,
  rakuenStore,
  systemStore,
  timelineStore,
  uiStore,
  usersStore,
  userStore
} from '@stores'
import { confirm, copy, feedback, getTimestamp, info } from '@utils'
import { t } from '@utils/fetch'
import { generate, get, update } from '@utils/kv'
import { MUSUME_PROMPT, MUSUME_SUBJECT_PROMPT } from '@utils/kv/ds'
import {
  LIKE_TYPE_TIMELINE,
  TEXT_MENU_BLOCK,
  TEXT_MENU_CANCEL_TRACK_COLLECTIONS_TIMELINE,
  TEXT_MENU_IGNORE,
  TEXT_MENU_MANAGE_TRACK,
  TEXT_MENU_SPLIT,
  TEXT_MENU_TRACK_COLLECTIONS_TIMELINE
} from '@constants'
import { TEXT_COPY_COMMENT, TEXT_LIKES } from '../../ds'
import Actions from './actions'

import type { CompletionItem, Id, Navigation, UserId } from '@types'

/** 社交互动 (屏蔽 / 追踪 / 吐槽 / 锐评) */
export default class Social extends Actions {
  addBlockUser = (values: { avatar: string; userId: UserId; userName: string }) => {
    confirm(
      `屏蔽来自 ${values?.userName}@${values?.userId} 的包括条目评论、时间胶囊、超展开相关信息，确定?`,
      () => {
        rakuenStore.addBlockUser(`${values.userName}@${values.userId}`)
        info(`已屏蔽 ${values.userName}`)

        t('条目.屏蔽用户', {
          userId: values.userId
        })
      }
    )
  }

  /** 绝交用户 */
  doBlockUser = (values: { avatar: string; userId: UserId; userName: string }) => {
    confirm(
      `与 ${values.userName} 绝交（不再看到用户的所有话题、评论、日志、私信、提醒）?`,
      async () => {
        if (!rakuenStore.formhash) await rakuenStore.fetchPrivacy()

        rakuenStore.doBlockUser(
          {
            keyword: String(values.userId)
          },
          () => {
            info('已添加绝交')
            feedback()
            rakuenStore.fetchPrivacy()

            t('条目.绝交')
          },
          () => {
            info('添加失败, 可能授权信息过期')
          }
        )
      }
    )
  }

  /** 追踪特定用户收藏相关信息 */
  onTrackUsersCollection = (
    title: string,
    userData: {
      avatar: string
      userId: UserId
      userName: string
    },
    comment: string,
    relatedId: Id,
    navigation?: Navigation
  ) => {
    if (!userData?.userId) return false

    // 贴贴
    if (title === TEXT_LIKES) {
      if (!userStore.isLogin) {
        info('请先登录')
        return false
      }

      uiStore.showLikesGrid(this.subjectId, relatedId, userStore.formhash, LIKE_TYPE_TIMELINE, {
        recommandPosition: 'top'
      })
      return
    }

    // 复制吐槽
    if (title === TEXT_COPY_COMMENT) {
      this.onCopyComment(userData, comment)
      return
    }

    // 屏蔽
    if (title === TEXT_MENU_BLOCK) {
      this.addBlockUser(userData)
      return
    }

    // 绝交
    if (title === TEXT_MENU_IGNORE) {
      this.doBlockUser(userData)
      return
    }

    // 分割线
    if (title === TEXT_MENU_SPLIT) return

    // 追踪TA的动画观看进度
    if (title === TEXT_MENU_TRACK_COLLECTIONS_TIMELINE) {
      systemStore.trackCollectionTimelines(userData.userId)
      timelineStore.fetchCollectionTimelines(userData.userId, true)
      return
    }

    // 取消追踪TA的动画观看进度
    if (title === TEXT_MENU_CANCEL_TRACK_COLLECTIONS_TIMELINE) {
      confirm('确定取消?', () => {
        systemStore.cancelTrackCollectionTimelines(userData.userId)
      })
      return
    }

    // 追踪管理
    if (title === TEXT_MENU_MANAGE_TRACK) {
      if (navigation) {
        navigation.push('Setting', {
          open: 'Track'
        })
      }
      return
    }

    // 追踪特定用户条目类型吐槽
    if (this.type) {
      const { avatar, userId, userName } = userData || {}
      systemStore.trackUsersCollection(userId, this.subjectTypeValue)
      usersStore.updateUsersInfo({
        avatar,
        userId,
        userName
      })
      collectionStore.fetchUsersCollection(userId, this.subjectId)

      t('条目.追踪', {
        subjectId: this.subjectId,
        type: this.subjectTypeValue,
        userId
      })
    }
  }

  /** 取消追踪特定用户条目类型吐槽 */
  onCancelTrackUsersCollection = (userData: {
    avatar: string
    userId: UserId
    userName: string
  }) => {
    if (this.type && userData?.userId) {
      const { userId } = userData || {}
      systemStore.cancelTrackUsersCollection(userId, this.subjectTypeValue)

      t('条目.取消追踪', {
        subjectId: this.subjectId,
        type: this.subjectTypeValue,
        userId
      })
    }
  }

  /** 复制评论 */
  onCopyComment = (
    userData: {
      avatar: string
      userId: UserId
      userName: string
    },
    comment: string
  ) => {
    copy(comment, `已复制 ${userData?.userName} 的吐槽`)
  }

  /** 拼图分享 */

  showChatModal = () => {
    this.setState({
      chatModalVisible: true
    })
    feedback(true)
  }

  /** 隐藏锐评框 */
  hideChatModal = () => {
    this.setState({
      chatModalVisible: false
    })
  }

  /** 切换锐评索引 (dir: 1 后一个 / -1 前一个) */
  private stepChat = (dir: 1 | -1) => {
    let { index } = this.state.chat
    if (index === -1) return

    const length = this.currentChatValues.length
    if (dir === 1) {
      index = index === length - 1 ? 0 : index + 1
    } else {
      index = index === 0 ? length - 1 : index - 1
    }

    this.setState({
      chat: {
        index
      }
    })
    this.save()

    feedback(true)
  }

  /** 前一个锐评 */
  beforeChat = () => this.stepChat(-1)

  /** 后一个锐评 */
  nextChat = () => this.stepChat(1)

  private _doChatUpdate = false

  /** 锐评 */
  doChat = async (refresh = false) => {
    if (this.state.chatLoading) return

    t('条目.聊天', {
      subjectId: this.subjectId
    })

    this.showChatModal()

    const { musumePrompt } = systemStore.setting
    let id = 'completions_subject'
    if (musumePrompt !== 'bangumi') id += `_${musumePrompt}`
    id += `_${this.subjectId}`

    const now = getTimestamp()
    if (!this.currentChatValues.length) {
      const data = await get(id)
      if (Array.isArray(data?.data) && data.data.length) {
        this.setState({
          chat: {
            [musumePrompt]: data.data,
            index: 0,
            _loaded: now
          }
        })
        return
      }
    }

    if (!refresh && this.currentChatValues.length) return

    this.setState({
      chatLoading: true
    })
    const prompt =
      musumePrompt !== 'bangumi'
        ? `${MUSUME_PROMPT[musumePrompt]}${MUSUME_SUBJECT_PROMPT}`
        : undefined
    const value = await generate('subject', this.subjectId, refresh, prompt)
    this.setState({
      chatLoading: false
    })
    feedback()

    if (!value) {
      info('请求超时，可以过一段时间再试')
      return
    }

    const newValues: CompletionItem[] = toJS(this.currentChatValues)
    newValues.push({
      text: value,
      userId: this.userId || 0,
      _loaded: now
    })
    if (newValues.length > 10) newValues.shift()

    const { length } = newValues
    this.setState({
      chat: {
        [musumePrompt]: newValues,
        index: length - 1,
        _loaded: now
      }
    })
    this.save()

    // 长度1优先能让快照拥有数据; 长度5可以保证有比较多数据; 长度10为数据最大长度, 如果更新过就不再更新, 否则会一直更新
    if (length === 1 || length === 5 || (length === 10 && !this._doChatUpdate)) {
      update(id, {
        data: newValues
      })
      this._doChatUpdate = true
    }
  }

  /** 切换动态类型 */
  onSwitchSubjectRecentType = (label: string) => {
    systemStore.setSetting('subjectRecentType', label)

    setTimeout(() => {
      this.fetchFriendsRating()
    }, 0)
  }
}
