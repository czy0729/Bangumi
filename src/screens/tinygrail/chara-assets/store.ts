/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 04:02:04
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { toFixed, getTimestamp, copy, alert, confirm, info, feedback } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { relation, levelList, sortList, SORT_HYD } from '@tinygrail/_/utils'
import { NAMESPACE, PER_BATCH_COUNT, STATE, EXCLUDE_STATE } from './ds'
import { Direction, Params } from './types'

export default class ScreenTinygrailCharaAssets extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60

    const state = await this.getStorage(undefined, NAMESPACE)
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
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

    return state
  }

  /** 刮刮乐动作进入, 锁定到最近活跃|倒序, 请求完资产后, 根据 message 显示上次刮刮乐总价值 */
  initFormLottery = async () => {
    const state = await this.getStorage(undefined, NAMESPACE)
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

      alert(
        `本次刮刮乐：${items
          .map(item => `${item.name}x${item.num}`)
          .join('，')}，价值${toFixed(total, 2)}`,
        '小圣杯助手'
      )
    } catch (error) {}

    return state
  }

  // -------------------- fetch --------------------
  /** 用户资产概览信息 */
  fetchMyCharaAssets = () => {
    return this.userId
      ? tinygrailStore.fetchCharaAssets(this.userId)
      : tinygrailStore.fetchMyCharaAssets()
  }

  /** 用户圣殿 */
  fetchTemple = () => {
    return tinygrailStore.fetchTemple(this.userId)
  }

  /** ICO 最高人气, 用于整合数据来解决我的 ICO 列表中, 进度条没有参与者数的问题 */
  fetchMpi = () => {
    return tinygrailStore.fetchList('mpi')
  }

  // -------------------- get --------------------
  @computed get userId() {
    const { userId } = this.params
    return userId
  }

  /** 用户资产概览信息 */
  @computed get myCharaAssets() {
    // 我的持仓页面支持自己和他人公用, 当有用户 id 时, 为显示他人持仓页面
    if (this.userId) {
      // 构造跟自己持仓一样的数据结构
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

  /** 用户圣殿 */
  @computed get temple() {
    return tinygrailStore.temple(this.userId)
  }

  /** ICO 最高人气, 用于显示自己当前参与的 ICO */
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

  /** 人物和圣殿合并成总览列表 */
  @computed get mergeList() {
    const { chara } = this.myCharaAssets
    const { temple } = this
    const map = {}
    chara.list.forEach(item => (map[item.id] = item))
    temple.list.forEach(item => {
      if (!map[item.id]) {
        map[item.id] = {
          ...tinygrailStore.characters(item.id),
          id: item.id,
          icon: item.cover,
          level: item.level,
          monoId: item.id,
          name: item.name,
          rank: item.rank,
          rate: item.rate,
          sacrifices: item.sacrifices,
          assets: item.assets,
          starForces: item.starForces,
          stars: item.stars
        }
      } else {
        map[item.id] = {
          ...map[item.id],
          rank: item.rank,
          sacrifices: item.sacrifices,
          assets: item.assets
        }
      }
    })

    const { sort, level, direction } = this.state
    let list = Object.values(map)
    if (level) list = levelList(level, list)
    if (sort) list = sortList(sort, direction, list)
    return relation({
      list,
      pagination: {
        page: 1,
        pageTotal: 1
      },
      _loaded: getTimestamp()
    })
  }

  // -------------------- page --------------------
  onChange = (page: number) => {
    if (page === this.state.page) return

    t('我的持仓.标签页切换', {
      page
    })

    this.setState({
      page
    })
    this.setStorage(NAMESPACE)
    this.tabChangeCallback(page)
  }

  onSelectGo = (title: string) => {
    t('我的持仓.设置前往', {
      title
    })

    this.setState({
      go: title
    })
    this.setStorage(NAMESPACE)
  }

  tabChangeCallback = (page: number) => {
    if (this.userId) return

    const { _loaded } = this.myCharaAssets
    if (!_loaded) this.fetchMyCharaAssets()

    if (page === 2) this.fetchTemple()

    const { editing } = this.state
    if (editing) this.toggleBatchEdit()
  }

  onLevelSelect = (level: any) => {
    this.setState({
      level
    })

    this.setStorage(NAMESPACE)
  }

  onSortPress = (item: string) => {
    const { sort, direction } = this.state
    if (item === sort) {
      let nextSort = item
      let nextDirection: Direction = 'down'
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

    this.setStorage(NAMESPACE)
  }

  toggleBatchEdit = (batchAction = '') => {
    const { editing } = this.state
    this.setState({
      editing: !editing,
      batchAction
    })
    this.clearState('editingIds', {})
  }

  toggleEditingId = (id: string | number, count: any) => {
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
      startIndex = Math.max(...ids.map(id => list.findIndex(item => item.id == id)))
    }

    list
      .filter((item, index) => index > startIndex)
      .forEach(item => {
        if (count >= PER_BATCH_COUNT) return
        _editingIds[item.id] = item.state || 0
        count += 1
      })
    this.setState({
      editingIds: _editingIds
    })

    const start = startIndex === -1 ? 1 : startIndex + 2
    info(`已选 ${start} - ${start + PER_BATCH_COUNT - 1}`)
  }

  // -------------------- action --------------------
  /** 批量献祭 */
  doBatchSacrifice = (isSale: boolean = false) => {
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
          info(`正在献祭 ${ids.findIndex(item => item === id) + 1} / ${ids.length}`)
        }
        feedback()

        // 当成功数量少于20个, 使用局部更新
        if (successIds.length <= 20) {
          tinygrailStore.batchUpdateMyCharaAssetsByIds(successIds)
        } else {
          this.fetchMyCharaAssets()
        }

        if (errorIds.length) {
          alert(`共有 (${errorIds.length}) 个角色 (${action}) 失败`, '小圣杯助手')
        } else {
          info('操作完成')
        }
        this.toggleBatchEdit()
      },
      '警告'
    )
  }

  /** 批量以当前价挂卖单 */
  doBatchAsk = async () => {
    const { editingIds } = this.state
    const ids = Object.keys(editingIds)
    if (!ids.length) return

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
                amount: state,
                isIce: false
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
          info(`正在挂卖单 ${ids.findIndex(item => item === id) + 1} / ${ids.length}`)
        }
        feedback()

        // 当成功数量少于20个, 使用局部更新
        if (successIds.length <= 20) {
          tinygrailStore.batchUpdateMyCharaAssetsByIds(successIds)
        } else {
          this.fetchMyCharaAssets()
        }

        if (errorIds.length) {
          alert(`共有 (${errorIds.length}) 个角色 (挂卖单) 失败`, '小圣杯助手')
        } else {
          info('操作完成')
        }
        this.toggleBatchEdit()
      },
      '警告'
    )
  }

  /** 批量生成分享粘贴板 */
  doBatchShare = async () => {
    const { editingIds } = this.state
    const ids = Object.keys(editingIds)
    if (!ids.length) return

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
        console.error(error)
      }
    }

    copy(
      items
        .map(item => `https://bgm.tv/character/${item.monoId || item.id}\n${item.name}`)
        .join('\n'),
      `已复制 ${items.length} 个角色的分享链接`
    )
    this.toggleBatchEdit()
  }
}
