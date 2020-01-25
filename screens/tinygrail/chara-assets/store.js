/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-24 16:56:03
 */
import { Alert } from 'react-native'
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'
import { t } from '@utils/fetch'
import {
  SORT_GX,
  SORT_GXB,
  SORT_SDGX,
  SORT_SDGXB,
  SORT_CGS,
  SORT_CCJZ,
  SORT_HYD,
  SORT_SCJ,
  SORT_FHL,
  SORT_DQJ,
  SORT_DQZD,
  SORT_XFJL,
  SORT_DJ
} from '../_/utils'

export const tabs = [
  {
    title: '人物',
    key: 'chara'
  },
  {
    title: '圣殿',
    key: 'temple'
  },
  {
    title: 'ICO',
    key: 'ico'
  }
]
export const sortDS = [
  SORT_HYD,
  SORT_CGS,
  SORT_GX,
  SORT_GXB,
  SORT_SDGX,
  SORT_SDGXB,
  SORT_DQJ,
  SORT_SCJ,
  SORT_DQZD,
  SORT_DJ,
  SORT_CCJZ,
  SORT_XFJL,
  SORT_FHL
]
const namespace = 'ScreenTinygrailCharaAssets'

export default class ScreenTinygrailCharaAssets extends store {
  state = observable({
    page: 0,
    sort: '',
    direction: '', // void | down | up
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })

    this.fetchMyCharaAssets()
    return res
  }

  /**
   * 刮刮乐动作进入, 锁定到最近活跃|倒序
   * 请求完资产后, 根据message显示上次刮刮乐总价值
   */
  initFormLottery = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      page: 0,
      sort: SORT_HYD.value,
      direction: 'down',
      _loaded: true
    })

    const { chara } = await this.fetchMyCharaAssets()
    try {
      const { message = '' } = this.params
      const { list } = chara
      const items = message
        .split('#')
        .map(v => /(\d+)「(.+)」(\d+)股/.exec(v))
        .filter(v => v)
        .map(v => ({ id: Number(v[1]), name: v[2], num: Number(v[3]) }))

      let total = 0
      items.forEach(item => {
        const find = list.find(i => i.id === item.id)
        if (find) {
          total += item.num * find.current
        }
      })

      Alert.alert(
        '小圣杯助手',
        `本次刮刮乐：${items
          .map(item => `${item.name}x${item.num}`)
          .join('，')}，价值₵${total}`,
        [
          {
            text: '知道了'
          }
        ]
      )
    } catch (error) {
      // do nothing
    }

    return res
  }

  // -------------------- fetch --------------------
  fetchMyCharaAssets = () => tinygrailStore.fetchMyCharaAssets()

  fetchTemple = () => tinygrailStore.fetchTemple()

  // -------------------- get --------------------
  @computed get myCharaAssets() {
    return tinygrailStore.myCharaAssets
  }

  @computed get temple() {
    return tinygrailStore.temple()
  }

  // -------------------- page --------------------
  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    t('我的持仓.标签页切换', {
      page
    })

    this.setState({
      page
    })
    this.setStorage(undefined, undefined, namespace)
    this.tabChangeCallback(page)
  }

  tabChangeCallback = page => {
    const { _loaded } = this.myCharaAssets
    if (!_loaded) {
      this.fetchMyCharaAssets()
    }

    if (page === 2) {
      this.fetchTemple()
    }
  }

  onSortPress = item => {
    const { sort, direction } = this.state
    if (item === sort) {
      let nextSort = item
      let nextDirection = 'down'
      if (direction === 'down') {
        nextDirection = 'up'
      } else if (direction === 'up') {
        nextSort = ''
        nextDirection = ''
      }

      t('我的持仓.排序', {
        sort: nextSort,
        direction: nextDirection
      })

      this.setState({
        sort: nextSort,
        direction: nextDirection
      })
    } else {
      t('我的持仓.排序', {
        sort: item,
        direction: 'down'
      })

      this.setState({
        sort: item,
        direction: 'down'
      })
    }

    this.setStorage(undefined, undefined, namespace)
  }
}
