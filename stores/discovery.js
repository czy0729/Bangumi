/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:44:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-24 21:35:54
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { HTMLDecode } from '@utils/html'
import { LIST_EMPTY, NING_MOE_HOST, ANITAMA_HOST } from '@constants'

const namespace = 'Discovery'
const initNingMoeDetailItem = {
  id: '',
  bgmId: '',
  eps: []
}
const initAnitamaTimelineItem = {
  list: []
}

class Discovery extends store {
  state = observable({
    random: LIST_EMPTY,
    ningMoeDetail: {
      // [bgmId]: initNingMoeDetailItem
    },
    anitamaTimeline: {
      // [page]: anitamaTimelineItem
    }
  })

  async init() {
    const res = Promise.all([
      this.getStorage('random', namespace),
      this.getStorage('ningMoeDetail', namespace),
      this.getStorage('anitamaTimeline', namespace)
    ])
    const state = await res
    this.setState({
      random: state[0] || LIST_EMPTY,
      ningMoeDetail: state[1] || {},
      anitamaTimeline: state[2] || {}
    })

    return res
  }

  // -------------------- get --------------------
  @computed get random() {
    return this.state.random || LIST_EMPTY
  }

  ningMoeDetail(bgmId) {
    return computed(
      () => this.state.ningMoeDetail[bgmId] || initNingMoeDetailItem
    ).get()
  }

  anitamaTimeline(page = 1) {
    return this.state.anitamaTimeline[page] || initAnitamaTimelineItem
  }

  // -------------------- fetch --------------------
  /**
   * 随便看看
   * @param {*} refresh
   */
  async fetchRandom(refresh) {
    try {
      const { list, pagination } = this.random
      const data = await fetch(`${NING_MOE_HOST}/api/get_random_bangumi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          current_list: refresh ? '[]' : `[${list.map(item => item.id).join()}]`
        })
      }).then(response => response.json())

      let random
      if (data.code === 200) {
        const nextList = data.data.map(({ classification: item }) => ({
          id: item.id,
          bgmId: item.bgm_id,
          cover: item.bangumi_cover,
          jp: HTMLDecode(item.en_name),
          cn: HTMLDecode(item.cn_name),
          desc: item.description,
          eps: item.eps,
          airDate: item.air_date
        }))

        const key = 'random'
        random = {
          list: refresh ? nextList : [...list, ...nextList],
          pagination: {
            page: pagination.page + 1,
            pageTotal: 100
          },
          _loaded: getTimestamp()
        }
        this.setState({
          [key]: random
        })
        this.setStorage(key, undefined, namespace)
      }

      return Promise.resolve(random)
    } catch (error) {
      return Promise.resolve(LIST_EMPTY)
    }
  }

  /**
   * 搜索柠萌动漫信息
   * @param {*} keyword 关键字
   */
  async fetchNingMoeDetailBySearch({ keyword }) {
    try {
      const data = await fetch(`${NING_MOE_HOST}/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          bangumi_type: '',
          keyword,
          limit: 10,
          page: 1,
          token: null,
          type: 'anime'
        })
      }).then(response => response.json())

      let ningMoeDetail = initNingMoeDetailItem
      if (data.code === 200) {
        if (Array.isArray(data.data)) {
          const key = 'ningMoeDetail'
          const { id, bgm_id: bgmId } = data.data[0].classification
          ningMoeDetail = {
            id,
            bgmId
          }
          this.setState({
            [key]: {
              [bgmId]: ningMoeDetail
            }
          })
          this.setStorage(key, undefined, namespace)
        }
      }

      return Promise.resolve(ningMoeDetail)
    } catch (error) {
      return Promise.resolve(initNingMoeDetailItem)
    }
  }

  /**
   * 查询柠萌动漫信息
   * @param {*} id
   * @param {*} bgmId
   */
  async fetchNingMoeDetail({ id, bgmId }) {
    try {
      const data = await fetch(`${NING_MOE_HOST}/api/get_bangumi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          bangumi_id: id
        })
      }).then(response => response.json())

      let ningMoeDetail = initNingMoeDetailItem
      if (data.code === 200) {
        const key = 'ningMoeDetail'
        ningMoeDetail = {
          id,
          bgmId

          // @todo 暂时不做播放视频, 所以bakUrl无意义
          // eps: data.data.posts.reverse().map(item => ({
          //   bakUrl: item.bak_url,
          //   sort: item.eps
          // }))
        }
        this.setState({
          [key]: {
            [bgmId]: ningMoeDetail
          }
        })
        this.setStorage(key, undefined, namespace)
      }

      return Promise.resolve(ningMoeDetail)
    } catch (error) {
      return Promise.resolve(initNingMoeDetailItem)
    }
  }

  /**
   * 查询真正的云盘地址
   * @param {*} url
   */
  async fetchNingMoeRealYunUrl({ url }) {
    try {
      const data = await fetch(`${NING_MOE_HOST}/api/get_real_yun_url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          url
        })
      }).then(response => response.json())

      let ningMoeRealYunUrl = ''
      if (data.code === 200) {
        ningMoeRealYunUrl = data.data.yun_url
      }

      return Promise.resolve(ningMoeRealYunUrl)
    } catch (error) {
      return Promise.resolve('')
    }
  }

  /**
   * Anitama文章列表
   */
  async fetchAnitamaTimeline(page = 1) {
    const data = await fetch(`${ANITAMA_HOST}/timeline?pageNo=${page}`).then(
      response => response.json()
    )

    let animataTimeline = initAnitamaTimelineItem
    if (data.status === 200 && data.success) {
      const key = 'anitamaTimeline'
      animataTimeline = {
        list: data.data.page.list.filter(item => item.entryType === 'article'),
        _loaded: getTimestamp()
      }
      this.setState({
        [key]: {
          [page]: animataTimeline
        }
      })
      this.setStorage(key, undefined, namespace)
    }

    return Promise.resolve(animataTimeline)
  }
}

export default new Discovery()
