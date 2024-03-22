/*
 * @Author: czy0729
 * @Date: 2019-04-27 13:09:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-22 06:50:40
 */
import { computed, observable } from 'mobx'
import { _, rakuenStore, systemStore, userStore } from '@stores'
import { confirm, feedback, info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import store from '@utils/store'
import {
  LIMIT_TOPIC_PUSH,
  MODEL_RAKUEN_TYPE,
  MODEL_RAKUEN_TYPE_GROUP,
  MODEL_RAKUEN_TYPE_MONO,
  URL_DEFAULT_AVATAR
} from '@constants'
import {
  Navigation,
  RakuenType,
  RakuenTypeGroup,
  RakuenTypeGroupCn,
  RakuenTypeMono,
  RakuenTypeMonoCn,
  TopicId
} from '@types'
import {
  EXCLUDE_STATE,
  INIT_PREFETCH_STATE,
  NAMESPACE,
  PREFETCH_COUNT,
  STATE,
  TABS,
  TEXT_BLOCK_USER,
  TEXT_IGNORE_USER
} from './ds'

export default class ScreenRakuen extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...INIT_PREFETCH_STATE,
      ...EXCLUDE_STATE,
      _loaded: true
    })
    this.fetchRakuen(true)

    // 延迟加载标记
    setTimeout(() => {
      this.setState({
        _mounted: true
      })
    }, 80)

    return true
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchRakuen(true)
  }

  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }

  // -------------------- fetch --------------------
  /** 超展开列表 */
  fetchRakuen = async (refresh: boolean = false) => {
    const { scope, page } = this.state
    const type = this.type(page)

    if (type === 'hot') return rakuenStore.fetchRakuenHot()

    return rakuenStore.fetchRakuen(
      {
        scope,
        type
      },
      refresh
    )
  }

  // -------------------- get --------------------
  /** Tab navigationState */
  @computed get navigationState() {
    const { page } = this.state
    return {
      index: page,
      routes: TABS
    }
  }

  /** 页码背景颜色 */
  @computed get backgroundColor() {
    return _.select(_.colorPlain, _._colorDarkModeLevel1)
  }

  /**
   * 筛选逻辑
   *  - 主动设置屏蔽默认头像用户相关信息
   *  - 主动设置屏蔽 18x 关键字
   *  - 限制用户群体 (iOS 的游客和审核员) 强制屏蔽默认头像用户和 18x
   */
  rakuen(type: RakuenType | RakuenTypeMono | RakuenTypeGroup) {
    return computed(() => {
      const { scope } = this.state
      const rakuen = type === 'hot' ? rakuenStore.hot : rakuenStore.rakuen(scope, type)
      const { filterDefault, filter18x } = systemStore.setting
      if (filterDefault || filter18x || userStore.isLimit) {
        return {
          ...rakuen,
          list: rakuen.list.filter(item => {
            if (
              (filterDefault || userStore.isLimit) &&
              item?.avatar?.includes(URL_DEFAULT_AVATAR)
            ) {
              return false
            }

            if (filter18x || userStore.isLimit) {
              const group = String(item.group).toLocaleLowerCase()
              return !['gal', '性', '癖', '里番'].some(i => group.includes(i))
            }

            return true
          })
        }
      }
      return rakuen
    }).get()
  }

  /** 帖子历史查看记录 */
  readed(topicId: TopicId) {
    return computed(() => rakuenStore.readed(topicId)).get()
  }

  /** 计算实际 type */
  type(page: number) {
    return computed(() => {
      const { title } = TABS[page]
      if (title === '小组') {
        const { group } = this.state
        const label = MODEL_RAKUEN_TYPE_GROUP.getLabel<RakuenTypeGroupCn>(group)
        return MODEL_RAKUEN_TYPE_GROUP.getValue<RakuenTypeGroup>(label)
      }

      if (title === '人物') {
        const { mono } = this.state
        const label = MODEL_RAKUEN_TYPE_MONO.getLabel<RakuenTypeMonoCn>(mono)
        return MODEL_RAKUEN_TYPE_MONO.getValue<RakuenTypeMono>(label)
      }

      return MODEL_RAKUEN_TYPE.getValue<RakuenType>(title)
    }).get()
  }

  /** 导航栏标题 */
  @computed get title() {
    const { page } = this.state
    return TABS[page].title
  }

  /** 获取虚拟人物Id */
  characterId(href: string) {
    if (href.includes('/crt/')) return href.split('/crt/')[1]
    return 0
  }

  /** 是否收藏 */
  isFavor(topicId: TopicId) {
    return computed(() => rakuenStore.favorV2(topicId)).get()
  }

  // -------------------- page --------------------
  /** 标签页切换 */
  onChange = (page: number) => {
    t('超展开.标签页切换', {
      page
    })

    this.setState({
      page
    })
    this.shouldFetchRakuen(page)
  }

  /** 超展开列表 */
  shouldFetchRakuen = page => {
    const { _loaded, list } = this.rakuen(this.type(page))
    if (!_loaded || list.length === 0) this.fetchRakuen(true)
    this.save()
  }

  /** 小组菜单点击 */
  onGroupMenuPress = (title: RakuenTypeGroupCn) => {
    t('超展开.小组菜单点击', {
      title
    })

    this.setState({
      group: MODEL_RAKUEN_TYPE_GROUP.getValue<RakuenTypeGroup>(title)
    })
    this.fetchRakuen(true)
    this.save()
  }

  /** 人物菜单点击 */
  onMonoMenuPress = (title: RakuenTypeMonoCn) => {
    t('超展开.人物菜单点击', {
      title
    })

    this.setState({
      mono: MODEL_RAKUEN_TYPE_MONO.getValue<RakuenTypeMono>(title)
    })
    this.fetchRakuen(true)
    this.save()
  }

  /** 更新帖子历史查看信息 */
  onItemPress = (topicId: TopicId, replies: any) => {
    rakuenStore.updateTopicReaded(topicId, replies)
  }

  /** 项额外点击 */
  onExtraSelect = (
    title: string,
    values: {
      groupHref?: string
      groupCn?: string
      topicId?: string
      userName?: any
      userId?: any
      href?: string
    },
    navigation: Navigation
  ) => {
    const eventId = '超展开.项额外点击'
    let subjectId: string
    let groupId: string
    let monoId: string

    switch (title) {
      case '进入小组':
        groupId = values.groupHref.replace('/group/', '')
        t(eventId, {
          title,
          groupId
        })

        navigation.push('Group', {
          groupId,
          _title: values.groupCn
        })
        break

      case '进入条目':
        subjectId = values.groupHref.replace('/subject/', '')
        t(eventId, {
          title,
          subjectId
        })

        navigation.push('Subject', {
          subjectId
        })
        break

      case '进入人物':
        monoId = values.topicId.replace('prsn/', 'person/').replace('crt/', 'character/')
        t(eventId, {
          title,
          monoId
        })

        navigation.push('Mono', {
          monoId
        })
        break

      case '屏蔽小组':
      case '屏蔽条目':
      case '屏蔽人物':
        confirm(`确定${title}?`, () => {
          t(eventId, {
            title,
            groupCn: values.groupCn
          })

          rakuenStore.addBlockGroup(values.groupCn)
          info(`已屏蔽 ${values.groupCn}`)
        })
        break

      case TEXT_BLOCK_USER:
        confirm(
          `屏蔽来自 ${values?.userName}@${values?.userId} 的包括条目评论、时间胶囊、超展开相关信息，确定?`,
          () => {
            t(eventId, {
              title,
              userName: values.userName
            })

            rakuenStore.addBlockUser(`${values.userName}@${values.userId}`)
            info(`已屏蔽 ${values.userName}`)
          }
        )
        break

      case TEXT_IGNORE_USER:
        confirm(
          `与 ${values.userName} 绝交（不再看到用户的所有话题、评论、日志、私信、提醒）?`,
          async () => {
            if (!rakuenStore.formhash) await rakuenStore.fetchPrivacy()

            rakuenStore.doBlockUser(
              {
                keyword: String(values.userId)
              },
              async () => {
                t('空间.绝交')

                info('已添加绝交')
                feedback()
                rakuenStore.fetchPrivacy()
              },
              () => {
                info('添加失败, 可能授权信息过期')
              }
            )
          }
        )
        break

      default:
        break
    }
  }

  /** 获取未读帖子的id */
  getUnreadTopicIds = (list: any[] = []) => {
    const { topic } = rakuenStore.state
    const ids = []
    list.forEach(item => {
      try {
        // 需要检查回复数是否小于LIMIT_TOPIC_PUSH
        // replies: (+1)
        const count = parseInt(String(item.replies || '0').replace(/\(\+|\)/g, ''))
        if (count <= LIMIT_TOPIC_PUSH) {
          const id = String(item.href).replace('/rakuen/topic/', '')
          if (!topic[id]) {
            ids.push(id)
          }
        }
      } catch (error) {
        // do nothing
      }
    })
    return ids
  }

  /** 预读取未读帖子内容 */
  prefetchConfirm = () => {
    const { page } = this.state
    const type = this.type(page)
    const { list } = this.rakuen(type)
    const ids = this.getUnreadTopicIds(list)

    if (!ids.length) {
      info('当前没有未读取数据的帖子')
      return
    }

    confirm(
      `当前 ${ids.length} 个未读帖子, 1次操作最多预读前 ${PREFETCH_COUNT} 个, 建议在WIFI下进行, 确定?`,
      () => this.prefetch(ids),
      '预读取未读帖子'
    )
  }

  /** 预读取帖子内容 */
  prefetch = async (ids = []) => {
    if (!ids.length) return

    t('超展开.预读取', {
      length: ids.length
    })

    const _ids = ids.filter((item, index) => index < PREFETCH_COUNT)
    let prefetchCurrent = 0
    this.setState({
      prefetching: true,
      prefetchTotal: _ids.length,
      prefetchCurrent
    })

    for (const topicId of _ids) {
      const { prefetching } = this.state

      // 这里需要能中断, 所以就不用queue了
      if (prefetching) {
        info(`预读中... ${prefetchCurrent}`)

        await rakuenStore.fetchTopic({
          topicId
        })

        prefetchCurrent += 1
        this.setState({
          prefetchCurrent
        })
      }
    }

    this.setState({
      ...INIT_PREFETCH_STATE
    })
    info('预读取完毕')
  }

  /** 取消预读取 */
  cancelPrefetch = () => {
    t('超展开.取消预读取')

    this.setState({
      ...INIT_PREFETCH_STATE
    })
  }

  scrollToIndex = {}

  /** 底部 TabBar 再次点击滚动到顶并刷新数据 */
  connectRef = (ref: { scrollToIndex: any }, index: number) => {
    this.scrollToIndex[index] = ref?.scrollToIndex
  }

  /** 刷新到顶 */
  onRefreshThenScrollTop = () => {
    try {
      const { page } = this.state
      if (typeof this.scrollToIndex[page] === 'function') {
        t('其他.刷新到顶', {
          screen: 'Rakuen'
        })

        this.scrollToIndex[page]({
          animated: true,
          index: 0,
          viewOffset: 8000
        })
        setTimeout(() => {
          feedback()
        }, 400)

        this.onHeaderRefresh()
      }
    } catch (error) {
      console.error('Rakuen', 'onRefreshThenScrollTop', error)
    }
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
