/*
 * 收藏
 * @Author: czy0729
 * @Date: 2019-02-21 20:40:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-09 02:31:24
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import { HTMLTrim, HTMLToTree, findTreeNode } from '@utils/html'
import store from '@utils/store'
import fetch, { fetchHTML } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'
import {
  API_COLLECTION,
  API_COLLECTION_ACTION,
  API_SUBJECT_UPDATE_WATCHED
} from '@constants/api'
import { HTML_USER_COLLECTIONS } from '@constants/html'
import {
  MODEL_SUBJECT_TYPE,
  MODEL_COLLECTION_STATUS,
  MODEL_COLLECTIONS_ORDERBY
} from '@constants/model'
import userStore from './user'

const namespace = 'Collection'
const defaultSubjectType = MODEL_SUBJECT_TYPE.getLabel('动画')
const defaultType = MODEL_COLLECTION_STATUS.getValue('在看')
const defaultOrder = MODEL_COLLECTIONS_ORDERBY.getValue('收藏时间')

class Collection extends store {
  state = observable({
    // API条目收藏信息
    collection: {
      // [subjectId]: {}
    },

    // HTML用户收藏概览(全部)
    userCollections: {
      // [${userId}|${subjectType}|${type}]: LIST_EMPTY
    },

    // HTML用户收藏概览的看过的标签
    userCollectionsTags: {
      // [${userId}|${subjectType}|${type}]: []
    }
  })

  async init() {
    const res = Promise.all([
      this.getStorage('collection', namespace),
      this.getStorage('userCollections', namespace),
      this.getStorage('userCollectionsTags', namespace)
    ])
    const state = await res
    this.setState({
      collection: state[0] || {},
      userCollections: state[1] || {},
      userCollectionsTags: state[2] || {}
    })

    return res
  }

  // -------------------- get --------------------
  /**
   * 条目收藏信息
   * @param {*} subjectId
   */
  collection(subjectId) {
    return computed(() => this.state.collection[subjectId] || {}).get()
  }

  /**
   * 取用户收藏概览
   */
  userCollections(userId = userStore.myUserId, subjectType, type) {
    return computed(
      () =>
        this.state.userCollections[`${userId}|${subjectType}|${type}`] ||
        LIST_EMPTY
    ).get()
  }

  /**
   * 取用户收藏概览的看过的标签
   */
  userCollectionsTags(userId = userStore.myUserId, subjectType, type) {
    return computed(
      () =>
        this.state.userCollectionsTags[`${userId}|${subjectType}|${type}`] || []
    ).get()
  }

  // -------------------- fetch --------------------
  /**
   * 获取指定条目收藏信息
   * @param {*} subjectId
   */
  fetchCollection(subjectId) {
    return this.fetch(
      {
        url: API_COLLECTION(subjectId),
        info: '条目收藏信息'
      },
      ['collection', subjectId],
      {
        storage: true,
        namespace
      }
    )
  }

  /**
   * HTML用户收藏概览(全部)
   */
  async fetchUserCollections(
    {
      userId = userStore.myUserId,
      subjectType = defaultSubjectType,
      type = defaultType,
      order = defaultOrder,
      tag = ''
    } = {},
    refresh
  ) {
    const { list, pagination } = this.userCollections(userId, subjectType, type)
    let page // 下一页的页码
    if (refresh) {
      page = 1
    } else {
      page = pagination.page + 1
    }

    // -------------------- 请求HTML --------------------
    // 需要携带cookie请求, 不然会查询不到自己隐藏了的条目
    const res = fetchHTML({
      url: HTML_USER_COLLECTIONS(userId, subjectType, type, order, tag, page)
    })
    const raw = await res
    const HTML = HTMLTrim(raw)

    // -------------------- 分析HTML --------------------
    let node
    const stateKey = `${userId}|${subjectType}|${type}`

    // 看过的标签
    if (page === 1) {
      const userCollectionsTags = []
      const userCollectionsTagsHTML = HTML.match(
        /<ul id="userTagList" class="tagList">(.+?)<\/ul><\/div><div class="menu_inner"/
      )

      if (userCollectionsTagsHTML) {
        const tree = HTMLToTree(userCollectionsTagsHTML[1])
        tree.children.forEach(item => {
          userCollectionsTags.push({
            tag: item.children[0].text[0],
            count: parseInt(item.children[0].children[0].text[0])
          })
        })
      }

      const key = 'userCollectionsTags'
      this.setState({
        [key]: {
          [stateKey]: userCollectionsTags
        }
      })
      if (userId === userStore.myUserId) {
        this.setUserCollectionsTagsStroage()
      }
    }

    // 收藏记录
    let { pageTotal = 0 } = pagination
    const userCollections = []
    const userCollectionsHTML = HTML.match(
      /<ul id="browserItemList" class="browserFull">(.+?)<\/ul><div id="multipage"/
    )

    if (userCollectionsHTML) {
      // 总页数
      if (page === 1) {
        const pageHTML =
          HTML.match(
            /<span class="p_edge">\(&nbsp;\d+&nbsp;\/&nbsp;(\d+)&nbsp;\)<\/span>/
          ) ||
          HTML.match(
            /<a href="\? page=\d+" class="p">(\d+)<\/a><a href="\? page=2" class="p">&rsaquo;&rsaquo;<\/a>/
          )
        if (pageHTML) {
          // eslint-disable-next-line prefer-destructuring
          pageTotal = pageHTML[1]
        } else {
          pageTotal = 1
        }
      }

      const tree = HTMLToTree(userCollectionsHTML[1])
      tree.children.forEach(item => {
        const { children } = item

        // 条目Id
        node = findTreeNode(children, 'a|href~/subject/')
        const id = node ? node[0].attrs.href.replace('/subject/', '') : ''

        // 封面
        node =
          findTreeNode(children, 'a > span > img') ||
          findTreeNode(children, 'a > noscript > img')
        let cover = node ? node[0].attrs.src : ''
        if (cover === '/img/info_only.png') {
          cover = ''
        }

        // 标题
        node = findTreeNode(children, 'div > h3 > small')
        const name = node ? node[0].text[0] : ''

        node = findTreeNode(children, 'div > h3 > a')
        const nameCn = node ? node[0].text[0] : ''

        // 描述
        node = findTreeNode(children, 'div > p|class=info tip')
        const tip = node ? node[0].text[0] : ''

        // 标签
        node = findTreeNode(children, 'div > p > span|class=tip')
        const tags = node ? node[0].text[0].replace('标签: ', '') : ''

        // 评论
        node = findTreeNode(children, 'div > div > div > div > div')
        const comments = node ? node[0].text[0] : ''

        // 评分
        node = findTreeNode(children, 'div > p > span|class~sstars')
        const score = node
          ? node[0].attrs.class.replace(/sstars| starsinfo/g, '')
          : ''

        node = findTreeNode(children, 'div > p > span|class=tip_j')
        const time = node ? node[0].text[0] : ''

        const data = {
          id,
          cover,
          name,
          nameCn,
          tip,
          tags,
          comments,
          score,
          time
        }
        userCollections.push(data)
      })
    }

    const key = 'userCollections'
    this.setState({
      [key]: {
        [stateKey]: {
          list: refresh ? userCollections : [...list, ...userCollections],
          pagination: {
            page,
            pageTotal: parseInt(pageTotal)
          },
          _loaded: getTimestamp()
        }
      }
    })

    if (userId === userStore.myUserId) {
      this.setUserCollectionsStroage()
    }
    return res
  }

  // -------------------- page --------------------
  /**
   * 只本地化自己的收藏概览
   */
  setUserCollectionsStroage = () => {
    const { userCollections } = this.state
    const data = {}
    Object.keys(userCollections).forEach(key => {
      if (key.includes(`${userStore.myUserId}|`)) {
        data[key] = userCollections[key]
      }
    })
    this.setStorage('userCollections', data, namespace)
  }

  /**
   * 只本地化自己的收藏概览的看过的标签
   */
  setUserCollectionsTagsStroage = () => {
    const { userCollectionsTags } = this.state
    const data = {}
    Object.keys(userCollectionsTags).forEach(key => {
      if (key.includes(`${userStore.myUserId}|`)) {
        data[key] = userCollectionsTags[key]
      }
    })
    this.setStorage('userCollectionsTags', data, namespace)
  }

  // -------------------- action --------------------
  /**
   * 管理收藏
   */
  doUpdateCollection({ subjectId, status, tags, comment, rating, privacy }) {
    return fetch({
      url: API_COLLECTION_ACTION(subjectId),
      method: 'POST',
      data: {
        status,
        tags,
        comment,
        rating,
        privacy
      }
    })
  }

  /**
   * 更新书籍章节
   */
  doUpdateBookEp({ subjectId, chap, vol }) {
    return fetch({
      url: API_SUBJECT_UPDATE_WATCHED(subjectId),
      method: 'POST',
      data: {
        watched_eps: chap,
        watched_vols: vol
      }
    })
  }
}

export default new Collection()
