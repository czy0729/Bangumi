/*
 * @Author: czy0729
 * @Date: 2023-02-27 20:23:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-21 21:39:36
 */
import { getCoverSrc } from '@components/cover/utils'
import { collectionStore, userStore } from '@stores'
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
  getCalenderEventTitle,
  HTMLDecode,
  info,
  loading,
  open,
  queue,
  saveCalenderEvent,
  sleep,
  updateVisibleBottom
} from '@utils'
import { calendarEventsRequestPermissions, calendarGetEventsAsync } from '@utils/calendar'
import { t } from '@utils/fetch'
import { download, temp } from '@utils/kv'
import { webhookCollection, webhookEp } from '@utils/webhooks'
import {
  IMG_WIDTH,
  IOS,
  MODEL_COLLECTION_STATUS,
  MODEL_EP_STATUS,
  MODEL_SUBJECT_TYPE,
  SITE_AGEFANS
} from '@constants'
import { EpId, EpStatus, Id, Navigation, RatingStatus, SubjectId } from '@types'
import { EpsItem, TabsLabel } from '../types'
import { OriginItem, replaceOriginUrl } from '../../../user/origin-setting/utils'
import Fetch from './fetch'
import {
  EXCLUDE_STATE,
  NAMESPACE,
  STATE,
  TEXT_ADD_REMINDER,
  TEXT_COLLAPSE_ALL,
  TEXT_EXPAND_ALL,
  TEXT_EXPORT_SCHEDULE,
  TEXT_PIN,
  TEXT_UNPIN
} from './ds'

export default class Action extends Fetch {
  /** 标签页切换 */
  onChange = (page: number) => {
    const renderedTabsIndex = [...this.state.renderedTabsIndex]
    if (!renderedTabsIndex.includes(page)) renderedTabsIndex.push(page)

    const state: {
      page: number
      grid?: typeof STATE.grid
      renderedTabsIndex: number[]
    } = {
      page,
      renderedTabsIndex
    }

    // 游戏需要初始化 state.grid
    if (this.tabs[page]?.key === 'game') state.grid = STATE.grid
    this.setState(state)
    this.save()

    t('首页.标签页切换', {
      page
    })
  }

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
  selectGirdSubject = (subjectId: SubjectId, grid?: typeof STATE.grid) => {
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

  scrollToIndex = {}

  /** 底部 TabBar 再次点击滚动到顶并刷新数据 */
  forwardRef = (
    ref: {
      scrollToIndex: any
    },
    title: TabsLabel
  ) => {
    const index = this.tabs.findIndex(item => item.title === title)
    if (!this.scrollToIndex[index] && ref?.scrollToIndex) {
      this.scrollToIndex[index] = ref?.scrollToIndex
    }
  }

  /** 在线源头选择 */
  onlinePlaySelected = (label: string, subjectId: SubjectId) => {
    const { name_cn, name, type } = this.subject(subjectId)

    t('首页.搜索源', {
      type: label,
      subjectId,
      subjectType: type
    })

    try {
      let url: string

      // 匹配用户自定义源头
      if (!url) {
        const find = this.onlineOrigins(subjectId).find(item =>
          typeof item === 'object' ? item.name === label : false
        ) as OriginItem
        if (find) {
          if (label === '萌番组' && find.id) {
            copy(HTMLDecode(name_cn || name))
            setTimeout(() => {
              open(find.url)
            }, 1600)
            return
          }

          url = replaceOriginUrl(find.url, {
            CN: HTMLDecode(name_cn || name),
            JP: HTMLDecode(name || name_cn),
            ID: subjectId
          })
        }
      }

      if (!url) {
        const bangumiInfo = this.bangumiInfo(subjectId)
        const { sites = [] } = bangumiInfo
        const cn = HTMLDecode(name_cn || name)
        let item: {
          site: string
          id: Id
          url?: string
        }

        switch (label) {
          case 'AGE动漫':
            url = `${SITE_AGEFANS()}/search?query=${encodeURIComponent(cn)}&page=1`
            break

          default:
            item = sites.find(item => item.site === label)
            if (item) url = getBangumiUrl(item)
            break
        }
      }

      if (url) open(url)
    } catch (error) {
      console.error(NAMESPACE, 'onlinePlaySelected', error)
    }
  }

  /** 页面筛选文字变化 */
  onFilterChange = debounce((filter: string) => {
    const { page } = this.state
    this.setState({
      filter: filter.trim(),
      filterPage: page
    })
  }, 800)

  /** 菜单点击 */
  onPopover = (label: string, subjectId: SubjectId) => {
    const actions = this.actions(subjectId)
    if (actions.length) {
      const find = actions.find(item => item.name === label)
      if (find) {
        open(find.url, true)

        t('其他.自定义跳转', {
          from: 'HomeTab',
          key: `${subjectId}|${find.name}|${find.url}`
        })
        return
      }
    }

    switch (label) {
      case TEXT_PIN:
        this.itemToggleTop(subjectId, true)
        break

      case TEXT_UNPIN:
        this.itemToggleTop(subjectId, false)
        break

      case TEXT_EXPAND_ALL:
        this.expandAll()
        break

      case TEXT_COLLAPSE_ALL:
        this.closeAll()
        break

      case TEXT_ADD_REMINDER:
        this.doBatchSaveCalenderEvent(subjectId)
        break

      case TEXT_EXPORT_SCHEDULE:
        this.doExportCalenderEventICS(subjectId)
        break

      default:
        this.onlinePlaySelected(label, subjectId)
        break
    }
  }

  private _flipTimeoutId = null

  /** 章节按钮做动画前, 需要先设置开启 */
  prepareEpsFlip = (subjectId: SubjectId) => {
    if (this._flipTimeoutId) clearTimeout(this._flipTimeoutId)

    this.setState({
      flip: subjectId
    })

    this._flipTimeoutId = setTimeout(() => {
      this.afterEpsFlip()
    }, 8000)
  }

  /** 章节按钮完成动画后, 需要设置关闭才能做下一次动画 */
  afterEpsFlip = debounce(() => {
    if (this._flipTimeoutId) {
      clearTimeout(this._flipTimeoutId)
      this._flipTimeoutId = null
    }

    this.setState({
      flip: 0
    })
  })

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)

  /** -------------------- action -------------------- */
  /** 管理收藏 */
  doUpdateCollection = async (values: Parameters<typeof collectionStore.doUpdateCollection>[0]) => {
    t('首页.管理收藏', {
      subjectId: values.subjectId
    })

    await collectionStore.doUpdateCollection(values)
    feedback()

    // 不是在看的话要删掉对应条目信息
    if (values.status !== MODEL_COLLECTION_STATUS.getValue<RatingStatus>('在看')) {
      userStore.removeCollection(values.subjectId)
    }

    this.closeManageModal()
    webhookCollection(values, this.subject(values.subjectId), userStore.userInfo)
  }

  /** 观看下一章节 */
  doWatchedNextEp = async (subjectId: SubjectId) => {
    const state = this.$Item(subjectId)
    if (state.doing) {
      /**
       * 若干秒后没有状态变化强制还原, 以避免网络出错导致没有复原
       * 也有可能是上次在请求时, 销毁了程序导致保存了错误的状态
       */
      setTimeout(() => {
        const state = this.$Item(subjectId)
        if (state.doing) {
          this.setState({
            item: {
              [subjectId]: {
                ...state,
                doing: false
              }
            }
          })
        }
      }, 2000)
      return
    }

    this.setState({
      item: {
        [subjectId]: {
          ...state,
          doing: true
        }
      }
    })

    // 更新最新章节数据
    await this.fetchUserProgress(subjectId)
    t('首页.观看下一章节', {
      subjectId
    })
    this.prepareEpsFlip(subjectId)

    const { id } = this.nextWatchEp(subjectId)
    await userStore.doUpdateEpStatus({
      id,
      status: MODEL_EP_STATUS.getValue<EpStatus>('看过')
    })

    this.setState({
      item: {
        [subjectId]: {
          ...state,
          doing: false
        }
      }
    })
    userStore.fetchCollectionSingle(subjectId, undefined, true)

    // 震动反馈是使用翻转按钮触发的, 若没有展开则没有渲染按钮组件, 需要主动触发
    if (state.expand) {
      this.fetchUserProgress(subjectId)
    } else {
      await this.fetchUserProgress(subjectId)
      feedback()
    }

    webhookEp(
      {
        status: 'watched',
        id,
        batch: false
      },
      this.subject(subjectId),
      userStore.userInfo
    )
  }

  /** 更新书籍下一个章节 */
  doUpdateNext = (
    subjectId: SubjectId,
    epStatus?: string | number,
    volStatus?: string | number
  ) => {
    t('首页.更新书籍下一个章节', {
      subjectId
    })

    collectionStore.doUpdateSubjectEp(
      {
        subjectId,
        watchedEps: epStatus,
        watchedVols: volStatus
      },
      () => {
        feedback()
        userStore.fetchCollectionSingle(subjectId)
        webhookEp(
          {
            status: 'watched',
            sort: epStatus,
            vols: volStatus,
            batch: false
          },
          this.subject(subjectId),
          userStore.userInfo
        )
      }
    )
  }

  /** 章节更新统一入口 */
  doUpdateEp = async (value: string | number, item: EpsItem, subjectId: SubjectId) => {
    try {
      this.prepareEpsFlip(subjectId)

      collectionStore.doUpdateSubjectEp(
        {
          subjectId,
          watchedEps: value
        },
        () => {
          userStore.fetchCollectionSingle(subjectId)
          this.fetchUserProgress(subjectId)
          webhookEp(
            {
              ...item,
              status: 'watched',
              batch: true
            },
            this.subject(subjectId),
            userStore.userInfo
          )
        }
      )
    } catch (error) {
      console.error(NAMESPACE, 'doUpdateEp', error)
    }
  }

  /** 更新收视进度 */
  doUpdateEpStatus = async (value: string | number, item: EpsItem, subjectId: SubjectId) => {
    const status = MODEL_EP_STATUS.getValue<EpStatus>(value)
    t('首页.章节菜单操作', {
      title: '更新收视进度',
      subjectId,
      status
    })

    this.prepareEpsFlip(subjectId)
    await userStore.doUpdateEpStatus({
      id: item.id,
      status
    })
    userStore.fetchCollectionSingle(subjectId, undefined, value === '看过')
    this.fetchUserProgress(subjectId)

    webhookEp(
      {
        ...item,
        status,
        batch: false
      },
      this.subject(subjectId),
      userStore.userInfo
    )
  }

  /** 批量更新收视进度 */
  doUpdateSubjectWatched = async (item: EpsItem, subjectId: SubjectId) => {
    t('首页.章节菜单操作', {
      title: '批量更新收视进度',
      subjectId
    })

    const eps = (this.eps(subjectId) || [])
      .slice()
      .sort((a, b) => asc(a, b, item => item.sort || 0))
    let sort: number

    // 从小于 10 开始的番剧都认为是非多季番, 直接使用正常 sort 去更新
    if (eps?.[0]?.sort < 10) {
      sort = Math.max(item.sort, 0)
    } else {
      // 因 this.eps 是分页后的结果, 所以需要从原始数据中获取
      const eps = this.epsNoSp(subjectId)

      // 多季度非 1 开始的番 (如巨人第三季) 不能直接使用 sort,
      // 需要把 sp 去除后使用当前 item.sort 查找 index
      if (eps?.[0]?.sort > 10) {
        sort = eps.findIndex(i => i.sort === item.sort)
      } else {
        // 正常的多章节番剧
        sort = eps.find(i => i.sort === item.sort)?.sort
      }
    }

    if (sort === -1) {
      sort = item.sort
    } else if (this.epsNoSp(subjectId)?.[0]?.sort !== 1) {
      // 原始章节第一个不是从 1 开始的, 才需要 +1
      sort += 1
    }

    // [待迁移] 老 API 不支持任何 NSFW 的修改
    if (this.subject(subjectId)?.v0) {
      this.doUpdateEp(sort, item, subjectId)
      return
    }

    this.prepareEpsFlip(subjectId)
    await userStore.doUpdateSubjectWatched({
      subjectId,
      sort
    })
    userStore.fetchCollectionSingle(subjectId)
    this.fetchUserProgress(subjectId)

    webhookEp(
      {
        ...item,
        status: 'watched',
        batch: true
      },
      this.subject(subjectId),
      userStore.userInfo
    )
  }

  /** 本集讨论 */
  toEp = (item: EpsItem, subjectId: SubjectId, navigation: Navigation) => {
    t('首页.章节菜单操作', {
      title: '本集讨论',
      subjectId
    })

    // 数据占位
    const subject = this.subject(subjectId)
    appNavigate(
      item.url || `/ep/${item.id}`,
      navigation,
      {
        _title: `ep${item.sort}.${item.name || item.name_cn}`,
        _group: subject.name || subject.name_cn,
        _groupThumb: getCoverSrc((subject.images || {})?.medium, IMG_WIDTH),
        _desc: `时长:${item.duration} / 首播:${item.airdate}<br />${(item.desc || '').replace(
          /\r\n/g,
          '<br />'
        )}`
      },
      {
        id: '首页.跳转'
      }
    )
  }

  /** 章节菜单操作 */
  doEpsSelect = async (
    value: string,
    item: EpsItem,
    subjectId: SubjectId,
    navigation: Navigation
  ) => {
    const status = MODEL_EP_STATUS.getValue<EpStatus>(value)
    if (status) {
      this.doUpdateEpStatus(value, item, subjectId)
      return
    }

    if (value === '看到') {
      if (item?.sort > 24) {
        confirm(`确认看到${item.sort}集?`, () => {
          this.doUpdateSubjectWatched(item, subjectId)
        })
        return
      }

      this.doUpdateSubjectWatched(item, subjectId)
      return
    }

    // iOS 是本集讨论, 安卓是 (+N)...
    if (value.includes('本集讨论') || value.includes('(+')) {
      this.toEp(item, subjectId, navigation)
      return
    }

    if (value === '添加提醒') {
      this.doSaveCalenderEvent(item, subjectId)
      return
    }
  }

  /** @deprecated 章节按钮长按 */
  doEpsLongPress = async (
    {
      id
    }: {
      id: EpId
    },
    subjectId: SubjectId
  ) => {
    t('首页.章节按钮长按', {
      subjectId
    })

    const userProgress = this.userProgress(subjectId)
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

    userStore.fetchCollectionSingle(subjectId)
    this.fetchUserProgress(subjectId)
  }

  /** 添加日历 */
  doSaveCalenderEvent = (item: EpsItem, subjectId: SubjectId) => {
    const subject = this.subject(subjectId)
    saveCalenderEvent(item, cnjp(subject.name_cn, subject.name), this.onAirCustom(subjectId))

    t('其他.添加日历', {
      subjectId,
      sort: item?.sort || 0,
      from: 'Home'
    })
    return
  }

  /** 批量添加提醒 */
  doBatchSaveCalenderEvent = async (subjectId: SubjectId) => {
    const eps = this.epsNoSp(subjectId)
    if (eps.length) {
      const subject = this.subject(subjectId)
      const eps = subject.eps.filter(item => item.status === 'NA')
      if (!eps.length) {
        info('已没有未放送的章节')
        return
      }

      const data = await calendarEventsRequestPermissions()
      if (data !== 'authorized') {
        info('权限不足')
        return
      }

      const title = cnjp(subject.name_cn, subject.name)
      confirm(
        `「${title}」\n是否一键添加 ${eps.length} 个章节的提醒?`,
        async () => {
          const onAir = this.onAirCustom(subjectId)
          const fns = []
          const hide = loading()
          const calendarTitles = await calendarGetEventsAsync()
          eps.forEach(item => {
            // 日历中相同的标题不再添加日程
            if (!calendarTitles.includes(getCalenderEventTitle(item, title))) {
              fns.push(async () => {
                await sleep(IOS ? 80 : 480)
                saveCalenderEvent(item, title, onAir, false)
                return true
              })
            }
          })

          await queue(fns, 1)
          hide()
          info('已完成')
          feedback()

          t('其他.批量添加日历', {
            subjectId,
            length: fns.length
          })
        },
        '一键添加放送提醒'
      )
    }
  }

  /** 导出放送日程 ics */
  doExportCalenderEventICS = async (subjectId: SubjectId) => {
    const eps = this.epsNoSp(subjectId)
    if (eps.length) {
      const subject = this.subject(subjectId)
      const eps =
        subject.eps.length >= 100 ? subject.eps.filter(item => item.status === 'NA') : subject.eps
      if (!eps.length) {
        info('没有数据')
        return
      }

      const onAir = this.onAirCustom(subjectId)
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
          `UID:${subjectId}-${item.id}`,
          'TZID:Asia/Shanghai',
          `DTSTART:${DTSTART}`,
          `DTEND:${DTEND}`,
          `SUMMARY:${cnjp(subject.name_cn, subject.name)} ep.${item.sort}`,
          `DESCRIPTION:${desc}`,
          'TRANSP:OPAQUE',
          'END:VEVENT'
        )
      })
      ics.push('END:VCALENDAR')

      const { data } = await temp(`${this.userId}_${subjectId}.ics`, ics.join('\n'), -1)
      if (!data?.downloadKey) {
        info('未知错误，生成ics失败，重试或联系作者')
        return false
      }

      t('首页.导出日程', {
        subjectId,
        userId: this.userId
      })

      open(download(data.downloadKey))
    }
  }
}
