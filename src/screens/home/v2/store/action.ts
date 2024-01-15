/*
 * @Author: czy0729
 * @Date: 2023-02-27 20:23:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 22:51:58
 */
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
  getCoverMedium,
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
  IOS,
  MODEL_COLLECTION_STATUS,
  MODEL_EP_STATUS,
  MODEL_SUBJECT_TYPE,
  SITE_AGEFANS
} from '@constants'
import {
  EpId,
  EpStatus,
  Id,
  Navigation,
  RatingStatus,
  Subject,
  SubjectId,
  SubjectTypeCn
} from '@types'
import { OriginItem, replaceOriginUrl } from '../../../user/origin-setting/utils'
import Fetch from './fetch'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class Action extends Fetch {
  /** 标签页切换 */
  onChange = (page: number) => {
    t('首页.标签页切换', {
      page
    })

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

    if (page === 4) state.grid = STATE.grid
    this.setState(state)
    this.save()
  }

  /** 显示收藏管理 Modal */
  showManageModal = (subjectId: SubjectId, modal?: typeof EXCLUDE_STATE.modal) => {
    t('首页.显示收藏管理', {
      subjectId
    })

    this.setState({
      visible: true,
      subjectId,
      modal: modal || EXCLUDE_STATE.modal // 游戏没有主动请求条目数据, 需要手动传递标题
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
    t('首页.展开或收起条目', {
      subjectId
    })

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
  }

  /** 置顶或取消置顶 Item */
  itemToggleTop = (subjectId: SubjectId, isTop?: boolean) => {
    t('首页.置顶或取消置顶', {
      subjectId,
      isTop
    })

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
  }

  /** 全部展开 (书籍不展开, 展开就收不回去了) */
  expandAll = () => {
    t('首页.全部展开')

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
  }

  /** 全部关闭 */
  closeAll = () => {
    t('首页.全部关闭')

    this.clearState('item')
    this.save()
  }

  /** 格子布局条目选择 */
  selectGirdSubject = (subjectId: SubjectId, grid?: typeof STATE.grid) => {
    t('首页.格子布局条目选择', {
      subjectId
    })

    this.setState({
      current: subjectId,
      grid: grid || STATE.grid
    })
    this.fetchSubject(subjectId)
    this.fetchUserProgress(subjectId)
    this.save()
  }

  scrollToIndex = {}

  /** 底部 TabBar 再次点击滚动到顶并刷新数据 */
  forwardRef = (
    ref: {
      scrollToIndex: any
    },
    index: string | number
  ) => {
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

  /** 跳转到条目页面 */
  onItemPress = (navigation: Navigation, subjectId: SubjectId, subject: Subject) => {
    t('首页.跳转', {
      to: 'Subject',
      from: 'list'
    })

    navigation.push('Subject', {
      subjectId,
      _jp: subject.name,
      _cn: subject.name_cn || subject.name,
      _image: subject?.images?.medium || '',
      _collection: '在看',
      _type: MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
    })
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
      case '置顶':
        this.itemToggleTop(subjectId, true)
        break

      case '取消置顶':
        this.itemToggleTop(subjectId, false)
        break

      case '全部展开':
        this.expandAll()
        break

      case '全部收起':
        this.closeAll()
        break

      case '一键添加提醒':
        this.doBatchSaveCalenderEvent(subjectId)
        break

      case '导出放送日程ICS':
        this.doExportCalenderEventICS(subjectId)
        break

      default:
        this.onlinePlaySelected(label, subjectId)
        break
    }
  }

  /** Eps 状态按钮做动画前, 需要先设置开启 */
  prepareEpsFlip = (subjectId: SubjectId) => {
    this.setState({
      flip: subjectId
    })
  }

  /** Eps 状态按钮完全动画后, 需要设置关闭才能做下一次动画 */
  afterFlipEps = debounce(() => {
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
  doUpdateNext = (subjectId: SubjectId, epStatus?: string, volStatus?: string) => {
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

  /** 章节菜单操作 */
  doEpsSelect = async (
    value: string,
    item: {
      id: any
      sort: number
      url: any
      name: any
      name_cn: any
      duration: any
      airdate: any
      desc: any
    },
    subjectId: SubjectId,
    navigation: Navigation
  ) => {
    if (value === '添加提醒') {
      const subject = this.subject(subjectId)
      saveCalenderEvent(item, cnjp(subject.name_cn, subject.name), this.onAirCustom(subjectId))

      t('其他.添加日历', {
        subjectId,
        sort: item?.sort || 0,
        from: 'Home'
      })
      return
    }

    const status = MODEL_EP_STATUS.getValue<EpStatus>(value)
    if (status) {
      t('首页.章节菜单操作', {
        title: '更新收视进度',
        subjectId,
        status
      })

      this.prepareEpsFlip(subjectId)

      // 更新收视进度
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

    if (value === '看到') {
      t('首页.章节菜单操作', {
        title: '批量更新收视进度',
        subjectId
      })

      // 批量更新收视进度
      const eps = (this.eps(subjectId) || [])
        .slice()
        .sort((a, b) => asc(a, b, item => item.sort || 0))
      let sort: number

      // 从小于 10 开始的番剧都认为是非多季番, 直接使用正常 sort 去更新
      if (eps?.[0]?.sort < 10) {
        sort = Math.max(item.sort - 1, 0)
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

      this.prepareEpsFlip(subjectId)
      await userStore.doUpdateSubjectWatched({
        subjectId,
        sort: sort === -1 ? item.sort : sort + 1
      })
      userStore.fetchCollectionSingle(subjectId)
      this.fetchUserProgress(subjectId)
      webhookEp(
        {
          ...item,
          status,
          batch: true
        },
        this.subject(subjectId),
        userStore.userInfo
      )
    }

    // iOS 是本集讨论, 安卓是 (+N)...
    if (value.includes('本集讨论') || value.includes('(+')) {
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
          _groupThumb: getCoverMedium((subject.images || {})?.medium),
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
