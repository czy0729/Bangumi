/*
 * @Author: czy0729
 * @Date: 2022-04-15 09:20:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-21 06:56:54
 */
import { observable, computed, toJS } from 'mobx'
import { userStore, systemStore } from '@stores'
import { getTimestamp, asc, desc } from '@utils'
import store from '@utils/store'
import { queue } from '@utils/fetch'
import { request } from '@utils/fetch.v0'
import { HTMLDecode } from '@utils/html'
import { info } from '@utils/ui'
import { MODEL_RANK_ANIME_FILTER } from '@constants/model'

export const DATA_SORT = ['默认', '关联数', '新放送', '评分']
export const DATA_FILTER = MODEL_RANK_ANIME_FILTER.data.map(item => item.label)
export const DATA_STATUS = ['全部', '未收藏', '看过', '在看', '未看完']

const HOST_API_V0 = 'https://api.bgm.tv/v0'
const RELATIONS = [
  '前传',
  '续集',
  '番外篇',
  '主线故事',
  '相同世界观',
  '不同世界观'
  // '衍生',
  // '角色出演',
  // '不同演绎',
]
const SUBJECT_TYPE = 2
const SUBJECT_ITEM = {
  id: 0,
  name: '',
  name_cn: '',
  image: '',
  date: '',
  total_episodes: 0,
  platform: '',
  rank: 0,
  score: 0,
  total: 0,
  _loaded: 0
}
const LIMIT = 100
const DISTANCE = 60 * 60 * 24

const namespace = 'ScreenSeries'
const excludeState = {
  fetching: false,
  message: '',
  current: 0,
  total: 0
}
const loaded = {}
let indexes = {}

export default class ScreenSeries extends store {
  state = observable({
    collections: [],
    otherCollections: [],
    relations: {},
    subjects: {},
    data: [],
    sort: '',
    filter: '',
    airtime: '',
    status: '',
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      ...excludeState,
      _loaded: getTimestamp()
    })

    if (!this.state.data.length) {
      this.fetchSeries()
    } else {
      this.calculateData()
    }
  }

  /**
   * 组织请求构成关联系列数据
   */
  fetchSeries = async () => {
    if (this.state.fetching) return false

    indexes = {}

    // 先加载第一层关系数据
    await this.fetchCollections()
    await this.fetchRelations()
    await this.calculateData()

    setTimeout(async () => {
      // 稍后加载第二层关系数据
      await this.fetchSubRelations()
      await this.calculateData()
      this.fetchSomeSubjects()

      setTimeout(() => {
        this.fetchOtherCollections() // 因为关联到的条目也可能存在其他收藏状态, 需要请求补全
      }, 4000)
    }, 1600)
  }

  /**
   * 在看和看过的收藏
   */
  fetchCollections = async () => {
    if (!this.userId) {
      info('此功能依赖收藏数据，请先登录', 4)
      return false
    }

    this.setState({
      fetching: true,
      message: '获取用户收藏',
      current: 1,
      total: 2
    })

    const _data = []

    // 看过
    let data = await request(
      `${HOST_API_V0}/users/${this.userId}/collections?subject_type=${SUBJECT_TYPE}&type=2&limit=${LIMIT}`
    )
    if (Array.isArray(data?.data)) {
      _data.push(...data?.data)

      // 非高级会员只请求1页
      if (systemStore.advance) {
        // 最多请求5页
        if (data?.total > 100) {
          for (let i = 2; i <= Math.min(Math.ceil(data.total / LIMIT), 5); i += 1) {
            data = await request(
              `${HOST_API_V0}/users/${
                this.userId
              }/collections?subject_type=${SUBJECT_TYPE}&type=2&offset=${
                (i - 1) * LIMIT
              }&limit=${LIMIT}`
            )
            _data.push(...data?.data)
          }
        }
      }
    }

    this.setState({
      current: 2
    })

    // 在看最多请求1页
    data = await request(
      `${HOST_API_V0}/users/${this.userId}/collections?subject_type=${SUBJECT_TYPE}&type=3&limit=${LIMIT}`
    )
    if (Array.isArray(data?.data)) _data.push(...data?.data)

    if (!_data.length) return false

    this.setState({
      collections: _data
        .sort((a, b) => desc(a.updated_at, b.updated_at))
        .map(item => ({
          id: item.subject_id,
          type: item.type,
          ep: item.ep_status,
          updated_at: item.updated_at
        }))
    })
    this.setState({
      ...excludeState
    })

    this.setStorage(undefined, undefined, namespace)
    return true
  }

  /**
   * 想看、搁置和抛弃的收藏
   */
  fetchOtherCollections = async () => {
    const _data = []

    // 想看
    let data = await request(
      `${HOST_API_V0}/users/${this.userId}/collections?subject_type=${SUBJECT_TYPE}&type=1&limit=${LIMIT}`
    )
    if (Array.isArray(data?.data)) _data.push(...data?.data)

    // 搁置
    data = await request(
      `${HOST_API_V0}/users/${this.userId}/collections?subject_type=${SUBJECT_TYPE}&type=4&limit=${LIMIT}`
    )
    if (Array.isArray(data?.data)) _data.push(...data?.data)

    // 抛弃
    data = await request(
      `${HOST_API_V0}/users/${this.userId}/collections?subject_type=${SUBJECT_TYPE}&type=5&limit=${LIMIT}`
    )
    if (Array.isArray(data?.data)) _data.push(...data?.data)

    if (!_data.length) return false

    this.setState({
      otherCollections: _data
        .sort((a, b) => desc(a.updated_at, b.updated_at))
        .map(item => ({
          id: item.subject_id,
          type: item.type,
          ep: item.ep_status,
          updated_at: item.updated_at
        }))
    })

    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 关联条目
   */
  fetchRelations = async () => {
    const relations = {}
    const fetchs = []

    this.subjectIds.forEach(subjectId => {
      fetchs.push(async () => {
        const data = await request(`${HOST_API_V0}/subjects/${subjectId}/subjects`)

        if (!Array.isArray(data)) {
          relations[subjectId] = []
          return false
        }

        relations[subjectId] = data
          .filter(
            item => SUBJECT_TYPE === item.type && RELATIONS.includes(item.relation)
          )
          .sort((a, b) => asc(a.id, b.id))
          .map(item => item.id)
        return true
      })
    })

    await queue(
      fetchs.map(fn => async () => {
        await fn()
        this.setState({
          fetching: true,
          message: '获取条目关系',
          current: this.state.current + 1,
          total: fetchs.length
        })
        return true
      }),
      2
    )

    this.clearState('relations', relations)
    this.setStorage(undefined, undefined, namespace)
    return true
  }

  /**
   * 二级关联条目
   */
  fetchSubRelations = async () => {
    const relations = {
      ...this.state.relations
    }
    const fetchs = []

    Object.keys(relations).forEach(subjectId => {
      const relation = relations[subjectId]
      relation.forEach(sub => {
        if (relations[sub]) return

        fetchs.push(async () => {
          const data = await request(`${HOST_API_V0}/subjects/${sub.id}/subjects`)

          if (!Array.isArray(data)) {
            relations[sub] = []
            return false
          }

          relations[sub] = data
            .filter(
              item => SUBJECT_TYPE === item.type && RELATIONS.includes(item.relation)
            )
            .sort((a, b) => asc(a.id, b.id))
            .map(item => item.id)

          return true
        })
      })
    })

    this.setState({
      fetching: true,
      message: '获取二级条目关系',
      current: 0,
      total: fetchs.length
    })
    await queue(
      fetchs.map(fn => async () => {
        await fn()
        this.setState({
          fetching: true,
          message: '获取二级条目关系',
          current: this.state.current + 1,
          total: fetchs.length
        })
        return true
      }),
      2
    )
    this.setState({
      relations
    })

    setTimeout(() => {
      this.setState({
        ...excludeState
      })
    }, 1600)

    this.setStorage(undefined, undefined, namespace)
    return true
  }

  /**
   * 条目信息
   */
  fetchSubjects = async (subjectIds = []) => {
    if (!subjectIds.length) return false

    const now = getTimestamp()
    const fetchs = []

    subjectIds.forEach(subjectId => {
      if (loaded[subjectId]) return true

      const subject = this.subject(subjectId)
      if (subject._loaded && now - subject._loaded <= DISTANCE) return true

      loaded[subjectId] = true
      fetchs.push(async () => {
        const data = await request(`${HOST_API_V0}/subjects/${subjectId}`)
        if (!data?.id) return false

        this.setState({
          subjects: {
            [subjectId]: {
              id: subjectId,
              name: HTMLDecode(data.name_cn || data.name),
              image: data?.images?.common || '',
              date: data.date,
              eps: data.eps,
              total_episodes: data.total_episodes,
              platform: data.platform,
              rank: data.rating?.rank,
              score: data.rating?.score,
              total: data.rating?.total,
              _loaded: getTimestamp()
            }
          }
        })
      })
    })

    await queue(fetchs, 2)
    this.setStorage(undefined, undefined, namespace)

    return true
  }

  /**
   * 条目信息是懒加载的
   * 为了首次进入能比较好地使用, 预先加载部分条目数据
   */
  fetchSomeSubjects = () => {
    const { data } = this.state
    const subjectIds = []
    data.forEach(item => {
      if (Array.isArray(toJS(item))) {
        subjectIds.push(...item)
      } else {
        subjectIds.push(item)
      }
    })

    subjectIds.length = 200
    this.fetchSubjects(subjectIds)
  }

  /**
   * 建立系列关系列表
   */
  calculateData = () => {
    const { relations } = this.state
    const data = []

    Object.keys(relations)
      .sort((a, b) => asc(a, b))
      .forEach(id => {
        const ids = [Number(id)]
        relations[id].forEach(item => {
          ids.push(item)
        })

        const find = ids.find(id => id in indexes)
        if (!find) {
          data.push(ids)
          ids.forEach(id => {
            indexes[id] = data.length - 1
          })
        } else {
          data[indexes[find]].push(...ids)
        }
      })

    this.setState({
      data: data.map(item => Array.from(new Set(item)).sort((a, b) => asc(a, b))),
      _loaded: getTimestamp()
    })
  }

  /**
   * 配合<PaginationList>的下一页
   */
  onPage = (list = []) => {
    const subjectIds = []
    list.forEach(item => {
      if (Array.isArray(toJS(item))) {
        subjectIds.push(...item)
      } else {
        subjectIds.push(item)
      }
    })

    this.fetchSubjects(subjectIds)
  }

  // -------------------- get --------------------
  @computed get userId() {
    return userStore.usersInfo(userStore.myUserId).username || userStore.myUserId
  }

  @computed get subjectIds() {
    return this.state.collections.map(item => item.id)
  }

  collection(subjectId) {
    return computed(() => {
      return (
        this.state.collections.find(item => item.id === subjectId) ||
        this.state.otherCollections.find(item => item.id === subjectId)
      )
    }).get()
  }

  collections(subjectIds) {
    return computed(() => {
      const data = {}
      subjectIds.forEach(subjectId => {
        const item = this.collection(subjectId)
        if (item) data[subjectId] = item
      })

      return data
    }).get()
  }

  subject(subjectId) {
    return computed(() => {
      return this.state.subjects[subjectId] || SUBJECT_ITEM
    }).get()
  }

  subjects(subjectIds) {
    return computed(() => {
      const data = {}
      subjectIds.forEach(subjectId => {
        data[subjectId] = this.subject(subjectId)
      })
      return data
    }).get()
  }

  filterData(item) {
    return computed(() => {
      const { filter, airtime, status } = this.state

      let data = item
      if (filter) {
        data = data.filter(subjectId => {
          const subject = this.subject(subjectId)
          return subject?.platform && String(subject.platform).includes(filter)
        })
      }

      if (airtime) {
        data = data.filter(subjectId => {
          const subject = this.subject(subjectId)
          return subject?.date && String(subject.date).includes(`${airtime}-`)
        })
      }

      if (status === '未收藏') {
        data = data.filter(subjectId => !this.collection(subjectId))
      } else if (status === '看过') {
        data = data.filter(subjectId => this.collection(subjectId)?.type === 2)
      } else if (status === '在看') {
        data = data.filter(subjectId => this.collection(subjectId)?.type === 3)
      } else if (status === '未看完') {
        data = data.filter(subjectId => {
          const collection = this.collection(subjectId)
          const subject = this.subject(subjectId)
          return collection?.ep && subject?.eps && collection?.ep !== subject?.eps
        })
      }

      return data
    }).get()
  }

  @computed get data() {
    const { data, sort } = this.state
    if (sort === '关联数') {
      return data.sort((a, b) => desc(a.length, b.length))
    }

    if (sort === '新放送') {
      return data.sort((a, b) => {
        const dateA = Math.max(
          ...a.map(item =>
            Number((this.subject(item).date || '0000-00-00').replace(/-/g, ''))
          )
        )
        const dateB = Math.max(
          ...b.map(item =>
            Number((this.subject(item).date || '0000-00-00').replace(/-/g, ''))
          )
        )
        return desc(dateA, dateB)
      })
    }

    if (sort === '评分') {
      return data.sort((a, b) => {
        const rankA = Math.min(...a.map(item => this.subject(item).rank || 9999))
        const rankB = Math.min(...b.map(item => this.subject(item).rank || 9999))
        return asc(rankA, rankB)
      })
    }

    return data
  }

  @computed get info() {
    let total = 0
    this.data.forEach(item => (total += item.length))
    return {
      series: this.data.length,
      total
    }
  }

  // -------------------- page --------------------
  onSortSelect = title => {
    if (title === '默认') {
      this.setState({
        sort: ''
      })

      return
    }

    this.setState({
      sort: title
    })
    this.setStorage(undefined, undefined, namespace)
  }

  onFilterSelect = title => {
    if (title === '全部') {
      this.setState({
        filter: ''
      })
      return
    }

    this.setState({
      filter: title
    })
    this.setStorage(undefined, undefined, namespace)
  }

  onAirtimeSelect = title => {
    if (title === '全部') {
      this.setState({
        airtime: ''
      })
      return
    }

    this.setState({
      airtime: title
    })
    this.setStorage(undefined, undefined, namespace)
  }

  onStatusSelect = title => {
    if (title === '全部') {
      this.setState({
        status: ''
      })
      return
    }

    this.setState({
      status: title
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
