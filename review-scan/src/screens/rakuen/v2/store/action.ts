/*
 * @Author: czy0729
 * @Date: 2024-05-16 19:56:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-27 15:04:01
 */
import { ScrollToIndex } from '@components'
import { rakuenStore } from '@stores'
import { confirm, feedback, info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { LIMIT_TOPIC_PUSH, MODEL_RAKUEN_TYPE_GROUP, MODEL_RAKUEN_TYPE_MONO } from '@constants'
import {
  MonoId,
  Navigation,
  RakuenTypeGroup,
  RakuenTypeGroupCn,
  RakuenTypeMono,
  RakuenTypeMonoCn,
  TopicId
} from '@types'
import { PREFETCH_COUNT, TEXT_BLOCK_USER, TEXT_IGNORE_USER } from '../ds'
import Fetch from './fetch'
import { INIT_PREFETCH_STATE } from './ds'

export default class Action extends Fetch {
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
    if (!_loaded || list.length === 0) this.fetchRakuen()
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
    this.fetchRakuen()
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
    this.fetchRakuen()
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
    let monoId: MonoId

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
        monoId = values.topicId.replace('prsn/', 'person/').replace('crt/', 'character/') as MonoId
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

    const _ids = ids.filter((_item, index) => index < PREFETCH_COUNT)
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

  scrollToIndex: Record<number, ScrollToIndex> = {}

  /** 底部 TabBar 再次点击滚动到顶并刷新数据 */
  connectRef = (ref: { scrollToIndex: ScrollToIndex }, index: number) => {
    this.scrollToIndex[index] = ref?.scrollToIndex
  }

  /** 刷新到顶 */
  onRefreshThenScrollTop = async () => {
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

        await this.onHeaderRefresh()
        feedback()
      }
    } catch (error) {
      console.error('Rakuen', 'onRefreshThenScrollTop', error)
    }
  }

  /** 选项卡开始滑动 */
  onSwipeStart = () => {
    this.setState({
      swiping: true
    })
  }

  /** 选项卡结束滑动 */
  onSwipeEnd = () => {
    setTimeout(() => {
      this.setState({
        swiping: false
      })
    }, 240)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
