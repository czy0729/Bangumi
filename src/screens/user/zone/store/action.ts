import { timelineStore, uiStore, userStore } from '@stores'
import { feedback, HTMLDecode, info, loading } from '@utils'
import { fetchHTML, t } from '@utils/fetch'
import { webhookFriend } from '@utils/webhooks'
import { HOST, MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants'
import { Navigation, TimeLineScope, TimeLineType } from '@types'
import Fetch from './fetch'

export default class Action extends Fetch {
  y = 0

  scrollToOffset = {}

  scrollTo = {}

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
  onScroll = (e: {
    nativeEvent: {
      contentOffset: {
        y: any
      }
    }
  }) => {
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
    const { _name } = this.params
    const { avatar, nickname, username } = this.usersInfo
    navigation.push('User', {
      userId: username,
      _name: HTMLDecode(nickname || _name),
      _image: avatar?.large
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

  /** 显示好友状态 (在 timelineStore 查找添加好友的时间, 最多请求 3 页) */
  logFriendStatus = async () => {
    const { username } = this.usersInfo
    const query = {
      scope: MODEL_TIMELINE_SCOPE.getValue<TimeLineScope>('自己'),
      type: MODEL_TIMELINE_TYPE.getValue<TimeLineType>('好友')
    }

    const hide = loading('查询好友信息中...')
    let data = await timelineStore.fetchTimeline(query, true)
    let find = data.list.find(item => item?.p3?.url?.[0]?.includes(`/user/${username}`))

    if (!find) {
      await timelineStore.fetchTimeline(query)
      await timelineStore.fetchTimeline(query)
      data = await timelineStore.fetchTimeline(query)
    }
    find = data.list.find(item => item?.p3?.url?.[0]?.includes(`/user/${username}`))

    hide()
    if (!find) return info('是你的好友')

    const { time } = find
    return info(`${time.split(' · ')[0]}加为了好友`)
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
  doDelete = async (href: string) => {
    if (!href) return false

    const res = fetchHTML({
      method: 'POST',
      url: href
    })
    await res
    feedback()

    this.fetchUsersTimeline(true)
    return res
  }
}
