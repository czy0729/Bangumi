/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:44:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-09 18:39:53
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { HTMLDecode } from '@utils/html'
import { LIST_EMPTY, NING_MOE_HOST, ANITAMA_HOST } from '@constants'
import {
  NAMESPACE,
  INIT_NINGMOE_DETAIL_ITEM,
  INIT_ANITAMA_TIMELINE_ITEM
} from './init'

class Discovery extends store {
  state = observable({
    random: LIST_EMPTY,

    ningMoeDetail: {
      // [bgmId]: INIT_NINGMOE_DETAIL_ITEM
    },

    anitamaTimeline: {
      // [page]: INIT_ANITAMA_TIMELINE_ITEM
    },

    // 收藏的角色
    character: LIST_EMPTY,

    // 收藏的人物
    person: LIST_EMPTY,

    // 人物的更新
    characterRecent: LIST_EMPTY
  })

  async init() {
    const res = Promise.all([
      this.getStorage('random', NAMESPACE),
      this.getStorage('ningMoeDetail', NAMESPACE)
    ])
    const state = await res
    this.setState({
      random: state[0] || LIST_EMPTY,
      ningMoeDetail: state[1] || {}
    })

    return res
  }

  // -------------------- get --------------------
  @computed get random() {
    return this.state.random || LIST_EMPTY
  }

  ningMoeDetail(bgmId) {
    return computed(
      () => this.state.ningMoeDetail[bgmId] || INIT_NINGMOE_DETAIL_ITEM
    ).get()
  }

  anitamaTimeline(page = 1) {
    return this.state.anitamaTimeline[page] || INIT_ANITAMA_TIMELINE_ITEM
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
        this.setStorage(key, undefined, NAMESPACE)
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

      let ningMoeDetail = INIT_NINGMOE_DETAIL_ITEM
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
          this.setStorage(key, undefined, NAMESPACE)
        }
      }

      return Promise.resolve(ningMoeDetail)
    } catch (error) {
      return Promise.resolve(INIT_NINGMOE_DETAIL_ITEM)
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

      let ningMoeDetail = INIT_NINGMOE_DETAIL_ITEM
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
        this.setStorage(key, undefined, NAMESPACE)
      }

      return Promise.resolve(ningMoeDetail)
    } catch (error) {
      return Promise.resolve(INIT_NINGMOE_DETAIL_ITEM)
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

    let animataTimeline = INIT_ANITAMA_TIMELINE_ITEM
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
    }

    return Promise.resolve(animataTimeline)
  }
}

export default new Discovery()
