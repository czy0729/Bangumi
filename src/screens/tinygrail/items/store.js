/*
 * @Author: czy0729
 * @Date: 2019-11-29 21:58:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-07 18:05:35
 */
import { Alert } from 'react-native'
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { toFixed } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'

export default class ScreenTinygrailItems extends store {
  state = observable({
    _loaded: false
  })

  init = () => {
    this.fetchItems()
    this.fetchTemple()
  }

  // -------------------- fetch --------------------
  fetchItems = () => tinygrailStore.fetchItems()

  fetchTemple = () => tinygrailStore.fetchTemple()

  // -------------------- get --------------------
  @computed get items() {
    return tinygrailStore.items
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

  // -------------------- page --------------------
  doUse = async title => {
    const find = this.templeDS.find(item => item.label === title)
    if (find) {
      try {
        const { value } = find
        const { State, Value, Message } = await tinygrailStore.doMagic({
          monoId: value
        })

        t('我的道具.使用', {
          type: '混沌魔方',
          monoId: value
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
        } else {
          info(Message)
        }
      } catch (error) {
        info('操作失败，可能授权过期了')
      }
    }
  }
}
