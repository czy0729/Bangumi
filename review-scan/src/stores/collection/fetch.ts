/*
 * @Author: czy0729
 * @Date: 2023-04-24 03:01:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 23:34:59
 */
import {
  findTreeNode,
  getTimestamp,
  HTMLDecode,
  HTMLToTree,
  HTMLTrim,
  info,
  queue,
  sleep,
  trim
} from '@utils'
import { fetchHTML, xhrCustom } from '@utils/fetch'
import { fetchCollectionSingleV0, request } from '@utils/fetch.v0'
import { UserCollectionItem } from '@utils/fetch.v0/types'
import {
  API_COLLECTION,
  API_MOSAIC_TILE,
  API_USERS_SUBJECT_COLLECTION,
  COLLECTION_STATUS,
  HTML_USER_COLLECTIONS,
  MODEL_COLLECTION_STATUS,
  MODEL_SUBJECT_TYPE,
  WEB
} from '@constants'
import {
  CollectionsOrder,
  CollectionStatus,
  CollectionStatusCn,
  SubjectId,
  SubjectType,
  SubjectTypeCn,
  SubjectTypeValue,
  UserId
} from '@types'
import userStore from '../user'
import Computed from './computed'
import { DEFAULT_COLLECTION_STATUS, DEFAULT_ORDER, DEFAULT_SUBJECT_TYPE, NAMESPACE } from './init'
import { UserCollections } from './types'

export default class Fetch extends Computed {
  /** 只本地化自己的收藏概览 */
  setUserCollectionsStroage = () => {
    const { userCollections } = this.state
    const data = {}
    Object.keys(userCollections).forEach(key => {
      if (
        key.includes(`${userStore.userInfo.username}|`) ||
        key.includes(`${userStore.myUserId}|`)
      ) {
        data[key] = userCollections[key]
      }
    })
    this.save('userCollections', data)
  }

  /** 只本地化自己的收藏概览的看过的标签 */
  setUserCollectionsTagsStroage = () => {
    const { userCollectionsTags } = this.state
    const data = {}
    Object.keys(userCollectionsTags).forEach(key => {
      if (key.includes(`${userStore.myUserId}|`)) {
        data[key] = userCollectionsTags[key]
      }
    })
    this.save('userCollectionsTags', data)
  }

  /** 获取指定条目收藏信息 */
  fetchCollection = (subjectId: SubjectId) => {
    return this.fetch(
      {
        url: API_COLLECTION(subjectId),
        info: '条目收藏信息'
      },
      ['collection', subjectId],
      {
        storage: true,
        namespace: NAMESPACE
      }
    )
  }

  /** 用户收藏概览 (HTML, 全部) */
  fetchUserCollections = async (
    args: {
      userId?: UserId
      subjectType?: SubjectType
      type?: CollectionStatus
      order?: CollectionsOrder
      tag?: string
      auth?: boolean
    },
    refreshOrPage?: boolean | number,
    maxPage?: number
  ) => {
    const {
      userId: _userId,
      subjectType = DEFAULT_SUBJECT_TYPE,
      type = DEFAULT_COLLECTION_STATUS,
      order = DEFAULT_ORDER,
      tag = '',
      auth = true
    } = args || {}
    const userId = _userId || userStore.myUserId
    const { list, pagination } = this.userCollections(userId, subjectType, type)

    let page: number
    let refresh: boolean
    if (typeof refreshOrPage === 'boolean') {
      refresh = refreshOrPage
      page = refresh ? 1 : pagination.page + 1
    } else {
      refresh = true
      page = refreshOrPage
    }

    // 没有更多不再请求
    if (
      !refresh &&
      (pagination.page >= pagination.pageTotal || (maxPage && pagination.page >= maxPage))
    ) {
      return this.userCollections(userId, subjectType, type)
    }

    const html = HTMLTrim(
      await fetchHTML({
        url: `${auth ? '' : '!'}${HTML_USER_COLLECTIONS(
          userId,
          subjectType,
          type,
          order,
          tag,
          page
        )}`
      })
    )
    const stateKey = `${userId}|${subjectType}|${type}`
    let node: any

    // 看过的标签
    if (page === 1 || typeof refreshOrPage === 'number') {
      const tags = []
      const tagsHtml = html.match(/<ul id="userTagList" class="tagList">(.*?)<\/ul>/)
      if (tagsHtml) {
        const tree = HTMLToTree(tagsHtml[1])
        tree.children.forEach(item => {
          tags.push({
            tag: item.children[0].text[0],
            count: parseInt(item.children[0].children[0].text[0])
          })
        })
      }

      const key = 'userCollectionsTags'
      this.setState({
        [key]: {
          [stateKey]: tags
        }
      })

      if (userId === userStore.myUserId) this.setUserCollectionsTagsStroage()
    }

    // 收藏记录
    const items = []
    const itemsHtml = html.match(
      /<ul id="browserItemList" class="browserFull">(.+?)<\/ul><div id="multipage"/
    )
    let { pageTotal = 0 } = pagination

    if (itemsHtml) {
      // 总页数
      if (page === 1) {
        const pageHTML =
          html.match(/<span class="p_edge">\(&nbsp;\d+&nbsp;\/&nbsp;(\d+)&nbsp;\)<\/span>/) ||
          html.match(/(\d+)<\/a>([^>]*>&rsaquo)/)
        pageTotal = pageHTML?.[1] || 1
      }

      const tree = HTMLToTree(itemsHtml[1])
      tree.children.forEach(item => {
        const { children } = item

        // 条目Id
        node = findTreeNode(children, 'a|href~/subject/')
        const id = node ? node[0].attrs.href.replace('/subject/', '') : ''

        // 封面
        node =
          findTreeNode(children, 'a > span > img') || findTreeNode(children, 'a > noscript > img')
        let cover = node ? node[0].attrs.src : ''
        if (cover === '/img/info_only.png') cover = ''

        // 标题
        node = findTreeNode(children, 'div > h3 > small')
        const name = node ? node[0].text[0] : ''

        // 中文标题
        node = findTreeNode(children, 'div > h3 > a')
        const nameCn = node ? node[0].text[0] : ''

        // 描述
        node = findTreeNode(children, 'div > p|class=info tip')
        const tip = node ? trim(node[0].text[0]) : ''

        // 标签
        node = findTreeNode(children, 'div > p > span|class=tip')
        let tags = node ? trim(node[0].text[0].replace('标签: ', '')) : ''
        if (node?.[1]?.text?.[0]) tags = `${trim(node[1].text[0])} ${tags}`

        // 评论
        node = findTreeNode(children, 'div > div > div > div > div')
        const comments = node ? node[0].text[0] : ''

        // 评分
        node = findTreeNode(children, 'div > p > span|class=starstop-s > span')
        const score = node ? node[0].attrs.class.replace(/starlight stars/g, '') : ''

        // 收藏时间
        node = findTreeNode(children, 'div > p > span|class=tip_j')
        const time = node ? node[0].text[0] : ''

        // 是否收藏过 (针对自己看别人的时光机)
        node = findTreeNode(children, 'div > div|class=collectBlock tip_i')
        const collected = node ? true : false

        items.push({
          id,
          cover,
          name,
          nameCn,
          tip,
          tags,
          comments: HTMLDecode(trim(comments)),
          score,
          time,
          collected
        })
      })
    }

    const key = 'userCollections'
    const data: UserCollections = {
      list: refresh ? items : [...list, ...items],
      pagination: {
        page,
        pageTotal: Number(pageTotal)
      },
      _loaded: getTimestamp()
    }
    this.setState({
      [key]: {
        [stateKey]: data
      }
    })

    // 只本地化自己的收藏概览
    if (WEB || userId === userStore.userInfo.username || userId === userStore.myUserId) {
      this.setUserCollectionsStroage()
    }

    return data
  }

  /** 排队获取自己的所有动画收藏列表记录 (每种最多取 10 页 240 条数据) */
  fetchUserCollectionsQueue = async (
    refresh?: boolean,
    typeCn: SubjectTypeCn = '动画',
    showLoading?: boolean
  ) => {
    try {
      if (!userStore.isWebLogin) return false

      const { username } = userStore.usersInfo(userStore.myUserId)
      const userId = username || userStore.myUserId
      if (!userId) return false

      const subjectType = MODEL_SUBJECT_TYPE.getLabel<SubjectTypeValue>(typeCn) as SubjectType
      const now = getTimestamp()
      for (const item of COLLECTION_STATUS) {
        const { _loaded } = this.userCollections(userId, subjectType, item.value)
        if (refresh || !_loaded || now - Number(_loaded) > 60 * 60 * 4) {
          if (showLoading) info(`[${item.value}] 用户收藏`)
          await this.fetchUserCollections(
            {
              userId,
              subjectType,
              type: item.value
            },
            true
          )
          await sleep()
        }
      }

      const userCollectionsMap = {
        ...this.state.userCollectionsMap
      }
      for (const item of COLLECTION_STATUS) {
        const data = this.userCollections(userId, subjectType, item.value)
        const { pagination } = data
        const { page, pageTotal } = pagination

        // 列表未到底就一直请求, 最多请求到10页
        if (page < pageTotal && page < 10) {
          for (let i = page - 1; i < pageTotal; i += 1) {
            if (showLoading) info(`[${item.value}]: 页码${i + 1}`)
            await this.fetchUserCollections({
              userId,
              subjectType,
              type: item.value
            })
            await sleep()
          }
        }

        this.userCollections(userId, subjectType, item.value).list.forEach(i => {
          if (typeCn === '游戏') {
            userCollectionsMap[i.id] = item.label.replace('看', '玩')
          } else if (typeCn === '音乐') {
            userCollectionsMap[i.id] = item.label.replace('看', '听')
          } else {
            userCollectionsMap[i.id] = item.label
          }
        })
      }

      this.setState({
        userCollectionsMap
      })
      this.save('userCollectionsMap', userCollectionsMap)
      return true
    } catch (error) {
      return false
    }
  }

  /** 瓷砖进度数据 */
  fetchMosaicTile = async (args: { userId?: UserId }) => {
    const { userId } = args || {}
    const key = 'mosaicTile'
    const _username = userId || userStore.myId
    if (
      this.mosaicTile._loaded &&
      getTimestamp() - this.mosaicTile._loaded <= 60 &&
      _username === this.mosaicTile._username
    ) {
      return this[key]
    }

    try {
      await xhrCustom({
        url: API_MOSAIC_TILE(_username).replace('/timelines/progress.json', '')
      })
      await sleep(2400)

      const { _response } = await xhrCustom({
        url: `${API_MOSAIC_TILE(_username)}?begin=2019-07-01&end=2020-12-31&state=${getTimestamp()}`
      })

      const data = JSON.parse(_response)
      if (!Object.keys(data || {}).length) {
        info('时间瓷砖数据生成中，请稍等一下再试')
        return false
      }

      data._username = _username
      data._loaded = getTimestamp()

      this.clearState(key, data)
      this.save(key)
    } catch (error) {
      info('时间瓷砖数据生成中，请稍等一下再试')
    }
    return this[key]
  }

  /**
   * 全局管理单独条目的收藏状态
   *  - [1] 需要登录
   *  - [2] subjectIds 长度 = 1 时, 都会请求
   *  - [3] subjectIds 长度 > 1 时, 当前有记录为 [看过 | 搁置 | 抛弃] 时不重新请求
   *  - [4] 批量请求时, 若条件通过, 条目重请求依然有 12 小时的间隔
   * */
  fetchCollectionStatusQueue = async (subjectIds: SubjectId[] = []) => {
    const keyCollectionStatus = 'collectionStatus'
    const keyLastFetchMS = '_collectionStatusLastFetchMS'
    await this.init(keyCollectionStatus)
    await this.init(keyLastFetchMS)

    if (WEB) {
      /** @todo 目前在网页端中 userStore.isLogin 一定返回 false */
      if (!userStore.accessToken.access_token || !subjectIds.length) return {} // [1]
    } else {
      if (!userStore.isLogin || !subjectIds.length) return {} // [1]
    }

    const lastFetchMS = {}
    const results: UserCollectionItem[] = []
    const fetchs = []
    const now = getTimestamp()
    subjectIds.forEach(subjectId => {
      if (
        subjectIds.length === 1 || // [2]
        (!['看过', '搁置', '抛弃'].includes(this.collect(subjectId)) && // [3]
          now - this._collectionStatusLastFetchMS(subjectId) >= 60 * 60 * 12) // [4]
      ) {
        fetchs.push(async () => {
          const collection = await fetchCollectionSingleV0({
            subjectId,
            userId: userStore.myId
          })
          if (collection) results.push(collection)
          lastFetchMS[subjectId] = getTimestamp()
        })
      }
    })
    await queue(fetchs, 2)

    const data = {}
    results.forEach(result => {
      if (result?.subject_id && result?.type) {
        data[result.subject_id] = MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(result.type)
      }
    })

    this.setState({
      [keyCollectionStatus]: data,
      [keyLastFetchMS]: lastFetchMS
    })
    this.save(keyCollectionStatus)
    this.save(keyLastFetchMS)
    return data
  }

  /** 获取对应用户的收藏 */
  fetchUsersCollection = async (username: UserId, subjectId: SubjectId) => {
    try {
      const data: any = await request(API_USERS_SUBJECT_COLLECTION(username, subjectId))
      if (data?.updated_at) {
        const key = 'usersSubjectCollection'
        const stateKey = `${username}|${subjectId}`
        const item = {
          rate: data?.rate || 0,
          comment: data?.comment || '',
          type: String(data?.type || ''),
          update_at: data?.updated_at || '',
          _loaded: getTimestamp()
        }
        this.setState({
          [key]: {
            [stateKey]: item
          }
        })
        this.save(key)
        return item
      }

      return false
    } catch (error) {
      return false
    }
  }
}
