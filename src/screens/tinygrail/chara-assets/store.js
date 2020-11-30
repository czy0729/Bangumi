/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-30 19:44:03
 */
import { Alert, Clipboard } from 'react-native'
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { toFixed, getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { confirm, info, feedback } from '@utils/ui'
import {
  relation,
  levelList,
  sortList,
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
    title: 'ICO',
    key: 'ico'
  },
  {
    title: '圣殿',
    key: 'temple'
  }
]
export const sortDS = [
  SORT_SC,
  SORT_CGS,
  SORT_DQJ,
  SORT_HYD,
  SORT_GDZC,
  SORT_DJ,
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
const excludeState = {
  editing: false, // 是否批量选择中
  editingIds: {}, // 选中的角色id
  batchAction: '' // 批量动作
}
const perBatchCount = 10

export default class ScreenTinygrailCharaAssets extends store {
  state = observable({
    page: 0,
    level: '',
    sort: '',
    direction: '', // void | down | up
    go: '卖出',
    ...excludeState,
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
      ...excludeState,
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
  fetchMyCharaAssets = () =>
    this.userId
      ? tinygrailStore.fetchCharaAssets(this.userId)
      : tinygrailStore.fetchMyCharaAssets()

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
        chara: relation({
          list: characters,
          pagination: {
            page: 1,
            pageTotal: 1
          },
          _loaded
        }),
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

    return {
      ...tinygrailStore.myCharaAssets,
      chara: relation(tinygrailStore.myCharaAssets.chara)
    }
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

  @computed get charaList() {
    const { chara } = this.myCharaAssets
    const { sort, level, direction } = this.state
    let data = chara
    if (level) {
      data = {
        ...data,
        list: levelList(level, data.list)
      }
    }

    if (sort) {
      data = {
        ...data,
        list: sortList(sort, direction, data.list)
      }
    }

    return data
  }

  @computed get levelMap() {
    const { chara } = this.myCharaAssets
    const data = {}
    chara.list.forEach(item =>
      data[item.level] ? (data[item.level] += 1) : (data[item.level] = 1)
    )
    return data
  }

  // -------------------- page --------------------
  onChange = page => {
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

  onLevelSelect = level => {
    this.setState({
      level
    })

    this.setStorage(undefined, undefined, namespace)
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

  toggleBatchEdit = (batchAction = '') => {
    const { editing } = this.state
    this.setState({
      editing: !editing,
      batchAction
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

  increaseBatchSelect = () => {
    const { editingIds } = this.state
    const { list } = this.charaList

    const _editingIds = {
      ...editingIds
    }
    const ids = Object.keys(_editingIds)
    let startIndex = -1
    let count = 0
    if (ids.length) {
      // 多选模式选择要从最后选择的角色索引处开始
      startIndex = Math.max(
        ...ids.map(id => list.findIndex(item => item.id == id))
      )
    }

    list
      .filter((item, index) => index > startIndex)
      .forEach(item => {
        if (count >= perBatchCount) return
        _editingIds[item.id] = item.state || 0
        count += 1
      })
    this.setState({
      editingIds: _editingIds
    })

    const start = startIndex === -1 ? 1 : startIndex + 2
    info(`已选 ${start} - ${start + perBatchCount - 1}`)
  }

  // -------------------- action --------------------
  /**
   * 批量献祭
   * @param {*} isSale
   */
  doBatchSacrifice = (isSale = false) => {
    const { editingIds } = this.state
    const ids = Object.keys(editingIds)
    if (!ids.length) {
      return
    }

    const action = isSale ? '出售' : '献祭'
    confirm(
      `批量 (${action}) (${ids.length}) 个角色的所有流动股份, 该操作不能撤回, 确定? (若角色当前有挂单, 可用数与显示数对不上时, 操作会失败)`,
      async () => {
        t('我的持仓.批量献祭', {
          length: ids.length,
          isSale
        })

        const successIds = []
        const errorIds = []
        for (const id of ids) {
          try {
            const { State } = await tinygrailStore.doSacrifice({
              monoId: id,
              amount: editingIds[id],
              isSale
            })

            if (State === 1) {
              errorIds.push(id)
            } else {
              successIds.push(id)
            }
          } catch (error) {
            errorIds.push(id)
          }
          info(
            `正在献祭 ${ids.findIndex(item => item === id) + 1} / ${ids.length}`
          )
        }
        feedback()

        // 当成功数量少于20个, 使用局部更新
        if (successIds.length <= 20) {
          tinygrailStore.batchUpdateMyCharaAssetsByIds(successIds)
        } else {
          this.fetchMyCharaAssets()
        }

        if (errorIds.length) {
          Alert.alert(
            '小圣杯助手',
            `共有 (${errorIds.length}) 个角色 (${action}) 失败`,
            [
              {
                text: '知道了'
              }
            ]
          )
        } else {
          info('操作完成')
        }
        this.toggleBatchEdit()
      },
      '警告'
    )
  }

  /**
   * 批量以当前价挂卖单
   */
  doBatchAsk = async () => {
    const { editingIds } = this.state
    const ids = Object.keys(editingIds)
    if (!ids.length) {
      return
    }

    confirm(
      `批量对 (${ids.length}) 个角色以当前价 (挂卖单), 确定? (若角色当前有挂单, 可用数与显示数对不上时, 操作会失败)`,
      async () => {
        t('我的持仓.批量挂单', {
          length: ids.length
        })

        const { list } = this.charaList
        const successIds = []
        const errorIds = []
        for (const id of ids) {
          try {
            const item = list.find(item => item.id == id)
            if (item) {
              const { current, state } = item
              const { State } = await tinygrailStore.doAsk({
                monoId: id,
                price: current,
                amount: state
              })

              if (State === 1) {
                errorIds.push(id)
              } else {
                successIds.push(id)
              }
            }
          } catch (error) {
            errorIds.push(id)
          }
          info(
            `正在挂卖单 ${ids.findIndex(item => item === id) + 1} / ${
              ids.length
            }`
          )
        }
        feedback()

        // 当成功数量少于20个, 使用局部更新
        if (successIds.length <= 20) {
          tinygrailStore.batchUpdateMyCharaAssetsByIds(successIds)
        } else {
          this.fetchMyCharaAssets()
        }

        if (errorIds.length) {
          Alert.alert(
            '小圣杯助手',
            `共有 (${errorIds.length}) 个角色 (挂卖单) 失败`,
            [
              {
                text: '知道了'
              }
            ]
          )
        } else {
          info('操作完成')
        }
        this.toggleBatchEdit()
      },
      '警告'
    )
  }

  /**
   * 批量生成分享粘贴板
   */
  doBatchShare = async () => {
    const { editingIds } = this.state
    const ids = Object.keys(editingIds)
    if (!ids.length) {
      return
    }

    const { page } = this.state
    const list = page === 1 ? this.myCharaAssets.ico : this.charaList
    const items = []
    for (const id of ids) {
      try {
        const item = list.list.find(item => item.id == id)
        if (item) {
          items.push(item)
        }
      } catch (error) {
        warn(error)
      }
    }

    Clipboard.setString(
      items
        .map(
          item =>
            `https://bgm.tv/character/${item.monoId || item.id}\n${item.name}`
        )
        .join('\n')
    )
    info(`已复制 ${items.length} 个角色的分享链接`)
    this.toggleBatchEdit()
  }
}
