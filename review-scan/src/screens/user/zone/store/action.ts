/*
 * @Author: czy0729
 * @Date: 2024-04-08 18:28:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-16 07:47:37
 */
import { toJS } from 'mobx'
import { systemStore, timelineStore, uiStore, userStore } from '@stores'
import { feedback, getTimestamp, info, loading } from '@utils'
import { fetchHTML, t } from '@utils/fetch'
import { completions, get, update } from '@utils/kv'
import { MUSUME_PROMPT, MUSUME_ZONE_PROMPT } from '@utils/kv/ds'
import { webhookFriend } from '@utils/webhooks'
import { HOST, MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants'
import {
  CompletionItem,
  Navigation,
  ScrollEvent,
  TimeLineScope,
  TimeLineType,
  TimeLineTypeCn
} from '@types'
import Fetch from './fetch'

export default class Action extends Fetch {
  private y = 0

  private scrollToOffset = {}

  private scrollTo = {}

  /** 收集 ListView | ScrollView 引用 */
  connectRef = (ref: any, index: number) => {
    this.scrollToOffset[index] = ref?.scrollToOffset

    // android: scrollResponderScrollTo, ios: scrollTo
    this.scrollTo[index] = ref?.scrollResponderScrollTo || ref?.scrollTo
  }

  /** 使用合适的方法滚动到指定位置 */
  updatePageOffset = (index: number[] = [-1, 1]) => {
    const { page, fixed } = this.state
    const offset = fixed ? this.h_fixed : this.y
    index.forEach(item => {
      const scrollToOffset = this.scrollToOffset[page + item]
      if (typeof scrollToOffset === 'function') {
        scrollToOffset({
          offset,
          animated: false
        })
      } else {
        const scrollTo = this.scrollTo[page + item]
        if (typeof scrollTo === 'function') {
          scrollTo({
            y: offset,
            animated: false
          })
        }
      }
    })
  }

  /** 滚动事件, 控制顶部背景是否固定 */
  onScroll = (e: ScrollEvent) => {
    uiStore.closePopableSubject()
    uiStore.closeLikesGrid()

    const { fixed } = this.state
    const { y } = e.nativeEvent.contentOffset
    this.y = y

    const offset = this.h_fixed - 20
    if (fixed && y < offset) {
      this.setState({
        fixed: false
      })
      return
    }

    if (!fixed && y >= offset) {
      this.setState({
        fixed: true
      })
    }
  }

  /** 标签页切换 */
  onTabChange = (page: number) => {
    t('空间.标签页切换', {
      userId: this.userId,
      page
    })

    this.setState({
      page
    })
    this.save()
    this.onTabChangeCallback(page)
  }

  /** 标签页切换后回调, 延迟请求对应页面数据 */
  onTabChangeCallback = async (page: number) => {
    const { title } = this.tabs[page]
    if (title === '番剧') {
      await this.fetchUserCollections()
    } else if (title === '时间线') {
      await this.fetchUsersTimeline(true)
    } else if (title === '超展开') {
      this.checkUserTopicsIsTimeout()
      await this.fetchUserTopicsFormCDN()
    } else if (title === '小圣杯' && !this.fromTinygrail) {
      await this.fetchCharaAssets()
      await this.fetchTempleTotal()
      await this.fetchCharaTotal()
    }

    setTimeout(() => this.updatePageOffset([0]), 0)
  }

  /** 若干秒后, 若用户帖子为空, 认为该用户没有发过帖子 */
  checkUserTopicsIsTimeout = () => {
    setTimeout(() => {
      if (this.userTopicsFormCDN.list.length === 0) {
        this.setState({
          timeout: true
        })
      }
    }, 3600)
  }

  /** 番剧展开分组 */
  onToggleSection = (title: string) => {
    const { expand } = this.state
    t('空间.展开分组', {
      userId: this.userId,
      title,
      expand: !expand[title]
    })

    if (systemStore.setting.zoneCollapse) {
      this.setState({
        expand: {
          在看: false,
          看过: false,
          想看: false,
          搁置: false,
          抛弃: false,
          [title]: !expand[title]
        }
      })
      return
    }

    this.setState({
      expand: {
        ...expand,
        [title]: !expand[title]
      }
    })
    this.save()
  }

  /** 去用户的所有收藏页面 */
  navigateToUser = (navigation: Navigation) => {
    const { username } = this.usersInfo
    navigation.push('User', {
      userId: username
    })
  }

  /** 打开用户信息历史 */
  openUsedModal = () => {
    this.setState({
      visible: true
    })
  }

  /** 关闭用户信息历史 */
  closeUsedModal = () => {
    this.setState({
      visible: false
    })
  }

  /** 切换用户原始 Id */
  toggleOriginUid = () => {
    const { originUid } = this.state
    this.setState({
      originUid: !originUid
    })
  }

  /** 选择时间线类型 */
  onSelectTimelineType = (label: TimeLineTypeCn) => {
    const timelineType = MODEL_TIMELINE_TYPE.getValue(label)
    if (!timelineType || timelineType === this.state.timelineType) return

    this.setState({
      timelineType
    })
    this.fetchUsersTimeline(true, true)
  }

  /** 显示备注弹窗 */
  openRemarkModal = () => {
    this.setState({
      remarkModalVisible: true,
      remarkModalInput: this.userRemark || ''
    })
  }

  /** 隐藏备注弹窗 */
  closeRemarkModal = () => {
    this.setState({
      remarkModalVisible: false
    })
  }

  /** 改变备注弹窗输入 */
  changeRemarkModal = (text: string) => {
    this.setState({
      remarkModalInput: text
    })
  }

  /** 提交备注 */
  submitRemarkModal = () => {
    if (!this.username) return

    systemStore.updateUserRemark(this.username, this.state.remarkModalInput)
    this.resetRemarkModal()
    info('已保存')
    feedback()
  }

  /** 重置备注弹窗 */
  resetRemarkModal = () => {
    this.setState({
      remarkModalVisible: false,
      remarkModalInput: ''
    })
  }

  /** 显示好友状态 (在 timelineStore 查找添加好友的时间, 最多请求 3 页) */
  logFriendStatus = async () => {
    const hide = loading('查询好友信息中...')
    feedback(true)

    const { username } = this.usersInfo
    const query = {
      scope: MODEL_TIMELINE_SCOPE.getValue<TimeLineScope>('自己'),
      type: MODEL_TIMELINE_TYPE.getValue<TimeLineType>('好友')
    }
    let data = await timelineStore.fetchTimeline(query, true)
    let find = data.list.find(item => item?.p3?.url?.[0]?.includes(`/user/${username}`))

    if (!find) {
      await timelineStore.fetchTimeline(query)
      await timelineStore.fetchTimeline(query)
      data = await timelineStore.fetchTimeline(query)
      feedback(true)
    }
    find = data.list.find(item => item?.p3?.url?.[0]?.includes(`/user/${username}`))

    hide()
    if (!find) {
      info('是你的好友')
      this.setState({
        friendStatus: '很久之前'
      })
      this.save()
      return
    }

    const { time } = find
    const friendStatus = time.split(' · ')[0]
    info(`${friendStatus}加为了好友`)
    this.setState({
      friendStatus
    })
    this.save()
  }

  /** 显示锐评框 */
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

  /** 前一个锐评 */
  beforeChat = () => {
    let { index } = this.state.chat
    if (index === -1) return

    if (index === 0) {
      index = this.currentChatValues.length - 1
    } else {
      index -= 1
    }
    this.setState({
      chat: {
        index
      }
    })
    this.save()

    feedback(true)
  }

  /** 后一个锐评 */
  nextChat = () => {
    let { index } = this.state.chat
    if (index === -1) return

    if (index === this.currentChatValues.length - 1) {
      index = 0
    } else {
      index += 1
    }
    this.setState({
      chat: {
        index
      }
    })
    this.save()

    feedback(true)
  }

  /** 添加好友 */
  doConnect = async () => {
    t('空间.添加好友', {
      userId: this.userId
    })

    const { connectUrl } = this.users
    if (connectUrl) {
      await fetchHTML({
        url: `${HOST}${connectUrl}`
      })
      feedback()
      info('已添加好友')
      this.fetchUsers()

      webhookFriend(this.usersInfo, userStore.userInfo)
    }
  }

  /** 解除好友 */
  doDisconnect = async () => {
    t('空间.解除好友', {
      userId: this.userId
    })

    const { disconnectUrl } = this.users
    if (disconnectUrl) {
      await fetchHTML({
        url: `${HOST}${disconnectUrl}`
      })
      feedback()
      info('已解除好友')
      this.fetchUsers()
    }
  }

  /** 删除时间线 */
  doDelete = async (clearHref: string) => {
    if (!clearHref) return false

    const responseText = await fetchHTML({
      method: 'POST',
      url: `${clearHref}&ajax=1`
    })
    feedback()

    try {
      if (JSON.parse(responseText)?.status === 'ok') {
        timelineStore.removeUsersTimeline(clearHref, this.userId)
      }
    } catch (error) {}

    return true
  }

  private _doChatUpdate = false

  /** 锐评 */
  doChat = async (refresh = false) => {
    if (this.state.chatLoading || !this.username) return

    t('空间.聊天', {
      username: this.username
    })

    this.showChatModal()

    const { musumePrompt } = systemStore.setting
    let id = 'completions_zone'
    if (musumePrompt !== 'bangumi') id += `_${musumePrompt}`
    id += `_${this.username}`

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

    const roleSystem = `你正在和用户一起浏览班友"${this.nickname}"（可提及）的个人空间，请评论：`
    let roleUser = `注册时间：${this.users.join}。`
    if (this.content) roleUser += `个人简介：${this.content.slice(0, 400)}。`

    this.setState({
      chatLoading: true
    })
    const value = await completions(
      `${MUSUME_PROMPT[musumePrompt]}${MUSUME_ZONE_PROMPT}`,
      roleSystem,
      roleUser
    )
    this.setState({
      chatLoading: false
    })
    feedback()

    if (!value) {
      info('请求超时请重试')
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
}
