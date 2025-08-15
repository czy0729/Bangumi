/*
 * @Author: czy0729
 * @Date: 2020-11-30 16:16:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 09:34:18
 */
import { Clipboard } from 'react-native'
import { computed, observable } from 'mobx'
import { tinygrailStore } from '@stores'
import { copy, feedback, getTimestamp, info } from '@utils'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { MonoId, Navigation } from '@types'
import { relation, throttleInfo } from '../_/utils'
import { EXCLUDE_STATE } from './ds'

export default class ScreenTinygrailClipboard extends store<typeof EXCLUDE_STATE> {
  state = observable({
    ids: [],
    _loaded: false
  })

  init = async (navigation?: Navigation) => {
    const content = await Clipboard.getString()
    if (!content) return

    const matchs = String(content).match(/\d+/g)
    let ids = []
    if (matchs) {
      ids = matchs.map(item => Number(item)).filter(item => Number(item) > 100)
      if (ids.length) Clipboard.setString('')
    }

    if (!ids.length) return

    for (const id of ids) {
      throttleInfo(`${ids.findIndex(i => i === id) + 1} / ${ids.length}`)
      await tinygrailStore.fetchCharacters([id])
    }

    this.setState({
      ids,
      _loaded: getTimestamp()
    })

    if (navigation) {
      navigation.setParams({
        title: `粘贴板 (${this.list.list.length})`
      })
    }
  }

  // -------------------- get --------------------
  @computed get list() {
    const { ids } = this.state
    return relation({
      list: ids.map(id => tinygrailStore.characters(id)).filter(item => item.id !== 0),
      pagination: {
        page: 1,
        pageTotal: 1
      },
      _loaded: getTimestamp()
    })
  }

  // -------------------- page --------------------
  onShare = () => {
    if (this.list.list.length === 0) {
      info('当前没有角色数据')
      return
    }

    copy(
      this.list.list.map(item => `https://bgm.tv/character/${item.id}\n${item.name}`).join('\n'),
      `已复制 ${this.list.list.length} 个角色的分享链接`
    )
  }

  batchICO = async (ids: MonoId[]) => {
    t('粘贴板.一键注资', {
      length: ids.length
    })

    for (const id of ids) {
      throttleInfo(`${ids.findIndex(i => i === id) + 1} / ${ids.length}`)
      await tinygrailStore.doJoin({
        id,
        amount: 5000
      })
    }
    feedback()
    info('已完成注资')
  }
}
