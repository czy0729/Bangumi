/*
 * @Author: czy0729
 * @Date: 2019-11-29 21:58:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-12 21:27:22
 */
import { Alert } from 'react-native'
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { toFixed } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'

const typeDS = {
  混沌魔方: 'chaos',
  虚空道标: 'guidepost',
  星光碎片: 'stardust'
}

export default class ScreenTinygrailItems extends store {
  state = observable({
    title: '',
    visible: false,
    _loaded: false
  })

  init = async () => {
    await this.fetchItems()
    await this.fetchTemple()
    await this.fetchMsrc()
    return this.fetchMyCharaAssets()
  }

  // -------------------- fetch --------------------
  /**
   * 道具
   */
  fetchItems = () => tinygrailStore.fetchItems()

  /**
   * 我的圣殿
   */
  fetchTemple = () => tinygrailStore.fetchTemple()

  /**
   * 最高股息
   */
  fetchMsrc = () => tinygrailStore.fetchList('msrc')

  /**
   * 我的资产
   */
  fetchMyCharaAssets = () => tinygrailStore.fetchMyCharaAssets()

  // -------------------- get --------------------
  @computed get items() {
    return tinygrailStore.items
  }

  @computed get temple() {
    return tinygrailStore.temple()
  }

  @computed get msrc() {
    const { msrc } = tinygrailStore
    return msrc
  }

  @computed get chara() {
    const { chara } = tinygrailStore.myCharaAssets
    return chara
  }

  // -------------------- page --------------------
  onShowModal = title =>
    this.setState({
      title,
      visible: true
    })

  onCloseModal = () =>
    this.setState({
      visible: false
    })

  // -------------------- action --------------------
  doUse = async ({ monoId, toMonoId, amount, isTemple }) => {
    try {
      const { title } = this.state
      const type = typeDS[title]
      if (!type) {
        return false
      }

      const data = {
        monoId,
        type
      }
      if (toMonoId) {
        data.toMonoId = toMonoId
      }
      if (amount !== undefined) {
        data.amount = amount
      }
      if (isTemple !== undefined) {
        data.isTemple = isTemple
      }

      const { State, Value, Message } = await tinygrailStore.doMagic(data)
      t('我的道具.使用', {
        type: title,
        monoId,
        toMonoId
      })

      if (State === 0) {
        Alert.alert(
          '小圣杯助手',
          typeof Value === 'string'
            ? Value
            : `获得${Value.Name}x${Value.Amount}，当前价${
                Value.CurrentPrice
              }，价值${toFixed(Value.Amount * Value.CurrentPrice, 2)}`,
          [
            {
              text: '知道了'
            }
          ]
        )

        if (title === '星光碎片') {
          this.fetchTemple()
          if (!isTemple) {
            this.fetchMyCharaAssets()
          }
        }

        return true
      }

      info(Message)
      return false
    } catch (error) {
      info('操作失败，可能授权过期了')
      return false
    }
  }
}
