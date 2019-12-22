/*
 * @Author: czy0729
 * @Date: 2019-11-27 20:42:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-22 21:01:55
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { toFixed } from '@utils'
import store from '@utils/store'
import { tinygrailOSS } from '@utils/app'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'
import treemap from '@utils/thirdParty/treemap'
import { MODEL_TINYGRAIL_CACULATE_RICH_TYPE } from '@constants/model'
import _ from '@styles'

const H_TOOL_BAR = 44
const namespace = 'ScreenTinygrailTreeRich'
const key = '1/100'
const defaultCaculateType = MODEL_TINYGRAIL_CACULATE_RICH_TYPE.getValue(
  '周股息'
)

export default class ScreenTinygrailTreeRich extends store {
  @observable state = {
    caculateType: defaultCaculateType,
    loading: false,
    data: [],
    total: 0,
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

    if (!this.rich._loaded) {
      this.setState({
        loading: true
      })
      await this.fetchRich()
      this.generateTreeMap()

      this.setState({
        loading: false
      })
    } else {
      this.generateTreeMap()
    }
  }

  // -------------------- fetch --------------------
  fetchRich = () => tinygrailStore.fetchRich(key)

  // -------------------- get --------------------
  @computed get rich() {
    return tinygrailStore.rich(key)
  }

  // -------------------- page --------------------
  /**
   * 生成treemap数据
   */
  generateTreeMap = () => {
    try {
      const { list } = this.rich
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
          data: `其他${filterCount}个用户`,

          // 其他的占比不会大于3.2%
          weight:
            filterTotal / currentTotal > 0.032
              ? currentTotal * 0.032
              : filterTotal,
          price: filterTotal,
          percent: filterTotal / total
        })
      }

      const data = treemapSquarify(nodes).filter(item => !!item.percent)
      this.setState({
        data,
        total
      })
    } catch (error) {
      info('渲染失败, 请刷新')
    }
  }

  /**
   * 计算
   */
  caculate = () => {
    const { caculateType, filterItems } = this.state
    const { list } = this.rich

    // 总
    const label = MODEL_TINYGRAIL_CACULATE_RICH_TYPE.getLabel(caculateType)
    const total = caculateTotal(list, label) // 所有总值

    // 过滤
    const filterIds = filterItems.map(item => item.id)
    const _list = list.filter(item => !filterIds.includes(item.userId))
    const currentTotal = caculateTotal(_list, label) // 过滤后总值

    const filterRate = 0.0088 // 过滤比例
    let filterCount = 0 // 过滤的个数
    let filterTotal = 0 // 过滤的总值
    const nodes = _list
      .filter(item => {
        if (!currentTotal) {
          return true
        }

        const value = caculateValue(item, label) // 面积

        // 面积除以当前总面积小于过滤比例, 需要隐藏区域
        if (value / currentTotal < filterRate) {
          filterCount += 1
          filterTotal += value
          return false
        }
        return true
      })
      .map(item => {
        const value = caculateValue(item, label)
        return {
          id: item.userId,
          icon: item.avatar,
          data: item.nickname,
          weight: value,
          price: value,
          percent: value / total
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
   * 选择计算类型
   */
  onCaculateTypeSelect = caculateType => {
    t('资产分析.选择计算类型', {
      type: caculateType
    })

    this.setState({
      caculateType: MODEL_TINYGRAIL_CACULATE_RICH_TYPE.getValue(caculateType),
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
function caculateTotal(list, label) {
  let total = 0
  try {
    list.forEach(item => {
      total += caculateValue(item, label)
    })
  } catch (error) {
    // do nothing
  }
  return total
}

/**
 * 计算单项的总值
 * @param {*} item
 * @param {*} label
 */
function caculateValue(item, label) {
  let value = 0
  try {
    switch (label) {
      case '周股息':
        value += parseFloat(item.share || 0)
        break
      case '总资产':
        value += parseFloat(item.assets || 0)
        break
      case '流动资金':
        value += parseFloat(item.total || 0)
        break
      case '初始资金':
        value += parseFloat(item.principal || 0)
        break
      default:
        break
    }
  } catch (error) {
    // do nothing
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
          x: parseFloat(toFixed(x, 3)),
          y: parseFloat(toFixed(y, 3)),
          w: parseFloat(toFixed(w, 3)),
          h: parseFloat(toFixed(h, 3))
        })
    )
  } catch (error) {
    // do nothing
  }
  return data
}
