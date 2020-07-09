/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-08 09:57:30
 */
import { Alert } from 'react-native'
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { toFixed, getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { confirm, info } from '@utils/ui'
import {
  SORT_SC,
  SORT_GX,
  SORT_GXB,
  SORT_SDGX,
  SORT_SDGXB,
  SORT_CGS,
  SORT_GDZC,
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
  SORT_SC,
  SORT_HYD,
  SORT_DQJ,
  SORT_DJ,
  SORT_CGS,
  SORT_GDZC,
  SORT_GX,
  SORT_SDGX,
  SORT_SCJ,
  SORT_DQZD,
  SORT_CCJZ,
  SORT_XFJL,
  SORT_FHL,
  SORT_GXB,
  SORT_SDGXB
]
const namespace = 'ScreenTinygrailCharaAssets'

export default class ScreenTinygrailCharaAssets extends store {
  state = observable({
    page: 0,
    sort: '',
    direction: '', // void | down | up
    go: '卖出',
    editing: false, // 是否批量选择中
    editingIds: {}, // 选中的角色id
    _loaded: false
  })

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - _loaded > 60

    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      editing: false,
      _loaded: needFetch ? current : _loaded
    })
    this.clearState('editingIds', {})

    if (this.userId) {
      this.fetchMyCharaAssets()
      this.fetchTemple()
    } else if (needFetch) {
      this.fetchMyCharaAssets()
      this.fetchMpi()
    }

    // const data = await tinygrailStore.doLink({
    //   monoId: 45099,
    //   toMonoId: 26394
    // })
    // log(data)

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
        .map(v => ({
          id: Number(v[1]),
          name: v[2],
          num: Number(v[3])
        }))

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
          .join('，')}，价值${toFixed(total, 2)}`,
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
  fetchMyCharaAssets = () => {
    if (this.userId) {
      return tinygrailStore.fetchCharaAssets(this.userId)
    }
    return tinygrailStore.fetchMyCharaAssets()
  }

  fetchTemple = () => tinygrailStore.fetchTemple(this.userId)

  /**
   * ICO最高人气
   * 用于整合数据来解决我的ICO列表中, 进度条没有参与者数的问题
   */
  fetchMpi = () => tinygrailStore.fetchList('mpi')

  // -------------------- get --------------------
  @computed get userId() {
    const { userId } = this.params
    return userId
  }

  @computed get myCharaAssets() {
    if (this.userId) {
      // 统一他人和自己持仓的数据结构
      const { characters, initials } = tinygrailStore.charaAssets(this.userId)
      const _loaded = getTimestamp()
      return {
        chara: {
          list: characters,
          pagination: {
            page: 1,
            pageTotal: 1
          },
          _loaded
        },
        ico: {
          list: initials,
          pagination: {
            page: 1,
            pageTotal: 1
          },
          _loaded
        },
        _loaded
      }
    }
    return tinygrailStore.myCharaAssets
  }

  @computed get temple() {
    return tinygrailStore.temple(this.userId)
  }

  @computed get mpi() {
    return computed(() => tinygrailStore.list('mpi')).get()
  }

  @computed get mpiUsers() {
    const users = {}
    const { list } = this.mpi
    list.forEach(item => (users[item.id] = item.users))
    return users
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

  onSelectGo = title => {
    t('我的持仓.设置前往', {
      title
    })

    this.setState({
      go: title
    })
    this.setStorage(undefined, undefined, namespace)
  }

  tabChangeCallback = page => {
    if (this.userId) {
      return
    }

    const { _loaded } = this.myCharaAssets
    if (!_loaded) {
      this.fetchMyCharaAssets()
    }

    if (page === 2) {
      this.fetchTemple()
    }

    const { editing } = this.state
    if (editing) {
      this.toggleBatchEdit()
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

  toggleBatchEdit = () => {
    const { editing } = this.state
    this.setState({
      editing: !editing
    })
    this.clearState('editingIds', {})
  }

  toggleEditingId = (id, count) => {
    const { editingIds } = this.state
    const _editingIds = {
      ...editingIds
    }

    if (_editingIds[id]) {
      delete _editingIds[id]
    } else {
      _editingIds[id] = count
    }

    this.clearState('editingIds', _editingIds)
  }

  // -------------------- action --------------------
  doBatchSacrifice = () => {
    const { editingIds } = this.state
    const ids = Object.keys(editingIds)
    if (!ids.length) {
      return
    }

    confirm(
      `批量献祭${ids.length}个角色的所有流动股份, 该操作不能撤回, 确定? (若角色当前有挂单, 可用数与显示数对不上时, 不会自动献祭成功)`,
      async () => {
        t('我的持仓.批量献祭', {
          length: ids.length
        })

        const errorIds = []
        for (const id of ids) {
          try {
            const { State } = await tinygrailStore.doSacrifice({
              monoId: id,
              amount: editingIds[id],
              isSale: false
            })
            if (State === 1) {
              errorIds.push(id)
            }
          } catch (error) {
            errorIds.push(id)
          }
          info(
            `正在献祭 ${ids.findIndex(item => item === id) + 1} / ${ids.length}`
          )
        }

        this.fetchMyCharaAssets()
        if (errorIds.length) {
          Alert.alert('小圣杯助手', `共有${errorIds.length}个角色献祭失败`, [
            {
              text: '知道了'
            }
          ])
        } else {
          info('操作完成')
        }
        this.toggleBatchEdit()
      },
      '警告'
    )
  }
}
