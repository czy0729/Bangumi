/*
 * @Author: czy0729
 * @Date: 2021-02-03 22:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-10 13:36:07
 */
import { observable, computed } from 'mobx'
import { discoveryStore } from '@stores'
import { open } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { HOST } from '@constants'

export const labelDS = [
  '全部条目',
  '动画',
  '书籍',
  '音乐',
  '游戏',
  '三次元',
  '章节',
  '角色',
  '人物',
  '编辑'
]
export const topDS = ['编辑', '关联', '入库']
export const typeDS = ['条目', '锁定', '合并', '角色', '人物', '章节']
export const relationDS = ['条目关联', '人物关联', '角色关联']
export const lastDS = ['全部', '动画', '书籍', '音乐', '游戏', '三次元']

const namespace = 'ScreenWiki'
const keys = {
  '0|0': 'all',
  '0|1': 'lock',
  '0|2': 'merge',
  '0|3': 'crt',
  '0|4': 'prsn',
  '0|5': 'ep',
  '1|0': 'relation',
  '1|1': 'subjectPerson',
  '1|2': 'subjectCrt',
  '2|0': 'all',
  '2|1': 'anime',
  '2|2': 'book',
  '2|3': 'music',
  '2|4': 'game',
  '2|5': 'real'
}

export default class ScreenWiki extends store {
  state = observable({
    top: 0,
    type: 0,
    relation: 0,
    last: 0,
    _loaded: false
  })

  setParams = navigation => {
    navigation.setParams({
      heatmap: '维基人.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('维基人.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open(`${HOST}/wiki`)
              break

            default:
              break
          }
        }
      }
    })
  }

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })
    return discoveryStore.fetchWiki()
  }

  // -------------------- get --------------------
  @computed get wiki() {
    return discoveryStore.wiki
  }

  @computed get segement() {
    const { top, type, relation, last } = this.state
    let key
    let values
    let selectedIndex
    if (top === 1) {
      key = 'relation'
      values = relationDS
      selectedIndex = relation
    } else if (top === 2) {
      key = 'last'
      values = lastDS
      selectedIndex = last
    } else {
      key = 'type'
      values = typeDS
      selectedIndex = type
    }

    return {
      key,
      values,
      selectedIndex
    }
  }

  @computed get list() {
    const { timeline = {}, last: wikiLast = {} } = this.wiki
    const { top, type, relation, last } = this.state
    if (top === 0) return timeline[keys[`${top}|${type}`]] || []
    if (top === 1) return timeline[keys[`${top}|${relation}`]] || []
    return wikiLast[keys[`${top}|${last}`]] || []
  }

  // -------------------- page --------------------
  onChangeTop = title => {
    this.setState({
      top: topDS.findIndex(item => item === title)
    })
    this.setStorage(undefined, undefined, namespace)
  }

  onChangeSub = title => {
    const { key, values } = this.segement
    this.setState({
      [key]: values.findIndex(item => item === title)
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
