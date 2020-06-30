/*
 * @Author: czy0729
 * @Date: 2019-11-29 21:58:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-30 19:57:07
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
  虚空道标: 'guidepost'
}

export default class ScreenTinygrailItems extends store {
  state = observable({
    title: '',
    visible: false,
    _loaded: false
  })

  init = () => {
    this.fetchItems()
    this.fetchTemple()
    this.fetchMsrc()
  }

  // -------------------- fetch --------------------
  fetchItems = () => tinygrailStore.fetchItems()

  fetchTemple = () => tinygrailStore.fetchTemple()

  /**
   * 最高股息
   */
  fetchMsrc = () => tinygrailStore.fetchList('msrc')

  // -------------------- get --------------------
  @computed get items() {
    return tinygrailStore.items
  }

  @computed get temple() {
    const temple = tinygrailStore.temple()
    return {
      ...temple,
      list: temple.list
        .filter(item => item.assets >= 100)
        .sort((a, b) => {
          const la = a.cLevel || 1
          const lb = b.cLevel || 1
          if (la === lb) {
            return a.rate - b.rate
          }
          return lb - la
        })
    }
  }

  @computed get templeDS() {
    const { list } = tinygrailStore.temple()
    return list
      .sort((a, b) => a.rate - b.rate)
      .filter((item, index) => index < 30)
      .map(item => ({
        label: `+${toFixed(item.rate, 1)} / ${item.assets} ${item.name}`,
        value: item.id
      }))
  }

  @computed get msrc() {
    const { msrc } = tinygrailStore
    return msrc
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
  doUse = async ({ monoId, toMonoId }) => {
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
      const { State, Value, Message } = await tinygrailStore.doMagic(data)

      t('我的道具.使用', {
        type: title,
        monoId
      })

      if (State === 0) {
        Alert.alert(
          '小圣杯助手',
          `获得${Value.Name}x${Value.Amount}，当前价₵${
            Value.CurrentPrice
          }，价值₵${toFixed(Value.Amount * Value.CurrentPrice, 2)}`,
          [
            {
              text: '知道了'
            }
          ]
        )
        this.fetchItems()
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
