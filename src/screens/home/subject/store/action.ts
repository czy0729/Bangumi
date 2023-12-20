/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-20 08:54:32
 */
import {
  _,
  calendarStore,
  collectionStore,
  otaStore,
  rakuenStore,
  systemStore,
  userStore,
  usersStore,
  uiStore
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
  getSPAParams,
  info,
  loading,
  open,
  saveCalenderEvent,
  showActionSheet
} from '@utils'
import { t, baiduTranslate } from '@utils/fetch'
import { s2t } from '@utils/thirdParty/cn-char'
import { download, temp } from '@utils/kv'
import { webhookCollection, webhookEp } from '@utils/webhooks'
import axios from '@utils/thirdParty/axios'
import {
  CDN_OSS_SUBJECT,
  HOST,
  HOST_CDN,
  LIKE_TYPE_TIMELINE,
  MODEL_COLLECTION_STATUS,
  MODEL_EP_STATUS,
  SITES,
  SITE_AGEFANS,
  SITE_MANHUADB,
  SITE_WK8,
  STORYBOOK,
  URL_SPA
} from '@constants'
import i18n from '@constants/i18n'
import { EpStatus, Id, Navigation, RatingStatus, UserId } from '@types'
import { OriginItem, replaceOriginUrl } from '../../../user/origin-setting/utils'
import Fetch from './fetch'
import { NAMESPACE } from './ds'

export default class Action extends Fetch {
  /** 显示收藏管理 */
  showManageModel = () => {
    t('条目.显示收藏管理', {
      subjectId: this.subjectId
    })

    this.setState({
      visible: true
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
    t('条目.章节倒序', {
      subjectId: this.subjectId
    })

    const { epsReverse } = this.state
    this.setState({
      epsReverse: !epsReverse
    })
    this.save()
  }

  /** 吐槽倒序 */
  toggleReverseComments = () => {
    t('条目.吐槽倒序', {
      subjectId: this.subjectId
    })

    const { _reverse } = this.subjectComments
    this.fetchSubjectComments(true, !_reverse)
  }

  /** 书籍章节输入框改变 */
  changeText = (name: string, text: string) => {
    t('条目.书籍章节输入框改变', {
      subjectId: this.subjectId
    })

    try {
      this.setState({
        [name]: String(text)
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

      // AGE动漫，有自维护id数据，优先匹配
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
        const find = this.onlineOrigins.find(
          (item: OriginItem) => item.name === key
        ) as OriginItem
        if (find) {
          if (key === '萌番组' && find.id) {
            copy(this.cn || this.jp)
            setTimeout(() => {
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
        let item
        switch (key) {
          case 'AGE动漫':
            url = `${SITE_AGEFANS()}/search?query=${encodeURIComponent(
              this.cn || this.jp
            )}&page=1`
            break

          case 'Anime1':
            url = `https://anime1.me/?s=${encodeURIComponent(s2t(this.cn || this.jp))}`
            break

          case '奇奇动漫':
            url = `https://www.qiqidongman.com/vod-search-wd-${encodeURIComponent(
              this.cn || this.jp
            )}.html`
            break

          case 'Hanime1':
            url = `https://hanime1.me/search?query=${encodeURIComponent(
              this.jp || this.cn
            )}`
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

  open = (url: string) => {
    if (url) {
      const { openInfo } = systemStore.setting
      if (openInfo) copy(url, '已复制地址，即将跳转')
      setTimeout(
        () => {
          open(url)
        },
        openInfo ? (STORYBOOK ? 400 : 1600) : 0
      )
    }
  }

  /** 漫画源头选择 */
  onlineComicSelected = (key: string) => {
    try {
      t('条目.搜索源', {
        type: key,
        subjectId: this.subjectId,
        subjectType: this.type
      })

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
    } catch (error) {
      console.error(NAMESPACE, 'onlineComicSelected', error)
    }
  }

  /** 音乐源头选择 */
  onlineDiscSelected = (key: string) => {
    try {
      t('条目.搜索源', {
        type: key,
        subjectId: this.subjectId,
        subjectType: this.type
      })

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
    } catch (error) {
      console.error(NAMESPACE, 'onlineDiscSelected', error)
    }
  }

  /** 游戏源头选择 */
  onlineGameSelected = (key: string) => {
    try {
      t('条目.搜索源', {
        type: key,
        subjectId: this.subjectId,
        subjectType: this.type
      })

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
    } catch (error) {
      console.error(NAMESPACE, 'onlineGameSelected', error)
    }
  }

  /** 去漫画DB */
  toManhuadb = () => {
    const { mangaId } = this.source || {}
    t('条目.阅读漫画', {
      subjectId: this.subjectId,
      mid: mangaId
    })

    const url = `${SITE_MANHUADB()}/manhua/${mangaId}`
    this.open(url)
  }

  /** 去文库8 */
  toWenku8 = () => {
    const { wenkuId } = this.source || {}
    t('条目.阅读轻小说', {
      subjectId: this.subjectId,
      wid: wenkuId
    })

    const url = `${SITE_WK8()}/novel/${Math.floor(wenkuId / 1000)}/${wenkuId}/index.htm`
    this.open(url)
  }

  /** 前往 PSNINE 查看游戏奖杯 */
  toPSNINE = () => {
    t('条目.查看奖杯', {
      subjectId: this.subjectId
    })

    open(`https://psnine.com/psngame?title=${encodeURIComponent(this.cn || this.jp)}`)
  }

  /** 设置章节筛选 */
  updateFilterEps = (key: string) => {
    let filterEps = parseInt(key.match(/\d+/g)[0])
    if (filterEps === 1) filterEps = 0

    t('条目.设置章节筛选', {
      subjectId: this.subjectId,
      filterEps
    })

    this.setState({
      filterEps
    })
    this.save()
  }

  /** 筛选分数 */
  filterScores = (label: string) => {
    t('条目.筛选分数', {
      subjectId: this.subjectId,
      label
    })

    this.setState({
      filterScores: label === '全部' ? [] : label.split('-')
    })
    this.save()
  }

  /** 去用户评分页面 */
  toRating = (navigation: Navigation, from?: string, status?: '' | RatingStatus) => {
    t('条目.跳转', {
      to: 'Rating',
      from,
      subjectId: this.subjectId,
      status
    })

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
  }

  /** 展开收起功能块 */
  onSwitchBlock = (key: Parameters<typeof systemStore.switchSetting>[0]) => {
    t('条目.展开收起功能块', {
      key
    })

    systemStore.switchSetting(key)
  }

  /** 展开收起功能块 */
  hiddenBlock = (key: Parameters<typeof systemStore.switchSetting>[0]) => {
    t('条目.展开收起功能块', {
      key: `${key} | -1`
    })

    systemStore.setSetting(key, -1)
  }

  /** 用于延迟底部块渲染 (优化条目页面进入渲染时, 同时渲染过多块导致掉帧的问题) */
  setRendered = () => {
    const { rendered } = this.state
    if (!rendered) {
      this.setState({
        visibleBottom: _.window.height * 1.5,
        rendered: true
      })
    }
  }

  unRendered = () => {
    const { rendered } = this.state
    if (rendered) {
      this.setState({
        visibleBottom: 0,
        rendered: false
      })
    }
  }

  /** 显示 / 关闭管理目录模态框 */
  toggleFolder = () => {
    if (!this.isLogin) {
      info(`请先${i18n.login()}`)
      return
    }

    const { folder } = this.state
    this.setState({
      folder: !folder
    })

    if (!folder) {
      t('条目.管理目录', {
        subjectId: this.subjectId
      })
    }
  }

  /** 自定义放送时间 */
  onSelectOnAir = (weekDayCN: string | number, timeCN: string) => {
    t('条目.自定义放送', {
      subjectId: this.subjectId
    })
    calendarStore.updateOnAirUser(this.subjectId, weekDayCN, timeCN)
  }

  /** 重置条目的自定义放送时间 */
  resetOnAirUser = () => {
    t('条目.重置放送', {
      subjectId: this.subjectId
    })
    calendarStore.resetOnAirUser(this.subjectId)
  }

  /** 自定义跳转点击回调 */
  onActionsPress = (title: string, navigation: Navigation) => {
    if (title === '跳转管理') {
      navigation.push('Actions', {
        subjectId: this.subjectId,
        name: this.cn || this.jp
      })
      return true
    }

    const find = this.actions.find(item => item.name === title)
    if (find) {
      open(find.url, true)

      t('其他.自定义跳转', {
        from: 'Subject',
        key: `${this.subjectId}|${find.name}|${find.url}`
      })
      return true
    }

    return false
  }

  /** 屏蔽用户 */
  addBlockUser = (values: { avatar: string; userId: UserId; userName: string }) => {
    confirm(
      `屏蔽来自 ${values?.userName}@${values?.userId} 的包括条目评论、时间胶囊、超展开相关信息，确定?`,
      () => {
        t('条目.屏蔽用户', {
          userId: values.userId
        })

        rakuenStore.addBlockUser(`${values.userName}@${values.userId}`)
        info(`已屏蔽 ${values.userName}`)
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
    if (!userData?.userId) {
      return false
    }

    if (title === '贴贴') {
      if (!this.isLogin) {
        info('请先登录')
        return false
      }

      return uiStore.showLikesGrid(
        this.subjectId,
        relatedId,
        userStore.formhash,
        LIKE_TYPE_TIMELINE,
        {
          recommandPosition: 'top'
        }
      )
    }

    if (title === '复制评论') {
      this.onCopyComment(userData, comment)
      return
    }

    if (title === '屏蔽用户') {
      this.addBlockUser(userData)
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
    title: string,
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
    copy(comment, `已复制 ${userData?.userName} 的评论`)
    feedback()
  }

  /** 拼图分享 */
  onPostShare = async (navigation: Navigation) => {
    if (!navigation) return

    const { images } = this.subject
    let src = CDN_OSS_SUBJECT(getCoverMedium(images?.common))
    if (!src.includes(HOST_CDN)) src = getCoverLarge(images?.common)

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
        .filter((item, index) => index <= 4)
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
    copy(
      `【链接】${cnjp(this.cn, this.jp)} | Bangumi番组计划\n${url}`,
      '已复制 APP 网页版地址'
    )
    setTimeout(() => {
      open(url)
    }, 1600)

    t('条目.拼图分享', {
      subjectId: this.subjectId,
      spa: true
    })
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
    setTimeout(() => {
      this.setState({
        flipKey: flipKey + 1
      })
    }, 400)
  }

  /** Eps 状态按钮做动画前, 需要先设置开启 */
  prepareEpsFlip = () => {
    this.setState({
      flipEps: true
    })
  }

  /** Eps 状态按钮完全动画后, 需要设置关闭才能做下一次动画 */
  afterEpsFlip = debounce(() => {
    this.setState({
      flipEps: false
    })
  })

  /** 更新可视范围底部 y */
  onScroll = ({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement } = nativeEvent
    const screenHeight = layoutMeasurement.height
    const visibleBottom = contentOffset.y + screenHeight
    if (visibleBottom <= (this.state.visibleBottom || 0)) return

    this.setState({
      visibleBottom: visibleBottom + _.window.height * 0.5
    })
  }

  // -------------------- action --------------------
  /** 管理收藏 */
  doUpdateCollection = async (
    values: Parameters<typeof collectionStore.doUpdateCollection>[0]
  ) => {
    t('条目.管理收藏', {
      subjectId: this.subjectId
    })

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
    } catch (error) {
      console.error(NAMESPACE, 'doUpdateCollection', error)
    }

    this.setState({
      disabled: false
    })
  }

  /** 章节菜单操作 */
  doEpsSelect = async (
    value: string,
    item: Partial<{
      url: any
      id: Id
      sort: number
      name: any
      name_cn: any
      duration: any
      airdate: any
      desc: any
      type: number
    }>,
    navigation?: Navigation
  ) => {
    try {
      // iOS 是本集讨论, 安卓是 (+N)...
      if (value.includes('本集讨论') || value.includes('(+')) {
        t('条目.章节菜单操作', {
          title: '本集讨论',
          subjectId: this.subjectId
        })

        // 数据占位
        appNavigate(
          item.url || `/ep/${item.id}`,
          navigation,
          {
            _title: `ep${item.sort}.${item.name || item.name_cn}`,
            _group: this.subject.name || this.subject.name_cn,
            _groupThumb: getCoverMedium((this.subject.images || {})?.medium),
            _desc: `时长:${item.duration} / 首播:${item.airdate}<br />${(
              item.desc || ''
            ).replace(/\r\n/g, '<br />')}`
          },
          {
            id: '条目.跳转',
            data: {
              from: '章节',
              subjectId: this.subjectId
            }
          }
        )
        return
      }

      if (value === '正版播放') {
        setTimeout(() => {
          showActionSheet(this.onlinePlayActionSheetData, index => {
            t('条目.章节菜单操作', {
              title: this.onlinePlayActionSheetData[index],
              subjectId: this.subjectId
            })

            const isSp = item.type === 1
            let url

            // @todo 逻辑比较复杂, 暂时不处理EP偏移
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
                epIndex = eps
                  .filter(item => item.type === 0)
                  .findIndex(i => i.id === item.id)
                url =
                  epsData[site][epIndex] ||
                  getBangumiUrl({
                    id: item.id,
                    site
                  })
              }
            }

            if (url) open(url)
          })
        }, 320)

        return
      }

      if (value === '添加提醒') {
        saveCalenderEvent(item, cnjp(this.cn, this.jp), this.onAirCustom)

        t('其他.添加日历', {
          subjectId: this.subjectId,
          sort: item?.sort || 0,
          from: 'Subject'
        })
        return
      }

      // 未收藏不能更改进度
      const { status = { name: '未收藏' } } = this.collection
      if (status.name !== '未收藏') {
        const status = MODEL_EP_STATUS.getValue<EpStatus>(value)
        if (status) {
          t('条目.章节菜单操作', {
            title: '更新收视进度',
            subjectId: this.subjectId,
            status
          })

          this.prepareEpsFlip()

          // 更新收视进度
          await userStore.doUpdateEpStatus({
            id: item.id,
            status
          })
          userStore.fetchUserCollection()
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
        }

        if (value === '看到') {
          t('条目.章节菜单操作', {
            title: '批量更新收视进度',
            subjectId: this.subjectId
          })

          /**
           * 批量更新收视进度
           * @issue 多季度非 1 开始的番不能直接使用 sort, 需要把 sp 去除后使用当前 item.sort 查找 index
           */
          const { eps = [] } = this.subject
          const sort = eps
            .filter(i => i.type === 0)
            .sort((a, b) => asc(a, b, item => item.sort || 0))
            .findIndex(i => i.sort === item.sort)

          let value: number
          if (sort === -1) {
            /**
             * @issue API bug, 多季度番剧使用item.sort不适用, 若item.sort > totalEps, 适用排序的index
             * @date 2022/02/12
             */
            const totalEps = Number(this.subjectFormHTML.totalEps)
            value = totalEps && item.sort >= totalEps ? sort + 1 : item.sort
          } else {
            value = sort + 1
          }

          this.prepareEpsFlip()

          await userStore.doUpdateSubjectWatched({
            subjectId: this.subjectId,
            sort: value
          })
          userStore.fetchUserCollection()
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
        return
      }

      info('收藏了才能管理哦')
    } catch (error) {
      console.error(NAMESPACE, 'doEpsSelect', error)
    }
  }

  /** 更新书籍下一个章节 */
  doUpdateNext = async (name: string | number) => {
    t('条目.更新书籍下一个章节', {
      subjectId: this.subjectId
    })

    const { chap, vol } = this.state
    const next = String(parseInt(this.state[name] || 0) + 1)
    const query = {
      subjectId: this.subjectId,
      chap,
      vol,
      [name]: next
    }

    // 20220414 x18 无效，待废弃，改用 doUpdateSubjectEp
    this.doUpdateEp(
      {
        eps: query.chap,
        vol: query.vol
      },
      true
    )
  }

  /** 更新书籍章节 */
  doUpdateBookEp = async () => {
    t('条目.更新书籍章节', {
      subjectId: this.subjectId
    })

    const { chap, vol } = this.state

    // 20220414 x18 无效，待废弃，改用 doUpdateEp
    this.doUpdateEp(
      {
        eps: chap,
        vol
      },
      true
    )
  }

  /** 输入框更新章节 */
  doUpdateSubjectEp = async () => {
    t('条目.输入框更新章节', {
      subjectId: this.subjectId
    })

    const { watchedEps } = this.state

    // 20220414 x18 无效，待废弃，改用 doUpdateEp
    this.doUpdateEp({
      eps: watchedEps
    })
  }

  /** 章节更新统一入口 */
  doUpdateEp = async (
    { eps, vol }: { eps?: any; vol?: any },
    isNeedFeedback: boolean = false
  ) => {
    try {
      this.prepareEpsFlip()

      collectionStore.doUpdateSubjectEp(
        {
          subjectId: this.subjectId,
          watchedEps: eps,
          watchedVols: vol
        },
        async () => {
          userStore.fetchUserCollection()
          await userStore.fetchUserProgress(this.subjectId)
          await this.fetchSubjectFromHTML()
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
    t('条目.章节按钮长按', {
      subjectId: this.subjectId
    })

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

      userStore.fetchUserCollection()
      userStore.fetchUserProgress(this.subjectId)
    } catch (error) {
      console.error(NAMESPACE, 'doEpsLongPress', error)
    }
  }

  /** 删除收藏 */
  doEraseCollection = async () => {
    const { formhash } = this.subjectFormHTML
    if (!formhash) return

    t('条目.删除收藏', {
      subjectId: this.subjectId
    })

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
        () => {},
        () => {
          setTimeout(() => {
            collectionStore.removeStatus(this.subjectId)
            this.fetchCollection()
            collectionStore.fetchCollectionStatusQueue([this.subjectId])

            // 不是在看的话要删掉对应条目信息
            userStore.removeCollection(this.subjectId)
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

    let hide: () => void
    try {
      hide = loading('请求中...')
      const response = await baiduTranslate(this.summary)
      hide()

      const { trans_result: translateResult } = JSON.parse(response)
      if (Array.isArray(translateResult)) {
        this.setState({
          translateResult
        })
        return
      }
      info('翻译失败, 请重试')
    } catch (error) {
      if (hide) hide()
      info('翻译失败, 请重试')
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

    let hide
    try {
      hide = loading('请求中...')
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

      const { data } = await temp(
        `${this.userId}_${this.subjectId}.ics`,
        ics.join('\n'),
        -1
      )
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
}
