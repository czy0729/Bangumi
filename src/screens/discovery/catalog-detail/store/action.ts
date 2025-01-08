/*
 * @Author: czy0729
 * @Date: 2024-07-29 19:39:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-07 16:07:47
 */
import { discoveryStore, userStore } from '@stores'
import { confirm, feedback, info, removeHTMLTag, updateVisibleBottom } from '@utils'
import { fetchHTML, queue, t } from '@utils/fetch'
import { webhookCatalog } from '@utils/webhooks'
import { HOST } from '@constants'
import i18n from '@constants/i18n'
import { Navigation } from '@types'
import { COLLECT_DS, LAYOUT_DS, SORT_DS } from '../ds'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

export default class Action extends Fetch {
  /** 收藏或取消目录 */
  toggleCollect = () => {
    if (this.catalogDetail.byeUrl) {
      this.doErase()
      return
    }

    this.doCollect()
  }

  /** 编辑自己的目录 */
  onEdit = (modify: string) => {
    const item = this.list.find(i => i.modify == modify)
    if (!item) {
      info(`目录不属于你或者${i18n.login()}状态失效了`)
      return
    }

    t('目录详情.管理', {
      id: this.catalogId
    })

    if (item) {
      this.setState({
        visible: true,
        defaultEditItem: item
      })
    }
  }

  /** 关闭编辑目录 */
  onClose = () => {
    this.setState({
      visible: false,
      defaultEditItem: null
    })
  }

  /** 复制他人的目录 */
  onCopy = (navigation: Navigation) => {
    if (!userStore.formhash) {
      info(`请先${i18n.login()}`)
      return
    }

    confirm(
      '复制当前目录成为自己的目录, 此操作会大量消耗服务器资源, 请勿滥用, 确定?',
      () => this.doCopy(navigation),
      '复制目录'
    )
  }

  /** 切换布局 */
  onSwitchLayout = (label: string) => {
    const layout = LAYOUT_DS.find(item => item.title === label)?.['key']
    this.setState({
      layout
    })
    this.save()

    t('目录详情.切换布局', {
      layout
    })
  }

  /** 切换类型 */
  onToggleSort = (label: string) => {
    const sort = SORT_DS.find(item => item.title === label)?.['key']
    this.setState({
      sort
    })
    this.save()

    t('目录详情.排序', {
      sort
    })
  }

  /** 切换收藏范围 */
  onToggleCollect = (label: string) => {
    const collect = COLLECT_DS.find(item => item.title === label)?.['key']
    this.setState({
      collect
    })
    this.save()

    t('目录详情.收藏范围', {
      collect
    })
  }

  /** 倒序 */
  onReverse = () => {
    const value = !this.state.reverse
    this.setState({
      reverse: value,
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })
    this.save()
  }

  /** 切换类型筛选 */
  onType = (type: string) => {
    this.setState({
      type: type.split(' ')?.[0] || '动画'
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)

  // -------------------- action --------------------
  /** 收藏目录 */
  doCollect = async () => {
    const { joinUrl } = this.catalogDetail
    if (!joinUrl) return false

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${joinUrl}`
    })
    feedback()
    info('已收藏')
    webhookCatalog(
      {
        ...this.catalogDetail,
        id: this.catalogId
      },
      userStore.userInfo
    )

    t('目录详情.收藏', {
      catalogId: this.catalogId
    })

    return this.fetchCatalogDetail(true)
  }

  /** 取消收藏目录 */
  doErase = async () => {
    const { byeUrl } = this.catalogDetail
    if (!byeUrl) return false

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${byeUrl}`
    })
    feedback()
    info('已取消收藏')

    t('目录详情.取消收藏', {
      catalogId: this.catalogId
    })

    return this.fetchCatalogDetail(true)
  }

  /** 复制目录 */
  doCopy = async (navigation: Navigation) => {
    const { formhash } = userStore
    const { title, content } = this.catalogDetail

    // 创建目录
    discoveryStore.doCatalogCreate(
      {
        formhash,
        title: title || '',
        desc: removeHTMLTag(content || '')
      },
      (_response, request) => {
        if (request && request.responseURL) {
          const match = request.responseURL.match(/\d+/g)
          if (match && match[0]) {
            info('创建成功, 开始复制数据...')

            setTimeout(async () => {
              const catalogId = match[0]

              // 添加条目数据
              await queue(
                this.list.map(
                  (item, index) => () =>
                    new Promise<void>(resolve => {
                      info(`${index + 1} / ${this.list.length}`)
                      discoveryStore.doCatalogAddRelate(
                        {
                          catalogId,
                          subjectId: String(item.id).match(/\d+/)[0],
                          formhash,
                          noConsole: true
                        },
                        () => {
                          resolve()
                        }
                      )
                    })
                ),
                1
              )

              // 跳转到创建后的目录
              navigation.push('CatalogDetail', {
                catalogId
              })
              info('已完成')

              t('目录详情.复制', {
                from: catalogId
              })
            }, 400)
          } else {
            info(`目录创建失败, 请检查${i18n.login()}状态`)
          }
        }
      }
    )
  }
}
