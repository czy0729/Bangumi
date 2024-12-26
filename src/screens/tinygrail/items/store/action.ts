/*
 * @Author: czy0729
 * @Date: 2024-12-26 01:08:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-27 07:41:18
 */
import { tinygrailStore } from '@stores'
import { alert, feedback, info, toFixed } from '@utils'
import { t } from '@utils/fetch'
import { ITEMS_TYPE } from '@tinygrail/_/characters-modal'
import { FnParams, Override } from '@types'
import { ItemsType, ItemUseParams } from '../types'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 打开道具模态框 */
  onShowModal = (title: string) => {
    return this.setState({
      title,
      visible: true
    })
  }

  /** 关闭道具模态框 */
  onCloseModal = () => {
    return this.setState({
      visible: false
    })
  }

  /** 记忆上一次道具使用方式 */
  memoItemUsed = (
    params: Override<
      ItemUseParams,
      {
        type: ItemsType
        leftItem?: any
        rightItem?: any
      }
    >
  ) => {
    const { type, leftItem, rightItem, ...other } = params
    this.setState({
      memoItemUsed: {
        ...this.memoItemUsed,
        [type]: {
          ...other,
          monoName: leftItem?.name || '',
          monoAvatar: leftItem?.cover || leftItem?.icon || '',
          monoLv: leftItem?.cLevel || leftItem?.level || 0,
          toMonoName: rightItem?.name || '',
          toMonoAvatar: rightItem?.cover || rightItem?.icon || '',
          toMonoLv: rightItem?.cLevel || rightItem?.level || 0
        }
      }
    })
    this.save()
  }

  /** 使用道具 */
  doUse = async (
    params: Override<
      ItemUseParams,
      {
        leftItem?: any
        rightItem?: any
      }
    >,
    memo = true
  ) => {
    try {
      const { title, monoId, toMonoId, amount, isTemple } = params
      const type = ITEMS_TYPE[title]
      if (!type) return false

      if (memo) {
        setTimeout(() => {
          this.memoItemUsed({
            ...params,
            type
          })
        }, 0)
      }

      const data: FnParams<typeof tinygrailStore.doMagic> = {
        monoId,
        type
      }
      if (toMonoId) data.toMonoId = toMonoId
      if (amount !== undefined) data.amount = amount
      if (isTemple !== undefined) data.isTemple = isTemple

      const { State, Value, Message } = await tinygrailStore.doMagic(data)
      feedback()
      t('我的道具.使用', {
        type: title,
        monoId,
        toMonoId
      })

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

        tinygrailStore.fetchUserLogs(monoId)
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
