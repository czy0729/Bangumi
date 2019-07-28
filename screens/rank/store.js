/*
 * @Author: czy0729
 * @Date: 2019-06-08 03:11:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-28 18:10:35
 */
import { observable, computed } from 'mobx'
import { tagStore } from '@stores'
import { open } from '@utils'
import store from '@utils/store'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { HTML_RANK } from '@constants/html'

const namespace = 'ScreenRank'
const defaultType = MODEL_SUBJECT_TYPE.getLabel('动画')

export default class ScreenRank extends store {
  state = observable({
    type: defaultType,
    filter: '',
    airtime: '',
    list: true, // list | grid
    hide: false, // 用于列表置顶
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      hide: false,
      _loaded: true
    })

    return this.fetchRank(true)
  }

  // -------------------- get --------------------
  @computed get rank() {
    const { type } = this.state
    return tagStore.rank(type)
  }

  // -------------------- fetch --------------------
  fetchRank = refresh => {
    const { type, filter, airtime } = this.state
    return tagStore.fetchRank(
      {
        type,
        filter,
        airtime
      },
      refresh
    )
  }

  // -------------------- page --------------------
  onTypeSelect = async (type, navigation) => {
    this.setState({
      type: MODEL_SUBJECT_TYPE.getLabel(type),
      filter: '',
      airtime: ''
    })
    await this.fetchRank(true)
    this.setStorage(undefined, undefined, namespace)

    this.setState({
      hide: true
    })
    setTimeout(() => {
      this.setState({
        hide: false
      })
      this.updateNavigationParams(navigation)
    }, 200)
  }

  onFilterSelect = async (filter, filterData, navigation) => {
    this.setState({
      filter: filter === '全部' ? '' : filterData.getValue(filter)
    })
    await this.fetchRank(true)
    this.setStorage(undefined, undefined, namespace)

    this.setState({
      hide: true
    })
    setTimeout(() => {
      this.setState({
        hide: false
      })
      this.updateNavigationParams(navigation)
    }, 200)
  }

  onAirdateSelect = async (airtime, navigation) => {
    this.setState({
      airtime: airtime === '全部' ? '' : airtime
    })
    await this.fetchRank(true)
    this.setStorage(undefined, undefined, namespace)

    this.setState({
      hide: true
    })
    setTimeout(() => {
      this.setState({
        hide: false
      })
      this.updateNavigationParams(navigation)
    }, 200)
  }

  toggleList = () => {
    const { list } = this.state
    this.setState({
      list: !list
    })
    this.setStorage(undefined, undefined, namespace)

    this.setState({
      hide: true
    })
    setTimeout(() => {
      this.setState({
        hide: false
      })
    }, 0)
  }

  /**
   * 根据筛选更新右上角浏览器打开的地址
   */
  updateNavigationParams = navigation => {
    const { type, filter, airtime } = this.state
    const url = HTML_RANK(type, undefined, undefined, filter, airtime)
    navigation.setParams({
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          switch (key) {
            case '浏览器查看':
              open(url)
              break
            default:
              break
          }
        }
      }
    })
    return url
  }

  // -------------------- action --------------------
}
