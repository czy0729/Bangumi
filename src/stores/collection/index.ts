/*
 * 收藏
 * @Author: czy0729
 * @Date: 2019-02-21 20:40:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-21 21:21:16
 */
import { observable, computed, toJS } from 'mobx'
import {
  HTMLDecode,
  HTMLToTree,
  HTMLTrim,
  findTreeNode,
  getTimestamp,
  sleep,
  trim,
  queue,
  info
} from '@utils'
import store from '@utils/store'
import fetch, { fetchHTML, xhr, xhrCustom } from '@utils/fetch'
import { request, fetchCollectionSingleV0 } from '@utils/fetch.v0'
import { UserCollectionItem } from '@utils/fetch.v0/types'
import { SORT } from '@utils/subject/anime'
import {
  API_COLLECTION,
  API_COLLECTION_ACTION,
  API_MOSAIC_TILE,
  API_SUBJECT_UPDATE_WATCHED,
  API_USERS_SUBJECT_COLLECTION,
  COLLECTION_STATUS,
  DEV,
  HTML_ACTION_SUBJECT_INTEREST_UPDATE,
  HTML_ACTION_SUBJECT_SET_WATCHED,
  HTML_USER_COLLECTIONS,
  LIST_EMPTY,
  MODEL_COLLECTION_STATUS,
  MODEL_SUBJECT_TYPE
} from '@constants'
import {
  CollectionStatus,
  CollectionStatusCn,
  CollectionsOrder,
  RatingStatus,
  StoreConstructor,
  SubjectId,
  SubjectType,
  SubjectTypeCn,
  SubjectTypeValue,
  UserId
} from '@types'
import subjectStore from '../subject'
import userStore from '../user'
import { LOG_INIT } from '../ds'
import {
  DEFAULT_COLLECTION_STATUS,
  DEFAULT_ORDER,
  DEFAULT_SUBJECT_TYPE,
  DEFAULT_USERS_SUBJECT_COLLECTION,
  LOADED,
  NAMESPACE,
  STATE
} from './init'
import {
  Collection,
  MosaicTile,
  UserCollections,
  UserCollectionsMap,
  UserCollectionsTags,
  UsersSubjectCollection
} from './types'

class CollectionStore extends store implements StoreConstructor<typeof STATE> {
  state = observable(STATE)

  private _loaded = LOADED

  init = async (key: keyof typeof LOADED) => {
    if (!key || this._loaded[key]) return true

    if (DEV && LOG_INIT) console.info('CollectionStore /', key)

    this._loaded[key] = true
    const data = await this.readStorage([key], NAMESPACE)

    if (key === 'userCollectionsMap') {
      if (!DEV) {
        setTimeout(() => {
          this.fetchUserCollectionsQueue()
        }, 16000)
      }
    }

    return data
  }

  save = (key: keyof typeof LOADED, data?: any) => {
    return this.setStorage(key, data, NAMESPACE)
  }

  // -------------------- get --------------------
  /** 条目收藏信息 */
  collection(subjectId: SubjectId) {
    this.init('collection')
    return computed<Collection>(() => {
      return this.state.collection[subjectId] || {}
    }).get()
  }

  /** 用户收藏概览 (HTML, 全部) */
  userCollections(userId: UserId, subjectType: SubjectType, type: CollectionStatus) {
    this.init('userCollections')
    return computed<UserCollections>(() => {
      const key = `${userId || userStore.myUserId}|${subjectType}|${type}`
      return this.state.userCollections[key] || LIST_EMPTY
    }).get()
  }

  /** 用户收藏概览的标签 (HTML) */
  userCollectionsTags(
    userId: UserId,
    subjectType: SubjectType,
    type: CollectionStatus
  ) {
    this.init('userCollectionsTags')
    return computed<UserCollectionsTags>(() => {
      const key = `${userId || userStore.myUserId}|${subjectType}|${type}`
      return this.state.userCollectionsTags[key] || []
    }).get()
  }

  /** @deprecated 所有收藏条目状态 */
  @computed get userCollectionsMap(): UserCollectionsMap {
    this.init('userCollectionsMap')
    return this.state.userCollectionsMap
  }

  /** 瓷砖进度 */
  @computed get mosaicTile(): MosaicTile {
    this.init('mosaicTile')
    return this.state.mosaicTile
  }

  /** 条目的收藏状态, 替代 userCollectionsMap */
  collectionStatus(subjectId: SubjectId) {
    this.init('collectionStatus')
    return computed<CollectionStatusCn | ''>(() => {
      return this.state.collectionStatus[subjectId] || ''
    }).get()
  }

  /** 条目的收藏状态最后一次请求时间戳, 对应 collectionStatus, 共同维护 */
  _collectionStatusLastFetchMS(subjectId: SubjectId) {
    this.init('_collectionStatusLastFetchMS')
    return computed<number>(() => {
      return this.state._collectionStatusLastFetchMS[subjectId] || 0
    }).get()
  }

  /** 特定用户特定条目的收藏信息 */
  usersSubjectCollection(username: UserId, subjectId: SubjectId) {
    this.init('usersSubjectCollection')
    return computed<UsersSubjectCollection>(() => {
      return (
        this.state.usersSubjectCollection[`${username}|${subjectId}`] ||
        DEFAULT_USERS_SUBJECT_COLLECTION
      )
    }).get()
  }

  // -------------------- computed --------------------
  /** @deprecated 获取指定条目收藏状态名 */
  statusName(subjectId: SubjectId) {
    return computed<CollectionStatusCn | ''>(() => {
      const collection = this.collection(subjectId) as any
      return collection?.status?.name || ''
    }).get()
  }

  // -------------------- fetch --------------------
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
    },
    refresh?: boolean
  ) => {
    const {
      userId: _userId,
      subjectType = DEFAULT_SUBJECT_TYPE,
      type = DEFAULT_COLLECTION_STATUS,
      order = DEFAULT_ORDER,
      tag = ''
    } = args || {}
    const userId = _userId || userStore.myUserId
    const { list, pagination } = this.userCollections(userId, subjectType, type)

    // 没有更多不再请求
    if (!refresh && pagination.page >= pagination.pageTotal) {
      return this.userCollections(userId, subjectType, type)
    }

    const page = refresh ? 1 : pagination.page + 1

    // -------------------- 请求HTML --------------------
    // 需要携带 cookie 请求, 不然会查询不到自己隐藏了的条目
    const raw = await fetchHTML({
      url: HTML_USER_COLLECTIONS(userId, subjectType, type, order, tag, page)
    })
    const HTML = HTMLTrim(raw)

    // -------------------- 分析HTML --------------------
    let node
    const stateKey = `${userId}|${subjectType}|${type}`

    // 看过的标签
    if (page === 1) {
      const userCollectionsTags = []
      const userCollectionsTagsHTML = HTML.match(
        /<ul id="userTagList" class="tagList">(.*?)<\/ul>/
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
          ) || HTML.match(/(\d+)<\/a>([^>]*>&rsaquo)/)
        pageTotal = pageHTML?.[1] || 1
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

        const data = {
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
        }
        userCollections.push(data)
      })
    }

    const key = 'userCollections'
    const data = {
      list: refresh ? userCollections : [...list, ...userCollections],
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
    if (userId === userStore.userInfo.username || userId === userStore.myUserId) {
      this.setUserCollectionsStroage()
    }

    return data
  }

  /** 排队获取自己的所有动画收藏列表记录 (每种最多取10页240条数据) */
  fetchUserCollectionsQueue = async (
    refresh?: boolean,
    typeCn: SubjectTypeCn = '动画',
    showLoading?: boolean
  ) => {
    try {
      const { username } = userStore.usersInfo(userStore.myUserId)
      const userId = username || userStore.myUserId
      if (!userId) return false

      const subjectType = MODEL_SUBJECT_TYPE.getLabel<SubjectTypeValue>(
        typeCn
      ) as SubjectType
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
        url: `${API_MOSAIC_TILE(
          _username
        )}?begin=2019-07-01&end=2020-12-31&state=${getTimestamp()}`
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
   *  - [4] 批量请求时, 若条件通过, 条目重请求依然有 1 小时的间隔
   * */
  fetchCollectionStatusQueue = async (subjectIds: SubjectId[] = []) => {
    if (!userStore.isLogin || !subjectIds.length) return {} // [1]

    const collectionStatusLastFetchMS = {}
    const results: UserCollectionItem[] = []
    const fetchs = []
    const now = getTimestamp()
    subjectIds.forEach(subjectId => {
      if (
        subjectIds.length === 1 || // [2]
        (!['看过', '搁置', '抛弃'].includes(this.collectionStatus(subjectId)) && // [3]
          now - this._collectionStatusLastFetchMS(subjectId) >= 60 * 60) // [4]
      ) {
        fetchs.push(async () => {
          const collection = await fetchCollectionSingleV0({
            subjectId,
            userId: userStore.myId
          })
          if (collection) results.push(collection)

          collectionStatusLastFetchMS[subjectId] = getTimestamp()
        })
      }
    })
    await queue(fetchs, 2)

    const data = {}
    results.forEach(result => {
      if (result?.subject_id && result?.type) {
        data[result.subject_id] = MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(
          result.type
        )
      }
    })

    const key = 'collectionStatus'
    this.setState({
      [key]: data,
      _collectionStatusLastFetchMS: collectionStatusLastFetchMS
    })

    this.save(key)
    this.save('_collectionStatusLastFetchMS')
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

  // -------------------- methods --------------------
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

  /** 用户收藏按网站评分本地排序后入库 */
  sortUserCollectionsByScore = async (
    userId: UserId,
    subjectType: SubjectType,
    type: CollectionStatus
  ) => {
    const data = this.userCollections(userId, subjectType, type)
    const subjectIds = data.list.map(item => item.id)
    await subjectStore.fetchRanks(subjectIds)
    const list = data.list.sort((a, b) =>
      SORT.rating(subjectStore.rank(a.id), subjectStore.rank(b.id), 's', 'r')
    )

    const key = 'userCollections'
    const stateKey = `${userId}|${subjectType}|${type}`
    this.setState({
      [key]: {
        [stateKey]: {
          ...data,
          list: toJS(list)
        }
      }
    })

    // 只本地化自己的收藏概览
    if (userId === userStore.userInfo.username || userId === userStore.myUserId) {
      this.setUserCollectionsStroage()
    }
  }

  /** 主动删除列表中一个条目数据 */
  removeOneInUserCollections = (args: {
    userId: UserId
    subjectType: SubjectType
    type: CollectionStatus
    subjectId: SubjectId
  }) => {
    const { userId, subjectType, type, subjectId } = args || {}
    if (!subjectId) return false

    const key = 'userCollections'
    const stateKey = `${userId}|${subjectType}|${type}`
    const data = this.userCollections(userId, subjectType, type)
    this.setState({
      [key]: {
        [stateKey]: {
          ...data,
          list: data.list.filter(item => item.id != subjectId)
        }
      }
    })

    this.save(key)
    return true
  }

  /** 移除一个条目的收藏状态 */
  removeStatus = (subjectId: SubjectId) => {
    const key = 'collectionStatus'
    this.setState({
      [key]: {
        [subjectId]: ''
      }
    })
    this.save(key)
    return true
  }

  // -------------------- action --------------------
  /** 条目管理 */
  doUpdateCollection = (args: {
    subjectId: SubjectId
    status?: RatingStatus | ''
    tags?: string
    comment?: string
    rating?: string | number
    privacy?: 0 | 1 | '0' | '1'
  }) => {
    const { subjectId, status, tags, comment, rating, privacy } = args || {}
    return new Promise(async resolve => {
      const data = await fetch({
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

      // @todo 20220216 以下旧API不再响应敏感条目, 暂时使用请求网页代替
      if (data?.code === 404) {
        const interest = MODEL_COLLECTION_STATUS.getTitle(status)
        xhr(
          {
            url: HTML_ACTION_SUBJECT_INTEREST_UPDATE(subjectId, userStore.formhash),
            data: {
              referer: 'subject',
              interest,
              rating,
              tags,
              comment,
              privacy,
              update: '保存'
            }
          },
          () => {
            return resolve(true)
          }
        )
      } else {
        return resolve(true)
      }
    })
  }

  /** 更新书籍章节 */
  doUpdateBookEp = (args: { subjectId: SubjectId; chap?: string; vol?: string }) => {
    const { subjectId, chap, vol } = args || {}
    return fetch({
      url: API_SUBJECT_UPDATE_WATCHED(subjectId),
      method: 'POST',
      data: {
        watched_eps: chap,
        watched_vols: vol
      }
    })
  }

  /** 输入框更新章节进度 */
  doUpdateSubjectEp = (
    args: { subjectId: SubjectId; watchedEps?: string; watchedVols?: string },
    success?: () => any
  ) => {
    const { subjectId, watchedEps, watchedVols } = args || {}
    const query: Record<string, unknown> = {
      referer: 'subject',
      submit: '更新',
      watchedeps: watchedEps
    }
    if (watchedVols) query.watched_vols = watchedVols
    return xhr(
      {
        url: HTML_ACTION_SUBJECT_SET_WATCHED(subjectId),
        data: query
      },
      success
    )
  }
}

export default new CollectionStore()
