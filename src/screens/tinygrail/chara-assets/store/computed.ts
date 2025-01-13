/*
 * @Author: czy0729
 * @Date: 2024-10-24 20:17:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-13 23:04:43
 */
import { computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import { levelList, sortList } from '@tinygrail/_/utils'
import State from './state'

export default class Computed extends State {
  @computed get userId() {
    return this.params.userId
  }

  /** 用户资产概览信息 */
  @computed get myCharaAssets() {
    // 我的持仓页面支持自己和他人公用, 当有用户 id 时, 为显示他人持仓页面
    if (this.userId) {
      // 构造跟自己持仓一样的数据结构
      const { characters, initials } = tinygrailStore.charaAssets(this.userId)
      const _loaded = getTimestamp()
      return {
        chara: {
          list: characters,
          pagination: {
            page: 1,
            pageTotal: 1
          },
          _loaded
        },
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
      chara: tinygrailStore.myCharaAssets.chara
    }
  }

  /** 用户圣殿 */
  @computed get temple() {
    const { sort, level, direction } = this.state
    let data = tinygrailStore.temple(this.userId)
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

  /** ICO 最高人气, 用于显示自己当前参与的 ICO */
  @computed get mpi() {
    return computed(() => tinygrailStore.list('mpi')).get()
  }

  /** ICO 用户 */
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
        const itemChara = tinygrailStore.characters(item.id)
        map[item.id] = {
          ...itemChara,
          id: item.id,
          icon: item.cover,
          level: item.level,
          cLevel: itemChara.level,
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

    return {
      list,
      pagination: {
        page: 1,
        pageTotal: 1
      },
      _loaded: getTimestamp()
    }
  }
}
