/*
 * @Author: czy0729
 * @Date: 2019-11-20 22:23:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-23 22:31:28
 */
import { observable, computed, toJS } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'
import { tinygrailOSS } from '@utils/app'
import {
  MODEL_TINYGRAIL_ASSETS_TYPE,
  MODAL_TINYGRAIL_CACULATE_TYPE
} from '@constants/model'
import _ from '@styles'
import { VALHALL_PRICE } from '../_/ds'
import treemap from './treemap'

const namespace = 'ScreenTinygrailTree'
const TINYGRAIL_VALHALL_ID = 'valhalla@tinygrail.com'
const H_TOOL_BAR = 44
const defaultType = MODEL_TINYGRAIL_ASSETS_TYPE.getValue('所有')
const defaultCaculateType = MODAL_TINYGRAIL_CACULATE_TYPE.getValue('持仓价值')

export default class ScreenTinygrailTree extends store {
  @observable state = {
    type: defaultType,
    caculateType: defaultCaculateType,
    loading: false,
    data: [],
    filterItems: []
  }

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      loading: false,
      data: [],
      total: 0,
      filterItems: []
    })

    if (!this.charaAssets.length) {
      this.setState({
        loading: true
      })
      await this.refresh()
      this.generateTreeMap()

      this.setState({
        loading: false
      })
    } else {
      this.generateTreeMap()
    }
  }

  // -------------------- fetch --------------------
  refresh = () => Promise.all([this.fetchCharaAssets(), this.fetchTemple()])

  fetchCharaAssets = () => {
    const { userName } = this.params
    if (userName === TINYGRAIL_VALHALL_ID) {
      return tinygrailStore.fetchValhallList()
    }
    return tinygrailStore.fetchCharaAll(userName)
  }

  fetchTemple = () => {
    const { userName } = this.params
    if (userName === TINYGRAIL_VALHALL_ID) {
      return false
    }
    return tinygrailStore.fetchTemple(userName)
  }

  // -------------------- get --------------------
  @computed get label() {
    const { type } = this.state
    return MODEL_TINYGRAIL_ASSETS_TYPE.getLabel(type)
  }

  @computed get isTemple() {
    return this.label === '圣殿股'
  }

  @computed get charaAssets() {
    const { userName } = this.params
    if (userName === TINYGRAIL_VALHALL_ID) {
      if (this.isTemple) {
        return []
      }
      return tinygrailStore.valhallList.list
    }

    // 人物需要筛选掉没有股份的空气圣殿股
    if (this.label === '流动股') {
      return tinygrailStore.charaAll(userName).list
    }

    if (this.isTemple) {
      return tinygrailStore.temple(userName).list
    }

    // [所有] 圣殿的信息计算完, 根据人物数据结构, 合并到里面
    const temple = toJS(tinygrailStore.temple(userName).list)
    const characters = toJS(tinygrailStore.charaAll(userName).list)
    const _characters = characters.map(item => {
      const index = temple.findIndex(i => i.id === item.id)
      if (index !== -1) {
        const data = {
          ...temple[index],
          ...item
        }
        temple.splice(index, 1)
        return data
      }
      return item
    })
    return [..._characters, ...temple]
  }

  // -------------------- page --------------------
  /**
   * 生成treemap数据
   */
  generateTreeMap = () => {
    const list = this.charaAssets
    if (!list.length) {
      return
    }

    const {
      total = 0,
      currentTotal,
      filterCount,
      filterTotal,
      nodes
    } = this.caculate()
    if (filterCount) {
      nodes.push({
        id: 0,
        icon: '',
        data: `其他${filterCount}个角色`,

        // 其他的占比不会大于5%
        weight:
          filterTotal / currentTotal > 0.056 ? currentTotal * 0.056 : filterTotal,
        price: filterTotal,
        percent: filterTotal / total
      })
    }

    const data = treemapSquarify(nodes).filter(item => !!item.percent)
    this.setState({
      data,
      total
    })
  }

  /**
   * 计算
   */
  caculate = () => {
    const { caculateType, filterItems } = this.state
    const list = this.charaAssets

    // 总
    const label = MODAL_TINYGRAIL_CACULATE_TYPE.getLabel(caculateType)
    const total = caculateTotal(list, label, this.isTemple) // 所有总值

    // 过滤
    const filterIds = filterItems.map(item => item.id)
    const _list = list.filter(item => !filterIds.includes(item.id))
    const currentTotal = caculateTotal(_list, label, this.isTemple) // 过滤后总值

    const filterRate = 0.0088 // 过滤比例
    let filterCount = 0 // 过滤的个数
    let filterTotal = 0 // 过滤的总值
    const nodes = _list
      .filter(item => {
        if (!currentTotal) {
          return true
        }

        const value = caculateValue(item, label, this.isTemple) // 面积

        // 面积除以当前总面积小于过滤比例, 需要隐藏区域
        if (value / currentTotal < filterRate) {
          filterCount += 1
          filterTotal += value
          return false
        }
        return true
      })
      .map(item => {
        const value = caculateValue(item, label, this.isTemple)
        return {
          id: item.id,
          icon: item.icon || item.cover,
          data: item.name,
          weight: value,
          price: value,
          percent: value / total,
          fluctuation: item.fluctuation || 0
        }
      })

    return {
      total,
      currentTotal,
      filterCount,
      filterTotal,
      filterRate,
      nodes
    }
  }

  /**
   * 重置
   */
  reset = () => {
    this.setState({
      filterItems: []
    })
    this.generateTreeMap()
  }

  /**
   * 隐藏|显示角色
   */
  onToggleItem = ({ id, name }) => {
    if (id === 0) {
      return
    }

    const { filterItems } = this.state
    const index = filterItems.findIndex(item => item.id === id)
    this.setState({
      filterItems:
        index === -1
          ? [...filterItems, { id, name }]
          : filterItems.filter((item, idx) => idx !== index)
    })
    this.generateTreeMap()
  }

  /**
   * 选择范围
   */
  onTypeSelect = type => {
    this.setState({
      type: MODEL_TINYGRAIL_ASSETS_TYPE.getValue(type),
      filterItems: []
    })
    this.generateTreeMap()
    this.setStorage(undefined, undefined, namespace)
  }

  /**
   * 选择计算类型
   */
  onCaculateTypeSelect = caculateType => {
    this.setState({
      caculateType: MODAL_TINYGRAIL_CACULATE_TYPE.getValue(caculateType),
      filterItems: []
    })
    this.generateTreeMap()
    this.setStorage(undefined, undefined, namespace)
  }
}

/**
 * 计算列表的总值
 * @param {*} item
 * @param {*} label
 */
function caculateTotal(list, label, isTemple) {
  let total = 0
  try {
    list.forEach(item => {
      total += caculateValue(item, label, isTemple)
    })
  } catch (error) {
    log('[catch]caculateTotal')
  }
  return total
}

/**
 * 计算单项的总值
 * isTemple===false && item.sacrifices 为合并
 * @param {*} item
 * @param {*} label
 */
function caculateValue(item, label, isTemple) {
  let value = 0
  try {
    switch (label) {
      case '持仓价值':
        if (isTemple) {
          value += item.sacrifices * (VALHALL_PRICE[item.id] || 10) * 0.5
        } else if (item.sacrifices) {
          // 所有, 合并
          value +=
            (item.state || 0) * (item.current || VALHALL_PRICE[item.id] || 10) +
            item.sacrifices *
              (item.current || VALHALL_PRICE[item.id] || 10) *
              0.5
        } else {
          value += item.state * item.current
        }
        break
      case '周股息':
        if (isTemple) {
          value += item.sacrifices * item.rate * 0.5
        } else if (item.sacrifices) {
          // 所有, 合并
          value +=
            (item.state || 0) * item.rate + item.sacrifices * item.rate * 0.5
        } else {
          value += item.state * item.rate
        }
        break
      case '股息':
        value += item.rate
        break
      case '持股数':
        if (isTemple) {
          value += item.sacrifices * 0.5
        } else if (item.sacrifices) {
          // 所有, 合并
          value += (item.state || 0) + item.sacrifices * 0.5
        } else {
          value += item.state
        }
        break
      case '市场价':
        // 圣殿算不出
        value += item.marketValue || 0
        break
      case '发行量':
        // 圣殿算不出
        value += item.total || 0
        break
      case '当前价':
        // 圣殿算不出
        value += item.current || 0
        break
      case '交易量':
        // 圣殿算不出
        value += item.change || 0
        break
      case '当前涨跌':
        // 圣殿算不出
        value += Math.abs(item.fluctuation * 100 || 0)
        break
      case '新番奖励':
        // 圣殿算不出
        value += item.bonus || 0
        break
      default:
        break
    }
  } catch (error) {
    log('[catch]caculateValue')
  }
  return value
}

/**
 * treemap加权计算
 * @param {*} nodes
 */
function treemapSquarify(nodes) {
  const data = []
  try {
    treemap.squarify(
      {
        frame: {
          x: 0,
          y: 0,
          width: _.window.width,
          height: _.window.height - _.headerHeight - H_TOOL_BAR
        },
        nodes
      },
      (x, y, w, h, node) =>
        data.push({
          id: node.id,
          icon: tinygrailOSS(node.icon),
          name: node.data,
          price: node.price,
          percent: node.percent,
          fluctuation: node.fluctuation,
          x: parseFloat(x.toFixed(3)),
          y: parseFloat(y.toFixed(3)),
          w: parseFloat(w.toFixed(3)),
          h: parseFloat(h.toFixed(3))
        })
    )
  } catch (error) {
    log('[catch]treemapSquarify')
  }
  return data
}
