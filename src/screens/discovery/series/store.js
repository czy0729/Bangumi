/*
 * @Author: czy0729
 * @Date: 2022-04-15 09:20:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-19 02:52:17
 */
import { observable, computed } from 'mobx'
import { userStore } from '@stores'
import { getTimestamp, asc, desc } from '@utils'
import store from '@utils/store'
import { queue } from '@utils/fetch'
import { request } from '@utils/fetch.v0'

const RELATIONS = [
  '前传',
  '续集',
  // '衍生',
  // '角色出演',
  // '不同演绎',
  // '不同世界观',
  // '相同世界观',
  '番外篇',
  '主线故事'
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
const DISTANCE = 60 * 60 * 12

const namespace = 'ScreenSeries'
const excludeState = {
  fetching: false,
  message: '',
  current: 0,
  total: 0
}
const loaded = {}

export default class ScreenSeries extends store {
  state = observable({
    collections: [],
    relations: {},
    subjects: {},
    data: [],
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

    // this.fetchSeries()
    await this.calculateData()
  }

  fetchSeries = async () => {
    // 先加载第一层关系数据
    await this.fetchCollections()
    await this.fetchRelations()
    await this.calculateData()

    setTimeout(async () => {
      // 稍后加载第二层关系数据
      await this.fetchSubRelations()
      await this.calculateData()
    }, 1600)
  }

  fetchCollections = async () => {
    if (!this.userId) return false

    const _data = []

    // 想看只请求1页
    let data = await request(
      `https://api.bgm.tv/v0/users/${this.userId}/collections?subject_type=2&type=1&limit=${LIMIT}`
    )
    if (Array.isArray(data?.data)) _data.push(...data?.data)

    // 看过
    data = await request(
      `https://api.bgm.tv/v0/users/${this.userId}/collections?subject_type=2&type=2&limit=${LIMIT}`
    )
    if (Array.isArray(data?.data)) {
      _data.push(...data?.data)

      // 最多请求5页
      if (data?.total > 100) {
        for (let i = 2; i <= Math.min(Math.ceil(data.total / LIMIT), 5); i += 1) {
          data = await request(
            `https://api.bgm.tv/v0/users/${
              this.userId
            }/collections?subject_type=2&type=2&offset=${
              (i - 1) * LIMIT
            }&limit=${LIMIT}`
          )
          _data.push(...data?.data)
        }
      }
    }

    // 在看最多请求1页
    data = await request(
      `https://api.bgm.tv/v0/users/${this.userId}/collections?subject_type=2&type=3&limit=${LIMIT}`
    )
    if (Array.isArray(data?.data)) _data.push(...data?.data)

    if (!_data.length) return false

    this.setState({
      collections: _data
        .sort((a, b) => desc(a.updated_at, b.updated_at))
        .map(item => ({
          id: item.subject_id,
          type: item.type,
          ep: item.ep_status
        }))
    })
    return true
  }

  fetchRelations = async () => {
    const relations = {}
    const fetchs = []

    this.subjectIds.forEach(subjectId => {
      fetchs.push(async () => {
        const data = await request(
          `https://api.bgm.tv/v0/subjects/${subjectId}/subjects`
        )

        if (!Array.isArray(data)) {
          relations[subjectId] = []
          return false
        }

        relations[subjectId] = data
          .filter(
            item => SUBJECT_TYPE === item.type && RELATIONS.includes(item.relation)
          )
          .sort((a, b) => asc(a.id, b.id))
          .map(item => ({
            id: item.id,
            image: item?.images?.common || '',
            name: item.name,
            name_cn: item.name_cn
          }))
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
      1
    )

    this.clearState('relations', relations)
    return true
  }

  fetchSubRelations = async () => {
    const relations = {
      ...this.state.relations
    }
    const fetchs = []

    Object.keys(relations).forEach(subjectId => {
      const relation = relations[subjectId]
      relation.forEach(sub => {
        if (relations[sub.id]) return

        fetchs.push(async () => {
          const data = await request(
            `https://api.bgm.tv/v0/subjects/${sub.id}/subjects`
          )

          if (!Array.isArray(data)) {
            relations[sub.id] = []
            return false
          }

          relations[sub.id] = data
            .filter(
              item => SUBJECT_TYPE === item.type && RELATIONS.includes(item.relation)
            )
            .sort((a, b) => asc(a.id, b.id))
            .map(item => ({
              id: item.id,
              image: item?.images?.common || '',
              name: item.name,
              name_cn: item.name_cn
            }))

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
      1
    )
    this.setState({
      relations
    })

    setTimeout(() => {
      this.setState({
        ...excludeState
      })
    }, 1600)

    return true
  }

  fetchSubjects = async (subjectIds = []) => {
    const now = getTimestamp()
    const fetchs = []

    subjectIds.forEach(subjectId => {
      if (loaded[subjectId]) return true

      const subject = this.subject(subjectId)
      if (subject._loaded && now - subject._loaded <= DISTANCE) return true

      loaded[subjectId] = true
      fetchs.push(async () => {
        const data = await request(`https://api.bgm.tv/v0/subjects/${subjectId}`)
        if (!data?.id) return false

        this.setState({
          subjects: {
            [subjectId]: {
              id: subjectId,
              name: data.name,
              name_cn: data.name_cn,
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

    await queue(fetchs, 1)
    this.setStorage(undefined, undefined, namespace)

    return true
  }

  /**
   * 建立系列关系列表
   */
  calculateData = () => {
    const { relations } = this.state
    const indexes = {}
    const data = []

    Object.keys(relations)
      .sort((a, b) => asc(a, b))
      .forEach(id => {
        const ids = [Number(id)]
        relations[id].forEach(item => {
          ids.push(item.id)
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
      data: data.map(item => {
        const id = Math.min(...item) // 暂时以最小的subjectId作为一个关联系列的pid
        return {
          id,
          data: Array.from(new Set(item))
            .filter(item => item !== id)
            .sort((a, b) => asc(a, b))
        }
      }),
      _loaded: getTimestamp()
    })
  }

  /**
   * 下一页
   * @param {*} list
   */
  onPage = list => {
    const subjectIds = []
    list.forEach(item => {
      subjectIds.push(item.id, ...item.data)
    })
    this.fetchSubjects(subjectIds)
  }

  // -------------------- get --------------------
  @computed get userId() {
    return userStore.usersInfo(userStore.myUserId).username || userStore.myUserId
  }

  @computed get subjectIds() {
    return (
      this.state.collections
        .reverse()
        // .filter((item, index) => index <= 20)
        .map(item => item.id)
    )
  }

  collections(subjectIds) {
    return computed(() => {
      const { collections } = this.state
      const data = {}
      subjectIds.forEach(subjectId => {
        const item = collections.find(item => item.id === subjectId)
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
}
