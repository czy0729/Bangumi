/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-21 21:39:04
 */
import { toJS } from 'mobx'
import { StatusBar } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { HEADER_TRANSITION_HEIGHT } from '@components/header/utils'
import {
  _,
  calendarStore,
  collectionStore,
  otaStore,
  rakuenStore,
  systemStore,
  uiStore,
  usersStore,
  userStore
} from '@stores'
import {
  appNavigate,
  asc,
  cnjp,
  confirm,
  copy,
  debounce,
  feedback,
  genICSCalenderEventDate,
  getBangumiUrl,
  getCoverLarge,
  getCoverMedium,
  getRandomItems,
  getSPAParams,
  getTimestamp,
  info,
  loading,
  open,
  postTask,
  saveCalenderEvent,
  showActionSheet,
  updateVisibleBottom
} from '@utils'
import { baiduTranslate, t } from '@utils/fetch'
import { completions, download, get, lx, temp, update } from '@utils/kv'
import { MUSUME_PROMPT, MUSUME_SUBJECT_PROMPT } from '@utils/kv/ds'
import axios from '@utils/thirdParty/axios'
import { s2t } from '@utils/thirdParty/open-cc'
import { webhookCollection, webhookEp } from '@utils/webhooks'
import {
  CDN_OSS_SUBJECT,
  FROZEN_FN,
  HOST,
  HOST_CDN,
  HOST_NETABA,
  IMG_WIDTH,
  LIKE_TYPE_TIMELINE,
  MODEL_COLLECTION_STATUS,
  MODEL_EP_STATUS,
  MODEL_RATING_STATUS,
  SITE_AGEFANS,
  SITE_MANHUADB,
  SITE_WK8,
  SITES,
  URL_SPA,
  WEB
} from '@constants'
import i18n from '@constants/i18n'
import { getPlainText, removeSlogan } from '@screens/discovery/word-cloud/store/utils'
import { CompletionItem, EpStatus, Id, Navigation, RatingStatus, ScrollEvent, UserId } from '@types'
import { TEXT_BLOCK_USER, TEXT_COPY_COMMENT, TEXT_IGNORE_USER, TEXT_LIKES } from '../ds'
import { EpsItem } from '../types'
import { OriginItem, replaceOriginUrl } from '../../../user/origin-setting/utils'
import Fetch from './fetch'
import {
  NAMESPACE,
  TEXT_ACTIONS_MANAGE,
  TEXT_ANI_DB,
  TEXT_ICS_MANAGE,
  TEXT_MAL,
  TEXT_NETABA,
  TEXT_ORIGINS_MANAGE,
  TEXT_VIB
} from './ds'

export default class Action extends Fetch {
  private _updateStatusBarTimeoutId = null

  /** 更新状态栏主题色 */
  updateStatusBar = () => {
    if (this._updateStatusBarTimeoutId) return

    this._updateStatusBarTimeoutId = setTimeout(() => {
      StatusBar.setBarStyle(
        _.isDark ? 'light-content' : this.state.fixed ? 'dark-content' : 'light-content'
      )
      this._updateStatusBarTimeoutId = null
    }, 80)
  }

  /** 显示收藏管理 */
  showManageModel = () => {
    this.setState({
      visible: true
    })

    t('条目.显示收藏管理', {
      subjectId: this.subjectId
    })
  }

  /** 隐藏管理进度信息弹窗 */
  closeManageModal = () => {
    this.setState({
      visible: false
    })
  }

  /** 章节倒序 */
  toggleReverseEps = () => {
    this.setState({
      epsReverse: !this.state.epsReverse
    })
    this.save()

    t('条目.章节倒序', {
      subjectId: this.subjectId
    })
  }

  /** 吐槽倒序 */
  toggleReverseComments = () => {
    this.fetchSubjectComments(true, !this.subjectComments._reverse)

    t('条目.吐槽倒序', {
      subjectId: this.subjectId
    })
  }

  /** 书籍章节输入框改变 */
  changeText = (name: string, text: string) => {
    try {
      this.setState({
        [name]: String(text)
      })

      t('条目.书籍章节输入框改变', {
        subjectId: this.subjectId
      })
    } catch (error) {
      console.error(NAMESPACE, 'changeText', error)
    }
  }

  /** 动漫源头选择 */
  onlinePlaySelected = async (key: string) => {
    try {
      t('条目.搜索源', {
        type: key,
        subjectId: this.subjectId,
        subjectType: this.type
      })

      let url: string

      // AGE 动漫，有自维护 ID 数据，优先匹配
      if (key === 'AGE动漫') {
        const aid = this.params._aid
        if (aid) {
          url = `${SITE_AGEFANS()}/detail/${aid}`
        } else {
          const item = otaStore.anime(this.subjectId)
          if (item?.ageId) url = `${SITE_AGEFANS()}/detail/${item.ageId}`
        }
      }

      // 匹配用户自定义源头
      if (!url) {
        const find = this.onlineOrigins.find((item: OriginItem) => item.name === key) as OriginItem
        if (find) {
          if (key === '萌番组' && find.id) {
            copy(this.cn || this.jp)
            postTask(() => {
              open(find.url)
            }, 1600)
            return
          }

          url = replaceOriginUrl(find.url, {
            CN: this.cn || this.jp,
            JP: this.jp || this.cn,
            ID: this.subjectId
          })
        }
      }

      // 旧匹配逻辑
      if (!url) {
        const { bangumiInfo } = this.state
        const { sites = [] } = bangumiInfo
        let item: {
          site: string
          id: Id
          url?: string
        }
        switch (key) {
          case 'AGE动漫':
            url = `${SITE_AGEFANS()}/search?query=${encodeURIComponent(this.cn || this.jp)}&page=1`
            break

          case 'Anime1':
            url = `https://anime1.me/?s=${encodeURIComponent(s2t(this.cn || this.jp))}`
            break

          case 'Hanime1':
            url = `https://hanime1.me/search?query=${encodeURIComponent(this.jp || this.cn)}`
            break

          default:
            item = sites.find(item => item.site === key)
            if (item) url = getBangumiUrl(item)
            break
        }
      }

      this.open(url)
    } catch (error) {
      console.error(NAMESPACE, 'onlinePlaySelected', error)
    }
  }

  /** 判断是否需要复制地址后跳转 */
  open = (url: string) => {
    if (url) {
      const { openInfo } = systemStore.setting
      if (openInfo) copy(url, '已复制地址，即将跳转')
      postTask(
        () => {
          open(url)
        },
        openInfo ? (WEB ? 400 : 1600) : 0
      )
    }
  }

  /** 漫画源头选择 */
  onlineComicSelected = (key: string) => {
    try {
      let url: string

      // 匹配用户自定义源头
      const find = this.onlineComicOrigins.find(item => item.name === key)
      if (find) {
        url = replaceOriginUrl(find.url, {
          CN: this.cn || this.jp,
          JP: this.jp || this.cn,
          ID: this.subjectId
        })
      }
      this.open(url)

      t('条目.搜索源', {
        type: key,
        subjectId: this.subjectId,
        subjectType: this.type
      })
    } catch (error) {
      console.error(NAMESPACE, 'onlineComicSelected', error)
    }
  }

  /** 音乐源头选择 */
  onlineDiscSelected = (key: string) => {
    try {
      let url: string

      // 匹配用户自定义源头
      const find = this.onlineDiscOrigins.find(item => item.name === key)
      if (find) {
        url = replaceOriginUrl(find.url, {
          CN: this.cn || this.jp,
          JP: this.jp || this.cn,
          ID: this.subjectId
        })
      }
      this.open(url)

      t('条目.搜索源', {
        type: key,
        subjectId: this.subjectId,
        subjectType: this.type
      })
    } catch (error) {
      console.error(NAMESPACE, 'onlineDiscSelected', error)
    }
  }

  /** 游戏源头选择 */
  onlineGameSelected = (key: string) => {
    try {
      let url: string

      // 匹配用户自定义源头
      const find = this.onlineGameOrigins.find(item => item.name === key)
      if (find) {
        url = replaceOriginUrl(find.url, {
          CN: this.cn || this.jp,
          JP: this.jp || this.cn,
          ID: this.subjectId
        })
      }
      this.open(url)

      t('条目.搜索源', {
        type: key,
        subjectId: this.subjectId,
        subjectType: this.type
      })
    } catch (error) {
      console.error(NAMESPACE, 'onlineGameSelected', error)
    }
  }

  /** 去漫画DB */
  toManhuadb = () => {
    const { mangaId } = this.source || {}
    const url = `${SITE_MANHUADB()}/manhua/${mangaId}`
    this.open(url)

    t('条目.阅读漫画', {
      subjectId: this.subjectId,
      mid: mangaId
    })
  }

  /** 去文库8 */
  toWenku8 = () => {
    const { wenkuId } = this.source || {}
    const url = `${SITE_WK8()}/novel/${Math.floor(wenkuId / 1000)}/${wenkuId}/index.htm`
    this.open(url)

    t('条目.阅读轻小说', {
      subjectId: this.subjectId,
      wid: wenkuId
    })
  }

  /** 前往 PSNINE 查看游戏奖杯 */
  toPSNINE = () => {
    open(`https://psnine.com/psngame?title=${encodeURIComponent(this.cn || this.jp)}`)

    t('条目.查看奖杯', {
      subjectId: this.subjectId
    })
  }

  /** 设置章节筛选 */
  updateFilterEps = (key: string) => {
    let filterEps = parseInt(key.match(/\d+/g)[0])
    if (filterEps === 1) filterEps = 0
    this.setState({
      filterEps
    })
    this.save()

    t('条目.设置章节筛选', {
      subjectId: this.subjectId,
      filterEps
    })
  }

  /** 筛选分数 */
  filterScores = (label: string) => {
    this.setState({
      filterScores: label === '全部' ? [] : label.split('-')
    })

    t('条目.筛选分数', {
      subjectId: this.subjectId,
      label
    })
  }

  /** 筛选吐槽状态 */
  filterStatus = async (label: string) => {
    const filterStatus = label === '全部' ? '' : MODEL_RATING_STATUS.getValue(label) || ''
    if (filterStatus === this.state.filterStatus) return

    this.setState({
      filterStatus,
      filterScores: []
    })
    this.save()

    await this.fetchSubjectComments(true, false)
    feedback()

    t('条目.筛选吐槽状态', {
      subjectId: this.subjectId,
      label
    })
  }

  /** 去用户评分页面 */
  toRating = (navigation: Navigation, from?: string, status?: '' | RatingStatus) => {
    const { wish, collect, doing, on_hold: onHold, dropped } = this.subjectCollection
    navigation.push('Rating', {
      subjectId: this.subjectId,
      status,
      name: cnjp(this.cn, this.jp),
      wish,
      collect,
      doing,
      onHold,
      dropped,
      type: this.type
    })

    t('条目.跳转', {
      to: 'Rating',
      from,
      subjectId: this.subjectId,
      status
    })
  }

  /** 展开收起功能块 */
  onSwitchBlock = (key: Parameters<typeof systemStore.switchSetting>[0]) => {
    systemStore.switchSetting(key)

    t('条目.展开收起功能块', {
      key
    })
  }

  /** 展开收起功能块 */
  hiddenBlock = (key: Parameters<typeof systemStore.switchSetting>[0]) => {
    systemStore.setSetting(key, -1)

    t('条目.展开收起功能块', {
      key: `${key} | -1`
    })
  }

  /** 显示 / 关闭管理目录模态框 */
  toggleFolder = () => {
    if (!userStore.isLogin) {
      info(`请先${i18n.login()}`)
      return
    }

    const value = !this.state.folder
    this.setState({
      folder: value
    })

    if (value) {
      t('条目.管理目录', {
        subjectId: this.subjectId
      })
    }
  }

  /** 自定义放送时间 */
  onSelectOnAir = (weekDayCN: string | number, timeCN: string) => {
    calendarStore.updateOnAirUser(this.subjectId, weekDayCN, timeCN)

    t('条目.自定义放送', {
      subjectId: this.subjectId
    })
  }

  /** 重置条目的自定义放送时间 */
  resetOnAirUser = () => {
    calendarStore.resetOnAirUser(this.subjectId)

    t('条目.重置放送', {
      subjectId: this.subjectId
    })
  }

  /** 自定义跳转菜单回调 */
  onActionsPress = (title: string, navigation: Navigation) => {
    if (title === TEXT_ACTIONS_MANAGE) {
      navigation.push('Actions', {
        subjectId: this.subjectId,
        name: this.cn || this.jp
      })
      return
    }

    const find = this.actions.find(item => item.name === title)
    if (find) {
      open(find.url, true)

      t('其他.自定义跳转', {
        from: 'Subject',
        key: `${this.subjectId}|${find.name}|${find.url}`
      })
      return
    }
  }

  /** 源头菜单回调 */
  onOnlinePress = (title: string, navigation: Navigation) => {
    if (title === TEXT_ORIGINS_MANAGE) {
      navigation.push('OriginSetting')
      return
    }

    if (title === TEXT_ACTIONS_MANAGE) {
      navigation.push('Actions', {
        subjectId: this.subjectId,
        name: this.cn || this.jp
      })
      return
    }

    if (title === TEXT_ICS_MANAGE) {
      this.doExportCalenderEventICS()
      return
    }

    this.onlinePlaySelected(title)
  }

  /** 曲目菜单回调 */
  onDiscPress = (title: string, navigation: Navigation) => {
    if (title === TEXT_ORIGINS_MANAGE) {
      navigation.push('OriginSetting')
      return
    }

    if (title === TEXT_ACTIONS_MANAGE) {
      navigation.push('Actions', {
        subjectId: this.subjectId,
        name: this.cn || this.jp
      })
      return
    }

    this.onlineDiscSelected(title)
  }

  /** 游戏菜单回调 */
  onGamePress = (title: string, navigation: Navigation) => {
    if (title === TEXT_ORIGINS_MANAGE) {
      navigation.push('OriginSetting')
      return
    }

    if (title === TEXT_ACTIONS_MANAGE) {
      navigation.push('Actions', {
        subjectId: this.subjectId,
        name: this.cn || this.jp
      })
      return
    }

    this.onlineGameSelected(title)
  }

  /** 书籍菜单回调 */
  onComicPress = (title: string, navigation: Navigation) => {
    if (title === TEXT_ORIGINS_MANAGE) {
      navigation.push('OriginSetting')
      return
    }

    if (title === TEXT_ACTIONS_MANAGE) {
      navigation.push('Actions', {
        subjectId: this.subjectId,
        name: this.cn || this.jp
      })
      return
    }

    this.onlineComicSelected(title)
  }

  /** VIB 评分透视菜单回调 */
  onVIBPress = (title: string, navigation: Navigation) => {
    if (title === TEXT_VIB) {
      t('条目.跳转', {
        to: 'Stats',
        from: '评分分布',
        subjectId: this.subjectId
      })

      navigation.push('WebBrowser', {
        title: `${cnjp(this.cn, this.jp)}的透视`,
        url: `https://bgm.tv/subject/${this.subjectId}/stats`
      })
      return
    }

    if (title === TEXT_NETABA) {
      t('条目.跳转', {
        to: 'Netabare',
        from: '评分分布',
        subjectId: this.subjectId
      })

      open(`${HOST_NETABA}/subject/${this.subjectId}`)
      return
    }

    if (title === TEXT_ANI_DB) {
      open(
        `https://anidb.net/anime/?adb.search=${(this.jp || this.cn).replace(
          /～|、|・/g,
          ' '
        )}&do.search=1`
      )
      return
    }

    if (title === TEXT_MAL) {
      open(`https://myanimelist.net/anime.php?q=${this.jp || this.cn}`)
      return
    }
  }

  /** @deprecated 屏蔽用户 */
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
    relatedId: Id
  ) => {
    if (!userData?.userId) return false

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

    if (title === TEXT_COPY_COMMENT) {
      this.onCopyComment(userData, comment)
      return
    }

    if (title === TEXT_BLOCK_USER) {
      this.addBlockUser(userData)
      return
    }

    if (title === TEXT_IGNORE_USER) {
      this.doBlockUser(userData)
      return
    }

    if (this.type) {
      const { avatar, userId, userName } = userData || {}
      systemStore.trackUsersCollection(userId, this.subjectTypeValue)
      usersStore.updateUsersInfo({
        avatar,
        userId,
        userName
      })
      collectionStore.fetchUsersCollection(userId, this.subjectId)

      t('条目.特别关注', {
        subjectId: this.subjectId,
        type: this.subjectTypeValue,
        userId
      })
    }
  }

  /** 取消追踪特定用户收藏相关信息 */
  onCancelTrackUsersCollection = (
    _title: string,
    userData: {
      avatar: string
      userId: UserId
      userName: string
    }
  ) => {
    if (this.type && userData?.userId) {
      const { userId } = userData || {}
      systemStore.cancelTrackUsersCollection(userId, this.subjectTypeValue)

      t('条目.取消特别关注', {
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
    feedback()
  }

  /** 拼图分享 */
  onPostShare = async (navigation: Navigation) => {
    if (!navigation) return

    const { images } = this.subject
    let src = CDN_OSS_SUBJECT(getCoverMedium(images?.common))
    if (!src.includes?.(HOST_CDN)) src = getCoverLarge(images?.common)

    const hide = loading('下载封面中...')

    // @ts-expect-error
    axios.defaults.withCredentials = false

    // @ts-expect-error
    const { request } = await axios({
      method: 'get',
      url: src.replace('http://', 'https://'),
      responseType: 'arraybuffer'
    })
    hide()

    navigation.push('Share', {
      _subjectId: this.subjectId,
      _type: this.type,
      _url: `${HOST}/subject/${this.subjectId}`,
      _cover: `data:image/jpg;base64,${request._response}`,
      _title: cnjp(this.cn, this.jp),
      _content: this.summary.replace(/\r\n\r\n/g, '\r\n'),
      _detail: this.tags
        .filter((_item, index) => index <= 4)
        .map(item => item.name)
        .join(' · ')
    })

    t('条目.拼图分享', {
      subjectId: this.subjectId,
      spa: false
    })
  }

  /** APP 网页分享 */
  onWebShare = () => {
    const url = `${URL_SPA}/${getSPAParams('Subject', {
      subjectId: this.subjectId
    })}`
    copy(`【链接】${cnjp(this.cn, this.jp)} | Bangumi番组计划\n${url}`, '已复制 APP 网页版地址')
    postTask(() => {
      open(url)
    }, 1600)

    t('条目.拼图分享', {
      subjectId: this.subjectId,
      spa: true
    })
  }

  /** 切换评论版本 */
  toggleVersion = async () => {
    this.setState({
      filterVersion: !this.state.filterVersion
    })
    this.save()

    await this.fetchSubjectComments(true, false)
    feedback()
  }

  /** Box 状态按钮做动画前, 需要先设置开启 */
  prepareFlip = () => {
    this.setState({
      flip: true
    })
  }

  /** Box 状态按钮完全动画后, 需要设置关闭才能做下一次动画 */
  afterFlip = () => {
    const { flipKey } = this.state
    this.setState({
      flip: false
    })
    postTask(() => {
      this.setState({
        flipKey: flipKey + 1
      })
    }, 400)
  }

  private _flipTimeoutId = null

  /** Eps 状态按钮做动画前, 需要先设置开启 */
  prepareEpsFlip = () => {
    if (this._flipTimeoutId) clearTimeout(this._flipTimeoutId)

    this.setState({
      flipEps: true
    })

    this._flipTimeoutId = setTimeout(() => {
      this.afterEpsFlip()
    }, 8000)
  }

  /** Eps 状态按钮完全动画后, 需要设置关闭才能做下一次动画 */
  afterEpsFlip = debounce(() => {
    this.setState({
      flipEps: false
    })
  })

  /** 更新可视范围底部 y */
  updateVisibleBottom = updateVisibleBottom.bind(this)

  onScrollY = 0

  private _closeLikesGridTimeoutId = null

  /** 滑动回调 */
  onScroll = (e: ScrollEvent) => {
    const { y } = e.nativeEvent.contentOffset
    this.onScrollY = y
    this.updateVisibleBottom(e)

    // 关闭吐槽区可能展开的回复表情选择弹出层
    if (!this._closeLikesGridTimeoutId && y >= _.window.height * 2) {
      this._closeLikesGridTimeoutId = setTimeout(() => {
        uiStore.closeLikesGrid()
        this._closeLikesGridTimeoutId = null
      }, 80)
    }

    // 计算头部是否需要固定
    if (
      (this.state.fixed && y > HEADER_TRANSITION_HEIGHT) ||
      (!this.state.fixed && y <= HEADER_TRANSITION_HEIGHT)
    ) {
      return
    }

    this.setState({
      fixed: y > HEADER_TRANSITION_HEIGHT
    })
    if (!this.state.scrolled) {
      setTimeout(() => {
        this.setState({
          scrolled: true
        })
      }, 0)
    }

    this.updateStatusBar()
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

  // -------------------- action --------------------
  /** 管理收藏 */
  doUpdateCollection = async (values: Parameters<typeof collectionStore.doUpdateCollection>[0]) => {
    try {
      this.prepareFlip()
      this.setState({
        disabled: true
      })

      await collectionStore.doUpdateCollection({
        ...values,
        noConsole: true
      })
      collectionStore.fetchCollection(this.subjectId)
      collectionStore.fetchCollectionStatusQueue([this.subjectId])

      if (values.status !== MODEL_COLLECTION_STATUS.getValue<RatingStatus>('在看')) {
        // 不是在看的话要在进度中删掉对应条目信息
        userStore.removeCollection(values.subjectId)
      } else {
        // 在看的话要在进度中添加对应条目信息
        userStore.addCollection(values.subjectId)
      }

      this.closeManageModal()
      webhookCollection(values, this.subject, userStore.userInfo)

      t('条目.管理收藏', {
        subjectId: this.subjectId
      })
    } catch (error) {
      console.error(NAMESPACE, 'doUpdateCollection', error)
    }

    this.setState({
      disabled: false
    })
  }

  /** 本集讨论 */
  toEp = (item: EpsItem, navigation: Navigation) => {
    // 数据占位
    appNavigate(
      item.url || `/ep/${item.id}`,
      navigation,
      {
        _title: `ep${item.sort}.${item.name || item.name_cn}`,
        _group: this.subject.name || this.subject.name_cn,
        _groupThumb: getCoverSrc((this.subject.images || {})?.medium, IMG_WIDTH),
        _desc: `时长:${item.duration} / 首播:${item.airdate}<br />${(item.desc || '').replace(
          /\r\n/g,
          '<br />'
        )}`
      },
      {
        id: '条目.跳转',
        data: {
          from: '章节',
          subjectId: this.subjectId
        }
      }
    )

    t('条目.章节菜单操作', {
      title: '本集讨论',
      subjectId: this.subjectId
    })
  }

  /** 正版播放 */
  toPlay = (item: EpsItem) => {
    postTask(() => {
      showActionSheet(this.onlinePlayActionSheetData, index => {
        const isSp = item.type === 1
        let url: string

        // @todo 逻辑比较复杂, 暂时不处理 Ep 偏移
        const { epsData } = this.state
        const { eps = [] } = this.subject
        const site: any = this.onlinePlayActionSheetData[index]
        let epIndex: number
        if (SITES.includes(site)) {
          if (isSp) {
            url = getBangumiUrl({
              id: item.id,
              site
            })
          } else {
            epIndex = eps.filter(item => item.type === 0).findIndex(i => i.id === item.id)
            url =
              epsData[site][epIndex] ||
              getBangumiUrl({
                id: item.id,
                site
              })
          }
        }

        if (url) open(url)

        t('条目.章节菜单操作', {
          title: this.onlinePlayActionSheetData[index],
          subjectId: this.subjectId
        })
      })
    }, 320)
  }

  /** 添加日历 */
  doSaveCalenderEvent = (item: EpsItem) => {
    saveCalenderEvent(item, cnjp(this.cn, this.jp), this.onAirCustom)

    t('其他.添加日历', {
      subjectId: this.subjectId,
      sort: item?.sort || 0,
      from: 'Subject'
    })
  }

  /** 更新收视进度 */
  doUpdateEpStatus = async (value: string, item: EpsItem) => {
    const status = MODEL_EP_STATUS.getValue<EpStatus>(value)
    this.prepareEpsFlip()

    // 更新收视进度
    await userStore.doUpdateEpStatus({
      id: item.id,
      status
    })
    userStore.fetchCollectionSingle(this.subjectId)
    userStore.fetchUserProgress(this.subjectId)
    webhookEp(
      {
        ...item,
        status,
        batch: false
      },
      this.subject,
      userStore.userInfo
    )

    t('条目.章节菜单操作', {
      title: '更新收视进度',
      subjectId: this.subjectId,
      status
    })
  }

  /** 批量更新收视进度 */
  doUpdateSubjectWatched = async (item: EpsItem) => {
    t('条目.章节菜单操作', {
      title: '批量更新收视进度',
      subjectId: this.subjectId
    })

    /**
     * 批量更新收视进度
     * @issue 多季度非 1 开始的番不能直接使用 sort, 需要把 sp 去除后使用当前 item.sort 查找 index
     */
    const sort = (this.subject.eps || [])
      .filter(i => i.type === 0)
      .sort((a, b) => asc(a, b, item => item.sort || 0))
      .findIndex(i => i.sort === item.sort)

    let value: number
    if (sort === -1) {
      /**
       * @issue 老 API bug, 多季度番剧使用 item.sort 不适用, 若item.sort > totalEps, 适用排序的 index
       * @date 2022/02/12
       */
      const totalEps = Number(this.subjectFormHTML.totalEps)
      value = totalEps && item.sort >= totalEps ? sort + 1 : item.sort
    } else {
      value = sort + 1
    }

    // [待迁移] 老 API 不支持任何 NSFW 的修改
    if (this.nsfw) {
      this.doUpdateEp({
        eps: value
      })
      return
    }

    this.prepareEpsFlip()
    await userStore.doUpdateSubjectWatched({
      subjectId: this.subjectId,
      sort: value
    })
    userStore.fetchCollectionSingle(this.subjectId)
    userStore.fetchUserProgress(this.subjectId)
    webhookEp(
      {
        ...item,
        status: 'watched',
        batch: true
      },
      this.subject,
      userStore.userInfo
    )
  }

  /** 章节菜单操作 */
  doEpsSelect = async (value: string, item: EpsItem, navigation?: Navigation) => {
    try {
      // iOS 是本集讨论, 安卓是 (+N)...
      if (value.includes('本集讨论') || value.includes('(+')) {
        this.toEp(item, navigation)
        return
      }

      if (value === '正版播放') {
        this.toPlay(item)
        return
      }

      if (value === '添加提醒') {
        this.doSaveCalenderEvent(item)
        return
      }

      // 未收藏不能更改进度
      const { status = { name: '未收藏' } } = this.collection
      if (status.name !== '未收藏') {
        const status = MODEL_EP_STATUS.getValue<EpStatus>(value)
        if (status) {
          this.doUpdateEpStatus(value, item)
          return
        }

        if (value === '看到') {
          if (item?.sort > 24) {
            confirm(`确认看到${item.sort}集?`, () => {
              this.doUpdateSubjectWatched(item)
            })
            return
          }

          this.doUpdateSubjectWatched(item)
          return
        }

        return
      }

      info('收藏了才能管理哦')
    } catch (error) {
      console.error(NAMESPACE, 'doEpsSelect', error)
    }
  }

  /** 更新书籍下一个章节 */
  doUpdateNext = async (name: string | number) => {
    const { chap, vol } = this.state
    const next = String(parseInt(this.state[name] || 0) + 1)
    const query = {
      subjectId: this.subjectId,
      chap,
      vol,
      [name]: next
    }

    // 20220414 nsfw 无效，待废弃，改用 doUpdateSubjectEp
    this.doUpdateEp(
      {
        eps: query.chap,
        vol: query.vol
      },
      true
    )

    t('条目.更新书籍下一个章节', {
      subjectId: this.subjectId
    })
  }

  /** 更新书籍章节 */
  doUpdateBookEp = async () => {
    const { chap, vol } = this.state

    // 20220414 nsfw 无效，待废弃，改用 doUpdateEp
    this.doUpdateEp(
      {
        eps: chap,
        vol
      },
      true
    )

    t('条目.更新书籍章节', {
      subjectId: this.subjectId
    })
  }

  /** 输入框更新章节 */
  doUpdateSubjectEp = async () => {
    const { watchedEps } = this.state

    // 20220414 nsfw 无效，待废弃，改用 doUpdateEp
    this.doUpdateEp({
      eps: watchedEps
    })

    t('条目.输入框更新章节', {
      subjectId: this.subjectId
    })
  }

  /** 章节更新统一入口 */
  doUpdateEp = async ({ eps, vol }: { eps?: any; vol?: any }, isNeedFeedback: boolean = false) => {
    try {
      this.prepareEpsFlip()

      collectionStore.doUpdateSubjectEp(
        {
          subjectId: this.subjectId,
          watchedEps: eps,
          watchedVols: vol
        },
        async () => {
          userStore.fetchCollectionSingle(this.subjectId)
          await userStore.fetchUserProgress(this.subjectId)
          await this.fetchSubjectFromHTML(true)
          this.save()
          this.afterEpsFlip()
          if (isNeedFeedback) {
            info('已提交')
            feedback()
          }

          webhookEp(
            {
              status: 'watched',
              sort: eps,
              vols: vol,
              batch: false
            },
            this.subject,
            userStore.userInfo
          )
        }
      )
    } catch (error) {
      console.error(NAMESPACE, 'doUpdateEp', error)
    }
  }

  /** 章节按钮长按 */
  doEpsLongPress = async ({
    id
  }: Partial<{
    id: Id
  }>) => {
    try {
      const userProgress = this.userProgress
      let status: EpStatus
      if (userProgress[id]) {
        // 已观看 -> 撤销
        status = MODEL_EP_STATUS.getValue<EpStatus>('撤销')
      } else {
        // 未观看 -> 看过
        status = MODEL_EP_STATUS.getValue<EpStatus>('看过')
      }

      await userStore.doUpdateEpStatus({
        id,
        status
      })
      feedback()

      userStore.fetchCollectionSingle(this.subjectId)
      userStore.fetchUserProgress(this.subjectId)

      t('条目.章节按钮长按', {
        subjectId: this.subjectId
      })
    } catch (error) {
      console.error(NAMESPACE, 'doEpsLongPress', error)
    }
  }

  /** 删除收藏 */
  doEraseCollection = async () => {
    const { formhash } = this.subjectFormHTML
    if (!formhash) return

    try {
      this.prepareFlip()
      this.setState({
        disabled: true
      })

      await userStore.doEraseCollection(
        {
          subjectId: this.subjectId,
          formhash
        },
        // 因为删除后是 302, 使用 fail 去触发
        FROZEN_FN,
        () => {
          postTask(() => {
            collectionStore.removeStatus(this.subjectId)
            this.fetchCollection()
            collectionStore.fetchCollectionStatusQueue([this.subjectId])

            // 不是在看的话要删掉对应条目信息
            userStore.removeCollection(this.subjectId)

            t('条目.删除收藏', {
              subjectId: this.subjectId
            })
          }, 40)
        }
      )
    } catch (error) {
      console.error(NAMESPACE, 'doEraseCollection', error)
    }

    this.setState({
      disabled: false
    })
  }

  /** 翻译简介 */
  doTranslate = async () => {
    if (this.state.translateResult.length) return

    t('条目.翻译简介', {
      subjectId: this.subjectId
    })

    const isDeepLX = systemStore.setting.translateEngine === 'deeplx'
    const errorInfo = `翻译${isDeepLX ? '超时' : '失败'}, 请重试`
    let hide: () => void
    try {
      hide = loading('请求中...')

      if (isDeepLX) {
        const response = await lx(this.summary)
        hide()

        if (response) {
          this.setState({
            translateResult: response
          })
          return
        }
      } else {
        const response = await baiduTranslate(this.summary)
        hide()

        const { trans_result: translateResult } = JSON.parse(response)
        if (Array.isArray(translateResult)) {
          this.setState({
            translateResult
          })
          return
        }
      }

      info(errorInfo)
    } catch (error) {
      if (hide) hide()

      info(errorInfo)
    }
  }

  /** 翻译曲目 */
  doDiscTranslate = async () => {
    if (this.state.discTranslateResult.length) return

    t('条目.翻译曲目', {
      subjectId: this.subjectId
    })

    const discTitle = []
    this.disc.forEach(item => {
      item.disc.forEach((i, index) => {
        discTitle.push(i.title.replace(`${index + 1} `, ''))
      })
    })

    let hide: () => void
    try {
      hide = loading('请求中...')

      // 曲目翻译使用 DeepLX 效果不好, 暂不进行接入
      const response = await baiduTranslate(discTitle.join('\n'))
      hide()

      const { trans_result: discTranslateResult } = JSON.parse(response)
      if (Array.isArray(discTranslateResult)) {
        this.setState({
          discTranslateResult
        })
        return
      }
      info('翻译失败, 请重试')
    } catch (error) {
      if (hide) hide()
      info('翻译失败, 请重试')
    }
  }

  /** 导出放送日程 ics */
  doExportCalenderEventICS = async () => {
    const eps = (this.subject.eps || []).filter(item => item.type === 0)
    if (eps.length) {
      const eps =
        this.subject.eps.length >= 100
          ? this.subject.eps.filter(item => item.status === 'NA')
          : this.subject.eps
      if (!eps.length) {
        info('没有数据')
        return
      }

      const onAir = this.onAirCustom
      const ics = [
        'BEGIN:VCALENDAR',
        'PRODID:-//Bangumi//Anime Calendar//CN',
        'VERSION:2.0',
        'METHOD:PUBLISH',
        'CALSCALE:GREGORIAN',
        'X-WR-CALNAME:Bangumi放送日程',
        'X-APPLE-CALENDAR-COLOR:#FE8A95'
      ]
      eps.forEach(item => {
        const { DTSTART, DTEND } = genICSCalenderEventDate(item, onAir)

        let desc = `https://bgm.tv/ep/${item.id}`
        if (item.name_cn || item.name) desc += ` (${item.name_cn || item.name})`

        ics.push(
          'BEGIN:VEVENT',
          `UID:${this.subjectId}-${item.id}`,
          'TZID:Asia/Shanghai',
          `DTSTART:${DTSTART}`,
          `DTEND:${DTEND}`,
          `SUMMARY:${cnjp(this.subject.name_cn, this.subject.name)} ep.${item.sort}`,
          `DESCRIPTION:${desc}`,
          'TRANSP:OPAQUE',
          'END:VEVENT'
        )
      })
      ics.push('END:VCALENDAR')

      const { data } = await temp(`${this.userId}_${this.subjectId}.ics`, ics.join('\n'), -1)
      if (!data?.downloadKey) {
        info('未知错误，生成ics失败，重试或联系作者')
        return false
      }

      t('条目.导出日程', {
        subjectId: this.subjectId,
        userId: this.userId
      })

      open(download(data.downloadKey))
    }
  }

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

    if (this.subjectComments.list.length <= 20) {
      this.setState({
        chatLoading: true
      })
      await this.fetchSubjectComments()
    }

    const roleSystem = `以下是条目《${this.cn}》（可提及），当前全站评分为${
      this.rating.score || '-'
    }，其中最近班友的吐槽（每个换行为一个，若班友进行过评分在最前方使用了中括号标记，满分为十分），请总结条目当前的风评，但请勿剧透：`

    let roleUser = ''

    // 适当打乱数据, 让结果能呈现更多的不同
    getRandomItems(
      this.subjectComments.list.filter(item => !(item.avatar || '').includes('icon.jpg')),
      20
    ).forEach(item => {
      roleUser += `\n${item.star ? `[${item.star}分] ` : ''}${removeSlogan(
        getPlainText(item.comment.slice(0, 32))
      )}`
    })

    this.setState({
      chatLoading: true
    })
    const value = await completions(
      `${MUSUME_PROMPT[musumePrompt]}${MUSUME_SUBJECT_PROMPT}`,
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
