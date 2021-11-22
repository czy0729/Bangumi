/*
 * @Author: czy0729
 * @Date: 2020-01-05 22:24:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-23 04:20:35
 */
import { Alert } from 'react-native'
import { observable, computed } from 'mobx'
import { discoveryStore, collectionStore, subjectStore, userStore } from '@stores'
import { desc } from '@utils'
import store from '@utils/store'
import { info, feedback, confirm } from '@utils/ui'
import { t, fetchHTML, queue } from '@utils/fetch'
import { removeHTMLTag } from '@utils/html'
import { HOST } from '@constants'

const namespace = 'ScreenCatalogDetail'
const excludeState = {
  visible: false,
  defaultEditItem: null
}

export default class ScreenCatalogDetail extends store {
  state = observable({
    sort: 0,
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      ...excludeState,
      _loaded: true
    })

    return this.fetchCatalogDetail()
  }

  // -------------------- fetch --------------------
  fetchCatalogDetail = () =>
    discoveryStore.fetchCatalogDetail({
      id: this.catalogId
    })

  /**
   * 批量获取条目评分
   * 目录没有评分, 需要在详情里面获取
   */
  fetchSubjectQueue = () => {
    const { list } = this.catalogDetail
    confirm(
      `更新 ${list.length} 个条目的评分?`,
      () => {
        const fetchs = []
        this.catalogDetail.list.forEach(({ id }, index) => {
          fetchs.push(() => {
            info(`${index + 1} / ${list.length}`)
            return subjectStore.fetchSubject(id)
          })
        })
        queue(fetchs, 1)
      },
      '提示'
    )
  }

  // -------------------- get --------------------
  @computed get catalogId() {
    const { catalogId = '' } = this.params
    return catalogId
  }

  @computed get catalogDetail() {
    const { sort } = this.state
    const catalogDetail = discoveryStore.catalogDetail(this.catalogId)
    let list = catalogDetail.list.map(item => ({
      ...item,
      score: subjectStore.subject(item.id)?.rating?.score || 0
    }))

    if (sort === 1) {
      // 时间
      list = list.sort((a, b) => b.info.localeCompare(a.info))
    } else if (sort === 2) {
      // 分数
      list = list.sort((a, b) => desc(a, b, item => item.score))
    }
    return {
      ...catalogDetail,
      list
    }
  }

  @computed get isCollect() {
    const { byeUrl } = this.catalogDetail
    return !!byeUrl
  }

  @computed get userCollectionsMap() {
    return collectionStore.userCollectionsMap
  }

  @computed get hideScore() {
    const { _hideScore } = this.params
    return _hideScore
  }

  /**
   * 是否自己创建的目录
   */
  @computed get isSelf() {
    const { joinUrl, byeUrl } = this.catalogDetail
    return userStore.isLogin && !joinUrl && !byeUrl
  }

  // -------------------- page --------------------
  /**
   * 收藏或取消目录
   */
  toggleCollect = () => {
    const { byeUrl } = this.catalogDetail
    if (byeUrl) {
      this.doErase()
      return
    }

    this.doCollect()
  }

  /**
   * 排序
   */
  sort = title => {
    const sort = title === '评分' ? 2 : title === '时间' ? 1 : 0
    t('目录详情.排序', {
      sort
    })

    this.setState({
      sort
    })
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 编辑自己的目录
   */
  onEdit = modify => {
    const { list } = this.catalogDetail
    const item = list.find(i => i.modify == modify)
    if (!item) {
      info('目录不属于你或者登陆状态失效了')
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

  /**
   * 关闭编辑目录
   */
  onClose = () => {
    this.setState({
      visible: false,
      defaultEditItem: null
    })
  }

  /**
   * 复制他人的目录
   */
  onCopy = navigation => {
    const { formhash } = userStore
    if (!formhash) {
      info('请先登陆')
      return
    }

    Alert.alert(
      '复制目录',
      '复制当前目录成为自己的目录, 此操作会大量消耗服务器资源, 请勿滥用, 确定?',
      [
        {
          text: '取消',
          style: 'cancel'
        },
        {
          text: '确定',
          onPress: () => this.doCopy(navigation)
        }
      ]
    )
  }

  // -------------------- action --------------------
  /**
   * 收藏目录
   */
  doCollect = async () => {
    const { joinUrl } = this.catalogDetail
    if (!joinUrl) {
      return false
    }

    t('目录详情.收藏', {
      catalogId: this.catalogId
    })

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${joinUrl}`
    })
    feedback()
    info('已收藏')

    return this.fetchCatalogDetail()
  }

  /**
   * 取消收藏目录
   */
  doErase = async () => {
    const { byeUrl } = this.catalogDetail
    if (!byeUrl) {
      return false
    }

    t('目录详情.取消收藏', {
      catalogId: this.catalogId
    })

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${byeUrl}`
    })
    feedback()
    info('已取消收藏')

    return this.fetchCatalogDetail()
  }

  /**
   * 复制目录
   */
  doCopy = async navigation => {
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
                    new Promise(resolve => {
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
            info('目录创建失败, 请检查登陆状态')
          }
        }
      }
    )
  }
}
