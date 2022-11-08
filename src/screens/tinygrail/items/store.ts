/*
 * @Author: czy0729
 * @Date: 2019-11-29 21:58:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 16:29:43
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { toFixed, info, feedback, alert } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { ITEMS_TYPE } from '@tinygrail/_/characters-modal'
import { FnParams } from '@types'

export default class ScreenTinygrailItems extends store {
  state = observable({
    title: '',
    visible: false,
    _loaded: false
  })

  init = () => {
    return this.fetchItems()
  }

  // -------------------- fetch --------------------
  /** 道具 */
  fetchItems = () => {
    return tinygrailStore.fetchItems()
  }

  // -------------------- get --------------------
  /** 我的道具 */
  @computed get items() {
    return tinygrailStore.items
  }

  // -------------------- page --------------------
  onShowModal = (title: string) => {
    return this.setState({
      title,
      visible: true
    })
  }

  onCloseModal = () => {
    return this.setState({
      visible: false
    })
  }

  // -------------------- action --------------------
  /** 使用道具 */
  doUse = async ({ title, monoId, toMonoId, amount, isTemple }) => {
    try {
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
