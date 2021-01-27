/* eslint-disable no-extra-semi */
/*
 * @Author: czy0729
 * @Date: 2020-06-28 14:02:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:16:26
 */
import React from 'react'
import { BackHandler, View, Alert, StatusBar } from 'react-native'
import { computed } from 'mobx'
import { Flex, Text, Button, SegmentedControl, Iconfont } from '@components'
import Modal from '@components/@/ant-design/modal'
import { IconTouchable, Popover } from '@screens/_'
import { _, tinygrailStore } from '@stores'
import {
  toFixed,
  formatNumber,
  trim,
  getTimestamp,
  getStorage,
  setStorage
} from '@utils'
import { obc } from '@utils/decorators'
import { info } from '@utils/ui'
import { IOS } from '@constants'
import SearchInput from './search-input'
import List from './list'
import Item from './item'
import ItemBottom from './item-bottom'

const namespace = 'TinygrailCharactersModal'
const starsdustDS = ['消耗圣殿', '消耗活股']

export default
@obc
class CharactersModal extends React.Component {
  static defaultProps = {
    title: '',
    visible: false
  }

  state = {
    leftItem: null,
    leftValue: '',
    leftFilter: '',
    rightItem: null,
    rightValue: '',
    rightFilter: '',
    search: null,
    loading: false,
    title: '',
    amount: 0,
    isTemple: true,
    focus: false
  }

  title

  async componentDidMount() {
    const state = (await getStorage(namespace)) || {}
    this.setState({
      ...state,
      leftItem: null,
      rightItem: null,
      loading: false,
      focus: false,
      title: this.props.title
    })
    this.title = this.props.title

    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.title) {
      this.setState({
        leftItem: null,
        rightItem: null,
        loading: false,
        title: nextProps.title
      })
      this.title = nextProps.title
    }

    if (!IOS) {
      StatusBar.setHidden(nextProps.visible)
    }
  }

  onBackAndroid = () => {
    const { $ } = this.context
    const { visible } = this.props
    if (visible) {
      $.onCloseModal()
      return true
    }
    return false
  }

  onSelectLeft = item => {
    const { leftItem } = this.state
    const actived = leftItem && leftItem.id === item.id
    this.setState(
      {
        leftItem: actived ? null : item,
        amount: 0
      },
      () => {
        // 自动计算补充数量
        const { leftItem, rightItem } = this.state
        if (this.isStardust && leftItem && rightItem) {
          this.setState({
            amount: Math.min(assets(leftItem), charge(rightItem))
          })
        }
      }
    )
  }

  onSelectRight = item => {
    const { rightItem } = this.state
    const actived = rightItem && rightItem.id === item.id
    this.setState(
      {
        rightItem: actived ? null : item,
        amount: 0
      },
      () => {
        // 自动计算补充数量
        const { leftItem, rightItem } = this.state
        if (this.isStardust && leftItem && rightItem) {
          this.setState({
            amount: Math.min(assets(leftItem), charge(rightItem))
          })
        }
      }
    )
  }

  onCancelLeft = () => {
    this.setState({
      leftItem: null
    })
  }

  onCancelRight = () => {
    this.setState({
      rightItem: null
    })
  }

  onChangeLeft = value => {
    this.setState({
      leftValue: trim(value)
    })
  }

  onChangeRight = value => {
    const rightValue = trim(value)
    this.setState({
      rightValue
    })

    if (rightValue === '') {
      this.setState({
        search: null
      })
    }
  }

  onChangeNum = value => {
    let _value = parseInt(value)
    if (Number.isNaN(_value) || _value == 0) {
      _value = ''
    }
    this.setState({
      amount: _value
    })
  }

  onToogleIsTemple = title => {
    const { isTemple } = this.state
    if (
      (isTemple && title === '消耗圣殿') ||
      (!isTemple && title === '消耗活股')
    ) {
      return
    }

    this.setState({
      leftItem: null,
      isTemple: !isTemple
    })
  }

  onClose = () => {
    const { $ } = this.context
    $.onCloseModal()
    this.setState({
      loading: false
    })
    setStorage(namespace, this.state)
  }

  onFocus = () => {
    this.setState({
      focus: true
    })
  }

  onBlur = () => {
    this.setState({
      focus: false
    })
  }

  doSearch = async () => {
    const { rightValue } = this.state
    if (!rightValue) {
      info('请输入关键字')
      return
    }

    const result = await tinygrailStore.doSearch({
      keyword: rightValue
    })
    if (result.data && result.data.State === 0) {
      const search = result.data.Value.filter(item => !item.ICO).map(item => ({
        id: item.Id,
        name: item.Name,
        level: item.Level
      }))
      this.setState({
        search,
        rightItem: null
      })
    }
  }

  onSubmit = async () => {
    const { leftItem, rightItem, amount, isTemple, loading } = this.state
    if (!this.canSubmit || loading) {
      return
    }

    const { $ } = this.context
    const { title } = this.props
    this.setState({
      loading: true
    })
    await $.doUse({
      title,
      monoId: leftItem.id,
      toMonoId: rightItem ? rightItem.id : 0,
      amount,
      isTemple
    })

    this.setState({
      loading: false
    })
    if (this.isStardust) {
      this.setState({
        leftItem: null,
        amount: 0
      })
    }
  }

  onAlert = () => Alert.alert('使用说明', this.alert)

  @computed get isChaos() {
    const { title } = this.props
    return title === '混沌魔方'
  }

  @computed get isGuidepost() {
    const { title } = this.props
    return title === '虚空道标'
  }

  @computed get isStardust() {
    const { title } = this.props
    return title === '星光碎片'
  }

  @computed get left() {
    const { $ } = this.context
    const { rightItem, leftValue, isTemple } = this.state

    // 虚空道标 (消耗我的圣殿)
    if (this.isGuidepost) {
      return {
        ...$.temple,
        list: $.temple.list
          .filter(item => {
            // 一次消耗100且成塔
            if (item.assets < 100 || item.sacrifices < 500) {
              return false
            }

            if (rightItem) {
              if (leftValue) {
                return (
                  item.name.includes(leftValue) && lv(item) >= lv(rightItem)
                )
              }
              return lv(item) >= lv(rightItem)
            }

            if (leftValue) {
              return item.name.includes(leftValue)
            }

            return true
          })
          .sort((a, b) => a.rate - b.rate)
      }
    }

    /**
     * 星光碎片 (消耗活股或圣殿)
     *  - 若消耗股等级 >= 目标股，每增加1点祭献值，消耗流通股或圣殿祭献值 1 股/点
     *  - [活股必须] 若消耗股等级 < 目标股，每增加1点祭献值，消耗流通股或圣殿祭献值 2^(n-1) 股/点，其中n为两者的等级差且最小为1
     */
    if (this.isStardust) {
      const data = isTemple ? $.temple : $.chara
      return {
        ...data,
        list: data.list
          .filter(item => {
            if (assets(item) < 10) {
              return false
            }

            if (rightItem) {
              const _lv = lv(item) - lv(rightItem)
              if (leftValue) {
                if (isTemple) {
                  return (
                    item.name.includes(leftValue) &&
                    lv(item) + (isTemple ? 0 : 1) >= lv(rightItem)
                  )
                }
                return (
                  item.name.includes(leftValue) && assets(item) >= 2 ** -_lv
                )
              }

              return isTemple
                ? lv(item) + (isTemple ? 0 : 1) >= lv(rightItem)
                : assets(item) >= 2 ** -_lv
            }

            if (leftValue) {
              return item.name.includes(leftValue)
            }

            return true
          })
          .sort((a, b) => a.rate - b.rate)
      }
    }

    // 混沌魔方 (消耗我的圣殿)
    return {
      ...$.temple,
      list: $.temple.list
        .filter(item => {
          // 一次消耗10且成塔
          if (assets(item) < 250 || item.sacrifices < 500) {
            return false
          }

          if (leftValue) {
            return item.name.includes(leftValue)
          }

          return true
        })
        .sort((a, b) => a.rate - b.rate)
    }
  }

  @computed get right() {
    const { title } = this.props
    if (!title || this.isChaos) {
      return false
    }

    const { search, leftItem, rightValue, isTemple } = this.state
    if (search) {
      return {
        list: search,
        pagination: {
          page: 1,
          pageTotal: 1
        },
        _loaded: getTimestamp()
      }
    }

    const { $ } = this.context
    if (this.isGuidepost) {
      return {
        ...$.msrc,
        list: $.msrc.list
          .filter(item => {
            if (leftItem) {
              if (rightValue) {
                return (
                  item.name.includes(rightValue) && lv(item) <= lv(leftItem)
                )
              }

              return lv(item) <= lv(leftItem)
            }

            if (rightValue) {
              return item.name.includes(rightValue)
            }

            return true
          })
          .sort((a, b) => lv(b) - lv(a))
      }
    }

    if (this.isStardust) {
      return {
        ...$.temple,
        list: $.temple.list
          .filter(item => {
            if (item.assets === item.sacrifices) {
              return false
            }

            if (leftItem) {
              if (rightValue) {
                if (isTemple) {
                  return (
                    item.name.includes(rightValue) &&
                    lv(item) <= lv(leftItem) + (isTemple ? 0 : 1)
                  )
                }
                return item.name.includes(rightValue)
              }

              return isTemple
                ? lv(item) <= lv(leftItem) + (isTemple ? 0 : 1)
                : true
            }

            if (rightValue) {
              return item.name.includes(rightValue)
            }

            return true
          })
          .sort((a, b) => lv(b) - lv(a))
      }
    }

    return {
      ...$.temple,
      list: $.temple.list
        .filter(item => {
          if (item.assets === item.sacrifices) {
            return false
          }

          if (leftItem) {
            if (rightValue) {
              return (
                item.name.includes(rightValue) &&
                lv(item) <= lv(leftItem) + (isTemple ? 0 : 1)
              )
            }

            return lv(item) <= lv(leftItem) + (isTemple ? 0 : 1)
          }

          if (rightValue) {
            return item.name.includes(rightValue)
          }

          return true
        })
        .sort((a, b) => lv(b) - lv(a))
    }
  }

  @computed get computedLeft() {
    const { leftFilter } = this.state
    if (!leftFilter || !this.left?.list?.length) {
      return this.left
    }

    return {
      ...this.left,
      list: this.left.list.filter(item => lv(item) == leftFilter)
    }
  }

  @computed get computedRight() {
    const { rightFilter } = this.state
    if (!rightFilter || !this.right?.list?.length) {
      return this.right
    }

    return {
      ...this.right,
      list: this.right.list.filter(item => lv(item) == rightFilter)
    }
  }

  @computed get leftChangeText() {
    const { amount, isTemple } = this.state
    if (this.isChaos) {
      return '-10'
    }

    if (this.isGuidepost) {
      return '-100'
    }

    if (this.isStardust) {
      const { leftItem, rightItem } = this.state
      if (!isTemple && leftItem && rightItem) {
        const _lv = lv(leftItem) - lv(rightItem)
        if (_lv < 0) {
          return `每 -${2 ** -(_lv + 1)}`
        }
      }
      return `-${amount || '?'}`
    }

    return ''
  }

  @computed get rightChangeText() {
    const { amount, isTemple } = this.state
    if (this.isChaos) {
      return '+10-100'
    }

    if (this.isGuidepost) {
      return '+10-100'
    }

    if (this.isStardust) {
      const { leftItem, rightItem } = this.state
      if (!isTemple && leftItem && rightItem) {
        const _lv = lv(leftItem) - lv(rightItem)
        if (_lv < 0) {
          return '+1'
        }
      }
      return `+${amount || '?'}`
    }

    return ''
  }

  @computed get canSubmit() {
    const { leftItem, rightItem, amount } = this.state
    if (this.isGuidepost) {
      return !!(leftItem && rightItem)
    }

    if (this.isStardust) {
      return !!(leftItem && rightItem && amount)
    }

    return !!leftItem
  }

  @computed get alert() {
    if (this.isGuidepost) {
      return '虚空道标：消耗100点塔值，抽取目标随机数量的股份，消耗目标的等级必须大于等于抽取目标等级。\n左侧数据基于自己的圣殿。\n右侧数据基于最高股息前面的角色，点击搜索可以查询远端所有角色。'
    }

    if (this.isStardust) {
      return '星光碎片：消耗活股或塔值补充目标已损失塔值。\n消耗目标的等级必须大于等于补充目标等级，使用活股时消耗等级可以比目标等级少1级。\n塔值少于250时塔会找不到请自行查询远端数据。'
    }

    return '混沌魔方：消耗10点塔值，抽取随机目标10-100的股份。\n当前每天可使用3次。'
  }

  @computed get leftLevelMap() {
    const { list } = this.left
    const data = {}

    try {
      ;(list || []).forEach(item =>
        data[lv(item) || 0]
          ? (data[lv(item) || 0] += 1)
          : (data[lv(item) || 0] = 1)
      )
    } catch (error) {
      warn(error)
    }
    return data
  }

  @computed get leftDS() {
    const sum = Object.keys(this.leftLevelMap).reduce(
      (total, level) => total + this.leftLevelMap[level],
      0
    )
    const leftDS = [
      `全部 (${sum})`,
      ...Object.keys(this.leftLevelMap).map(
        level => `lv${level} (${this.leftLevelMap[level]})`
      )
    ]
    return leftDS
  }

  @computed get rightLevelMap() {
    const { list } = this.right
    const data = {}

    try {
      ;(list || []).forEach(item =>
        data[lv(item) || 0]
          ? (data[lv(item) || 0] += 1)
          : (data[lv(item) || 0] = 1)
      )
    } catch (error) {
      warn(error)
    }
    return data
  }

  @computed get rightDS() {
    const sum = Object.keys(this.rightLevelMap).reduce(
      (total, level) => total + this.rightLevelMap[level],
      0
    )
    const rightDS = [
      `全部 (${sum})`,
      ...Object.keys(this.rightLevelMap)
        .map(level => `lv${level} (${this.rightLevelMap[level]})`)
        .reverse()
    ]
    return rightDS
  }

  renderFilter(filter, data, map, onSelect) {
    return (
      <Popover
        data={data}
        onSelect={title => {
          const lv = title.split(' ')[0]
          onSelect(lv === '全部' ? '' : lv.replace('lv', ''))
        }}
      >
        <Flex justify='center'>
          <Iconfont
            name='filter'
            size={11}
            color={filter ? _.colorAsk : _.colorTinygrailText}
          />
          <Text
            style={_.ml.xs}
            size={11}
            type={filter ? 'ask' : 'tinygrailText'}
          >
            {filter ? `lv${filter}` : '等级'}
            {map[filter] ? ` (${map[filter]})` : ''}
          </Text>
        </Flex>
      </Popover>
    )
  }

  renderLeft() {
    const { leftValue, leftFilter } = this.state
    return (
      <>
        <Flex>
          {this.renderFilter(leftFilter, this.leftDS, this.leftLevelMap, lv =>
            this.setState({
              leftFilter: lv
            })
          )}
          <Flex.Item style={_.ml.sm}>
            <SearchInput
              placeholder='消耗'
              value={leftValue}
              onChangeText={this.onChangeLeft}
            />
          </Flex.Item>
        </Flex>
        <List data={this.computedLeft} renderItem={this.renderItemLeft} />
      </>
    )
  }

  renderItemLeft = ({ item }) => {
    const { leftItem, isTemple } = this.state
    const disabled = leftItem && leftItem.id !== item.id

    let extra
    if (!this.isStardust) {
      extra = `${formatNumber(item.assets, 0)} / ${formatNumber(
        item.sacrifices || item.state,
        0
      )} / +${toFixed(item.rate, 1)}`
    } else if (isTemple) {
      extra = `${formatNumber(item.sacrifices || item.state, 0)} / +${toFixed(
        item.rate,
        1
      )}`
    } else {
      extra = `${formatNumber(item.state, 0)}  / +${toFixed(item.rate, 1)}`
    }
    return (
      <Item
        id={item.id}
        src={cover(item)}
        level={lv(item)}
        name={item.name}
        extra={extra}
        disabled={disabled}
        onPress={() => this.onSelectLeft(item)}
      />
    )
  }

  renderRight() {
    const { rightValue, rightFilter } = this.state
    if (this.isChaos) {
      return (
        <Text type='tinygrailText' size={13} align='center'>
          随机目标
        </Text>
      )
    }

    return (
      <>
        <Flex>
          {this.renderFilter(
            rightFilter,
            this.rightDS,
            this.rightLevelMap,
            lv =>
              this.setState({
                rightFilter: lv
              })
          )}
          <Flex.Item style={_.ml.sm}>
            <SearchInput
              placeholder='目标'
              value={rightValue}
              returnKeyType='search'
              returnKeyLabel='搜索'
              onChangeText={this.onChangeRight}
              onSubmitEditing={this.doSearch}
            />
          </Flex.Item>
        </Flex>
        <List data={this.computedRight} renderItem={this.renderItemRight} />
      </>
    )
  }

  renderItemRight = ({ item }) => {
    const { rightItem } = this.state
    const disabled = rightItem && rightItem.id !== item.id
    let extra = ''
    if (item.assets && item.assets !== item.sacrifices) {
      extra += `${formatNumber(item.assets, 0)} / `
    }
    if (item.sacrifices) {
      extra += `${formatNumber(item.sacrifices, 0)} / `
    }
    if (item.current) {
      extra += `₵${formatNumber(item.current, 0)} / `
    }
    if (item.rate) {
      extra += `+${toFixed(item.rate, 1)}`
    }
    return (
      <Item
        id={item.id}
        src={cover(item)}
        level={lv(item)}
        name={item.name}
        extra={extra}
        disabled={disabled}
        onPress={() => this.onSelectRight(item)}
      />
    )
  }

  renderBottom() {
    const { leftItem, rightItem } = this.state
    return (
      <View>
        <Flex style={this.styles.bottom}>
          <Flex.Item>
            {leftItem ? (
              <ItemBottom
                src={cover(leftItem)}
                name={leftItem.name}
                level={lv(leftItem)}
                change={this.leftChangeText}
                type='ask'
                onPress={this.onCancelLeft}
              />
            ) : (
              <Text type='tinygrailText' size={10}>
                - 请选择消耗 -
              </Text>
            )}
          </Flex.Item>
          {this.right !== false && (
            <Flex.Item style={_.ml.sm}>
              {rightItem ? (
                <ItemBottom
                  src={cover(rightItem)}
                  name={rightItem.name}
                  level={lv(rightItem)}
                  change={this.rightChangeText}
                  type='bid'
                  onPress={this.onCancelRight}
                />
              ) : (
                <Text type='tinygrailText' size={10}>
                  - 请选择目标 -
                </Text>
              )}
            </Flex.Item>
          )}
          {!this.isStardust && this.renderSubmitBtn()}
        </Flex>
        {this.isStardust && (
          <Flex>
            {this.renderForm()}
            {this.renderSubmitBtn()}
          </Flex>
        )}
      </View>
    )
  }

  renderSubmitBtn() {
    const { loading } = this.state
    return (
      <Button
        key={String(this.canSubmit)}
        style={this.canSubmit ? this.styles.btn : this.styles.btnDisabled}
        styleText={this.styles.btnText}
        type='bid'
        loading={loading}
        onPress={this.onSubmit}
      >
        提交
      </Button>
    )
  }

  renderForm() {
    if (!this.isStardust) {
      return null
    }

    const { amount, isTemple } = this.state
    return (
      <>
        <Flex.Item>
          <SearchInput
            keyboardType='numeric'
            placeholder='数量'
            value={amount}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChangeText={this.onChangeNum}
          />
        </Flex.Item>
        <Flex.Item style={_.ml.sm} flex={2}>
          <SegmentedControl
            style={this.styles.segmented}
            styleExtra={this.styles.segmentedExtra}
            tintColor={_.tSelect(_.colorTinygrailPlain, _.__colorPlain__)}
            backgroundColor={_.tSelect(
              _.colorTinygrailContainer,
              _.__colorBg__
            )}
            type='tinygrailText'
            size={10}
            values={starsdustDS}
            selectedIndex={isTemple ? 0 : 1}
            onValueChange={this.onToogleIsTemple}
          />
        </Flex.Item>
      </>
    )
  }

  render() {
    const { visible, title } = this.props
    const { focus } = this.state
    return (
      <Modal
        style={[this.styles.modal, focus && this.styles.focus]}
        visible={visible}
        title={
          <Text type='tinygrailPlain' bold>
            {title}
          </Text>
        }
        transparent
        closable
        maskClosable
        onClose={this.onClose}
      >
        <Flex style={this.styles.wrap}>
          <Flex.Item>{this.renderLeft()}</Flex.Item>
          <Flex.Item style={_.ml.md}>{this.renderRight()}</Flex.Item>
        </Flex>
        {this.renderBottom()}
        <IconTouchable
          style={this.styles.information}
          size={20}
          color={_.colorTinygrailText}
          name='information'
          onPress={this.onAlert}
        />
      </Modal>
    )
  }

  get styles() {
    return memoStyles()
  }
}

/**
 * 取等级
 * @param {*} item
 */
function lv(item) {
  return item.cLevel || item.level || 1
}

/**
 * 取头像
 * @param {*} item
 */
function cover(item) {
  return item.cover || item.icon || ''
}

/**
 * 取活股
 * @param {*} item
 */
function assets(item) {
  return item.state || item.assets || 0
}

/**
 * 取补充数量
 * @param {*} item
 */
function charge(item) {
  return (item.sacrifices || 0) - (item.assets || 0)
}

const memoStyles = _.memoStyles(_ => ({
  modal: {
    width: _.window.width - 2 * _.wind,
    maxWidth: 400,
    backgroundColor: _.tSelect(_.colorTinygrailContainer, _.__colorPlain__)
  },
  focus: {
    marginTop: -parseInt(_.window.height * 0.56)
  },
  wrap: {
    width: '100%',
    maxWidth: _.window.maxWidth,
    height: _.window.height * 0.64,
    maxHeight: 664,
    paddingBottom: _.sm,
    marginTop: _.md
  },
  information: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    marginTop: -28,
    marginRight: 8
  },
  bottom: {
    height: 28,
    marginVertical: _.sm
  },
  btn: {
    width: 80,
    height: 28,
    marginLeft: _.sm
  },
  btnDisabled: {
    width: 80,
    height: 28,
    marginLeft: _.sm,
    opacity: 0.5
  },
  btnText: {
    ..._.fontSize(10)
  },
  segmented: {
    width: '100%',
    height: 28
  },
  segmentedExtra: {
    borderRadius: _.radiusXs
  }
}))
