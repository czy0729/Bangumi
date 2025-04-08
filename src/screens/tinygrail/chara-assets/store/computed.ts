/*
 * @Author: czy0729
 * @Date: 2024-10-24 20:17:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-13 23:04:43
 */
import { computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import { LIST_EMPTY } from '@constants'
import { levelList, sortList } from '@tinygrail/_/utils'
import State from './state'

export default class Computed extends State {
  /** 用户 ID */
  @computed get userId() {
    return this.params.userId
  }

  /** 圣殿原始数据 */
  @computed get originalTemple() {
    return tinygrailStore.temple(this.userId)
  }

  /** 资产概览 */
  @computed get myCharaAssets() {
    // 我的持仓页面支持自己和他人公用, 当有用户 ID 时, 为显示他人持仓页面
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

  /** 圣殿 */
  @computed get temple() {
    const { templeLevel, templeSort, direction } = this.state

    // 如果不需要筛选和排序，直接返回原始数据
    if (!templeLevel && !templeSort) return this.originalTemple

    let list = this.originalTemple.list
    if (templeLevel) list = levelList(templeLevel, list)
    if (templeSort) list = sortList(templeSort, direction, list)

    // 只有当列表被修改时才创建新对象
    return list === this.originalTemple.list
      ? this.originalTemple
      : { ...this.originalTemple, list }
  }

  /** 角色列表 (等级筛选、排序) */
  @computed get charaList() {
    const { chara } = this.myCharaAssets
    const { sort, level, direction } = this.state

    // 如果不需要筛选和排序，直接返回原始数据
    if (!level && !sort) return chara

    let list = chara.list
    if (level) list = levelList(level, list)
    if (sort) list = sortList(sort, direction, list)

    // 只有当列表被修改时才创建新对象
    return list === chara.list ? chara : { ...chara, list }
  }

  /** 角色列表等级映射 */
  @computed get levelMap() {
    return this.myCharaAssets.chara.list.reduce((acc, { level }) => {
      acc[level] = (acc[level] || 0) + 1
      return acc
    }, {})
  }

  /** 圣殿角色列表等级映射 */
  @computed get templeLevelMap() {
    return this.originalTemple.list.reduce((acc, item) => {
      const level = item.cLevel || item.level
      acc[level] = (acc[level] || 0) + 1
      return acc
    }, {})
  }

  /** 人物和圣殿合组合总览列表 */
  @computed get mergeList() {
    const { chara } = this.myCharaAssets
    if (!chara._loaded || !this.originalTemple._loaded) return LIST_EMPTY

    const map = {}

    // 初始化角色数据
    chara.list.forEach(item => {
      map[item.id] = Object.assign({}, item)
    })

    // 合并圣殿数据
    this.originalTemple.list.forEach(item => {
      const existing = map[item.id]
      const itemChara = existing || tinygrailStore.characters(item.id)
      map[item.id] = existing
        ? Object.assign(existing, {
            assets: item.assets,
            rank: item.rank,
            refine: item.refine,
            sacrifices: item.sacrifices
          })
        : Object.assign({}, itemChara, {
            assets: item.assets,
            cLevel: itemChara.level,
            icon: item.cover,
            id: item.id,
            level: item.level,
            monoId: item.id,
            name: item.name,
            rank: item.rank || itemChara.rank,
            rate: item.rate || itemChara.rate,
            refine: item.refine,
            sacrifices: item.sacrifices,
            starForces: item.starForces,
            stars: item.stars || itemChara.stars
          })
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

  /** ICO 最高人气 (显示自己当前参与) */
  @computed get mpi() {
    return computed(() => tinygrailStore.list('mpi')).get()
  }

  /** ICO 用户 */
  @computed get mpiUsers() {
    return Object.fromEntries(this.mpi.list.map(item => [item.id, item.users]))
  }
}
