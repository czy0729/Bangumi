/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-24 20:25:31
 */
import { alert, getTimestamp, toFixed } from '@utils'
import { SORT_HYD } from '@tinygrail/_/utils'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

/** 我的持仓页面状态机 */
export default class ScreenTinygrailCharaAssets extends Action {
  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60

    const state = await this.getStorage(NAMESPACE)
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

    // @ts-expect-error
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
        `本次刮刮乐：${items.map(item => `${item.name}x${item.num}`).join('，')}，价值${toFixed(
          total,
          2
        )}`,
        '小圣杯助手'
      )
    } catch (error) {}

    return state
  }
}
