/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:44:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-23 21:40:21
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { HTMLDecode } from '@utils/html'
import { LIST_EMPTY, NING_MOE_HOST } from '@constants'

const namespace = 'Discovery'
const initNingMoeDetailItem = {
  id: '',
  bgmId: '',
  eps: []
}

class Discovery extends store {
  state = observable({
    random: LIST_EMPTY,
    ningMoeDetail: {
      // [bgmId]: initNingMoeDetailItem
    }
  })

  async init() {
    const res = Promise.all([this.getStorage('ningMoeDetail', namespace)])
    const state = await res
    this.setState({
      ningMoeDetail: state[0] || {}
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

        random = {
          list: refresh ? nextList : [...list, ...nextList],
          pagination: {
            page: pagination.page + 1,
            pageTotal: 100
          },
          _loaded: getTimestamp()
        }
        this.setState({
          random
        })
      }

      return Promise.resolve(random)
    } catch (error) {
      return Promise.resolve(LIST_EMPTY)
    }
  }

  /**
   * 搜索柠萌条目信息
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
          const { id, bgm_id: bgmId } = data.data[0].classification
          ningMoeDetail = {
            id,
            bgmId
          }
          this.setState({
            ningMoeDetail: {
              [bgmId]: ningMoeDetail
            }
          })
        }
      }

      return Promise.resolve(ningMoeDetail)
    } catch (error) {
      return Promise.resolve(initNingMoeDetailItem)
    }
  }

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
          ningMoeDetail: {
            [bgmId]: ningMoeDetail
          }
        })
      }

      return Promise.resolve(ningMoeDetail)
    } catch (error) {
      return Promise.resolve(initNingMoeDetailItem)
    }
  }

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
      console.log(data)
      let ningMoeRealYunUrl = ''
      if (data.code === 200) {
        ningMoeRealYunUrl = data.data.yun_url
      }

      return Promise.resolve(ningMoeRealYunUrl)
    } catch (error) {
      return Promise.resolve('')
    }
  }
}

export default new Discovery()
