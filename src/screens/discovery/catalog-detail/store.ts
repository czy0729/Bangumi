/*
 * @Author: czy0729
 * @Date: 2020-01-05 22:24:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-23 05:00:56
 */
import { observable, computed } from 'mobx'
import {
  _,
  discoveryStore,
  collectionStore,
  subjectStore,
  userStore,
  uiStore
} from '@stores'
import { desc, opitimize, getTimestamp, sleep } from '@utils'
import store from '@utils/store'
import { info, feedback, confirm } from '@utils/ui'
import { t, fetchHTML, queue } from '@utils/fetch'
import { removeHTMLTag } from '@utils/html'
import { HOST } from '@constants'
import i18n from '@constants/i18n'
import { Navigation } from '@types'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'
import { Params } from './types'

export default class ScreenCatalogDetail extends store {
  params: Params

  state = observable(STATE)

  init = async () => {
    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchCatalogDetail()
  }

  // -------------------- fetch --------------------
  /** 目录详情 */
  fetchCatalogDetail = async (refresh: boolean = false) => {
    if (refresh || !opitimize(this.catalogDetail, 120)) {
      await discoveryStore.fetchCatalogDetail({
        id: this.catalogId
      })
    }

    this.fetchCollectionStatusQueue()
    return this.catalogDetail
  }

  /** 延迟获取收藏中的条目的具体收藏状态 */
  fetchCollectionStatusQueue = () => {
    setTimeout(() => {
      collectionStore.fetchCollectionStatusQueue(
        this.catalogDetail.list.filter(item => item.isCollect).map(item => item.id)
      )
    }, 160)
  }

  /** 批量获取条目评分 (目录没有条目的当前评分, 需要额外获取) */
  fetchSubjectsQueue = () => {
    const { list } = this.catalogDetail
    confirm(
      `更新 ${list.length} 个条目的评分?`,
      async () => {
        const fetchs = []
        this.catalogDetail.list.forEach(({ id }) => {
          fetchs.push(async () => {
            const result = await subjectStore.fetchSubjectFromOSS(id)
            if (!result) {
              await subjectStore.fetchSubject(id, 'small')
            } else {
              // 由于之前失误没有把排名存到云端
              const rank =
                subjectStore.subject(id)?.rank ||
                subjectStore.subjectFromOSS(id)?.rank ||
                ''
              if (!rank) {
                await subjectStore.fetchSubject(id, 'small')
              } else {
                // 用于制作进度条加载效果
                await sleep(80)
              }
            }

            this.setState({
              progress: {
                current: this.state.progress.current + 1
              }
            })
          })
        })

        if (fetchs.length) {
          this.setState({
            progress: {
              fetching: true,
              message: '更新条目信息',
              current: 1,
              total: fetchs.length
            }
          })
        }

        await queue(fetchs, 2)
        this.setState({
          progress: EXCLUDE_STATE.progress
        })
      },
      '提示'
    )
  }

  // -------------------- get --------------------
  /** 目录 id */
  @computed get catalogId() {
    const { catalogId = '' } = this.params
    return catalogId
  }

  /** 目录详情 */
  @computed get catalogDetail() {
    const catalogDetail = discoveryStore.catalogDetail(this.catalogId)
    const { sort } = this.state

    let list = catalogDetail.list.map(item => {
      const { id } = item
      return {
        ...item,
        score:
          subjectStore.subject(id)?.rating?.score ||
          subjectStore.subjectFromOSS(id)?.rating?.score ||
          0,
        rank:
          subjectStore.subject(id)?.rank || subjectStore.subjectFromOSS(id)?.rank || '',
        total:
          subjectStore.subject(id)?.rating?.total ||
          subjectStore.subjectFromOSS(id)?.rating?.total ||
          ''
      }
    })

    if (sort === 1) {
      // 时间
      list = list.slice().sort((a, b) => {
        return desc(
          getTimestamp((String(a.info).split(' / ')?.[0] || '').trim(), 'YYYY年M月D日'),
          getTimestamp((String(b.info).split(' / ')?.[0] || '').trim(), 'YYYY年M月D日')
        )
      })
    } else if (sort === 2) {
      // 分数
      list = list
        .slice()
        .sort((a, b) =>
          desc(a, b, item => (item.rank ? 10000 - item.rank : item.score))
        )
    }

    return {
      ...catalogDetail,
      list
    }
  }

  /** 目录是否已收藏 */
  @computed get isCollect() {
    const { byeUrl } = this.catalogDetail
    return !!byeUrl
  }

  /** 隐藏分数? */
  @computed get hideScore() {
    const { _hideScore } = this.params
    return _hideScore
  }

  /** 是否自己创建的目录 */
  @computed get isSelf() {
    const { joinUrl, byeUrl } = this.catalogDetail
    return userStore.isLogin && !joinUrl && !byeUrl
  }

  /** 是否列表布局 */
  @computed get isList() {
    const { layout } = this.state
    return layout === 'list'
  }

  /** 网格布局个数 */
  @computed get gridNum() {
    return _.portrait(3, 5)
  }

  // -------------------- page --------------------
  /** 收藏或取消目录 */
  toggleCollect = () => {
    const { byeUrl } = this.catalogDetail
    if (byeUrl) {
      this.doErase()
      return
    }

    this.doCollect()
  }

  /** 排序 */
  sort = (title: string) => {
    const sort = title === '评分' ? 2 : title === '时间' ? 1 : 0
    t('目录详情.排序', {
      sort
    })

    this.setState({
      sort
    })
    this.setStorage(NAMESPACE)
  }

  /** 编辑自己的目录 */
  onEdit = (modify: string) => {
    const { list } = this.catalogDetail
    const item = list.find(i => i.modify == modify)
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
    const { formhash } = userStore
    if (!formhash) {
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
  switchLayout = () => {
    const _layout = this.isList ? 'grid' : 'list'
    t('目录详情.切换布局', {
      layout: _layout
    })

    this.setState({
      layout: _layout
    })
    this.setStorage(NAMESPACE)
  }

  // -------------------- action --------------------
  /** 收藏目录 */
  doCollect = async () => {
    const { joinUrl } = this.catalogDetail
    if (!joinUrl) return false

    t('目录详情.收藏', {
      catalogId: this.catalogId
    })

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${joinUrl}`
    })
    feedback()
    info('已收藏')

    return this.fetchCatalogDetail(true)
  }

  /** 取消收藏目录 */
  doErase = async () => {
    const { byeUrl } = this.catalogDetail
    if (!byeUrl) return false

    t('目录详情.取消收藏', {
      catalogId: this.catalogId
    })

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${byeUrl}`
    })
    feedback()
    info('已取消收藏')

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
      (response, request) => {
        if (request && request.responseURL) {
          const match = request.responseURL.match(/\d+/g)
          if (match && match[0]) {
            info('创建成功, 开始复制数据...')

            setTimeout(async () => {
              const { list } = this.catalogDetail
              const catalogId = match[0]

              // 添加条目数据
              await queue(
                list.map(
                  (item, index) => () =>
                    new Promise<void>(resolve => {
                      info(`${index + 1} / ${list.length}`)
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

  onManagePress = args => {
    uiStore.showManageModal(args, '目录详情')
  }
}
