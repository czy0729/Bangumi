/*
 * @Author: czy0729
 * @Date: 2019-06-08 03:11:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-20 16:51:36
 */
import { observable, computed } from 'mobx'
import { tagStore } from '@stores'
import { open } from '@utils'
import store from '@utils/store'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { HTML_RANK } from '@constants/html'

const namespace = 'ScreenRank'
const defaultType = MODEL_SUBJECT_TYPE.getLabel('动画')

export default class ScreenRank extends store {
  state = observable({
    type: defaultType,
    filter: '',
    airtime: '',
    month: '',
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
    const { type, filter, airtime, month } = this.state
    return tagStore.fetchRank(
      {
        type,
        filter,
        airtime: month ? `${airtime}-${month}` : airtime
      },
      refresh
    )
  }

  // -------------------- page --------------------
  onTypeSelect = async (type, navigation) => {
    t('排行榜.类型选择', {
      type
    })

    this.setState({
      type: MODEL_SUBJECT_TYPE.getLabel(type),
      filter: '',
      airtime: '',
      month: ''
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
    t('排行榜.筛选选择', {
      filter
    })

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
    t('排行榜.年选择', {
      airtime
    })

    this.setState({
      airtime: airtime === '全部' ? '' : airtime,
      month: ''
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

  onMonthSelect = async month => {
    const { airtime } = this.state
    if (airtime === '') {
      info('请先选择年')
      return
    }

    t('排行榜.月选择', {
      month
    })
    this.setState({
      month: month === '全部' ? '' : month
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
    }, 0)
  }

  toggleList = () => {
    const { list } = this.state
    t('排行榜.切换布局', {
      list: !list
    })

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
          t('排行榜.右上角菜单', {
            key
          })
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
}
