/*
 * @Author: czy0729
 * @Date: 2024-10-24 20:22:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-02 23:01:05
 */
import { tinygrailStore } from '@stores'
import { alert, confirm, copy, feedback, info, toFixed } from '@utils'
import { t } from '@utils/fetch'
import { getCharaLevelLowestPrice } from '@screens/tinygrail/_/utils'
import { ITEMS_TYPE } from '@tinygrail/_/characters-modal'
import { ItemUseParams } from '@tinygrail/items/types'
import { FnParams, Override } from '@types'
import { PER_BATCH_COUNT } from '../ds'
import { BatchAction, Direction } from '../types'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 标签页切换 */
  onChange = (page: number) => {
    if (page === this.state.page) return

    this.setState({
      page
    })
    this.save()
    this.tabChangeCallback(page)

    t('我的持仓.标签页切换', {
      page
    })
  }

  /** 设置前往路由 */
  onSelectGo = (title: string) => {
    this.setState({
      go: title
    })
    this.save()

    t('我的持仓.设置前往', {
      title
    })
  }

  /** 查看别人持仓时才会刷新对应数据 */
  tabChangeCallback = (page: number) => {
    if (this.userId) return

    if (!this.myCharaAssets._loaded) this.fetchMyCharaAssets()
    if (page === 2) this.fetchTemple()
    if (this.state.editing) this.toggleBatchEdit()
  }

  /** 选择等级筛选 */
  onLevelSelect = (value: string, key: 'level' | 'templeLevel' = 'level') => {
    this.setState({
      [key]: value
    })
    this.save()
  }

  /** 排序回调 */
  onSortPress = (value: string, key: 'sort' | 'templeSort' = 'sort') => {
    if (value === this.state[key]) {
      const { direction } = this.state
      let nextSort = value
      let nextDirection: Direction = 'down'
      if (direction === 'down') {
        nextDirection = 'up'
      } else if (direction === 'up') {
        nextSort = ''
        nextDirection = ''
      }

      this.setState({
        [key]: nextSort,
        direction: nextDirection
      })

      t('我的持仓.排序', {
        sort: nextSort,
        direction: nextDirection
      })
    } else {
      this.setState({
        [key]: value,
        direction: 'down'
      })

      t('我的持仓.排序', {
        sort: value,
        direction: 'down'
      })
    }

    this.save()
  }

  onSortLongPress = (key: 'sort' | 'templeSort' = 'sort') => {
    this.setState({
      [key]: '',
      direction: ''
    })
    this.save()

    t('我的持仓.排序', {
      sort: '',
      direction: ''
    })
  }

  /** 切换批量操作 */
  toggleBatchEdit = (batchAction: BatchAction = '') => {
    this.setState({
      editing: !this.state.editing,
      batchAction
    })
    this.clearState('editingIds', {})
  }

  /** 批量操作切换一项 */
  toggleEditingId = (id: string | number, count: any) => {
    const ids = {
      ...this.state.editingIds
    }
    if (ids[id]) {
      delete ids[id]
    } else {
      ids[id] = count
    }

    this.clearState('editingIds', ids)
  }

  /** 批量操作自增多选 */
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
      .filter((_item, index: number) => index > startIndex)
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

  /** 打开道具模态框 */
  onShowModal = (monoId: number) => {
    this.setState({
      visible: true,
      title: '星光碎片',
      monoId
    })
  }

  /** 关闭道具模态框 */
  onCloseModal = () => {
    this.setState({
      visible: false,
      title: '',
      monoId: 0
    })
  }

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

  /**
   * 批量以当前价挂卖单
   *  - distance < 0 挂减数卖单
   *  - 1 <= distance <= 2 挂倍数卖单
   *  - distance === 100 挂发行价卖单
   *  - distance === 200 挂卖一价 -1cc, 不低于现价
   * */
  doBatchAsk = async (distance = 0) => {
    const ids = Object.keys(this.state.editingIds)
    if (!ids.length) return

    let actionText = ''
    if (distance === 200) {
      actionText = '卖一价与现价取最大值'
    } else if (distance === 100) {
      actionText = '发行价'
    } else if (distance < 0) {
      actionText = `当前价 ${distance}cc`
    } else if (distance >= 1 && distance <= 2) {
      actionText = `当前价 *${distance}cc`
    }

    confirm(
      `批量对 (${ids.length}) 个角色以${actionText} (挂卖单, 且出价不会低于等级预设价格) 确定? (若角色当前有挂单, 可用会失败)`,
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
              const { current, state, level } = item
              let price = 0
              if (distance === 200) {
                const { asks } = await tinygrailStore.fetchDepth(id)
                price = Math.max((asks?.[0]?.price || 0) - 1, current)
              } else if (distance === 100) {
                const issuePrice = await tinygrailStore.fetchIssuePrice(id)
                price = Number(issuePrice.toFixed(2))
              } else if (distance < 0) {
                price = current + distance
              } else if (distance >= 1 && distance <= 2) {
                price = Number((current * distance).toFixed(2))
              } else {
                price = current
              }
              const { State } = await tinygrailStore.doAsk({
                monoId: id,
                price: Math.max(getCharaLevelLowestPrice(level), price),
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
        this.fetchMyCharaAssets()

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

  /** 使用道具 */
  doUse = async (
    params: Override<
      ItemUseParams,
      {
        leftItem?: any
        rightItem?: any
      }
    >
  ) => {
    try {
      const { title, monoId, toMonoId, amount, isTemple } = params
      const type = ITEMS_TYPE[title]
      if (!type) return false

      const data: FnParams<typeof tinygrailStore.doMagic> = {
        monoId,
        type
      }
      if (toMonoId) data.toMonoId = toMonoId
      if (amount !== undefined) data.amount = amount
      if (isTemple !== undefined) data.isTemple = isTemple

      const { State, Value, Message } = await tinygrailStore.doMagic(data)
      feedback()

      if (State === 0) {
        alert(
          typeof Value === 'string'
            ? Value
            : `获得${Value.Name}x${Value.Amount}，当前价${toFixed(
                Value.CurrentPrice,
                2
              )}，价值${toFixed(Value.Amount * Value.CurrentPrice, 2)}`,
          '小圣杯助手'
        )

        if (title === '星光碎片') {
          tinygrailStore.batchUpdateTemplesByIds([monoId, toMonoId])
        }

        return tinygrailStore.batchUpdateMyCharaAssetsByIds(
          [monoId, toMonoId].filter(item => !!item)
        )
      }

      info(Message)
      return false
    } catch (error) {
      info('操作失败，可能授权过期了')
      return false
    }
  }
}
