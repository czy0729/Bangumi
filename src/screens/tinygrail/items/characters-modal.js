/*
 * @Author: czy0729
 * @Date: 2020-06-28 14:02:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-10 16:03:32
 */
import React from 'react'
import { View, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Button, SegmentedControl } from '@components'
import Modal from '@components/@/ant-design/modal'
import { IconTouchable } from '@screens/_'
import { _, tinygrailStore } from '@stores'
import {
  toFixed,
  formatNumber,
  trim,
  getTimestamp,
  getStorage,
  setStorage
} from '@utils'
import { info } from '@utils/ui'
import SearchInput from './search-input'
import List from './list'
import Item from './item'
import ItemBottom from './item-bottom'

const namespace = 'TinygrailCharactersModal'
const starsdustDS = ['消耗圣殿', '消耗活股']

export default
@observer
class CharactersModal extends React.Component {
  static defaultProps = {
    title: '',
    visible: false
  }

  static contextTypes = {
    $: PropTypes.object
  }

  state = {
    leftItem: null,
    leftValue: '',
    rightItem: null,
    rightValue: '',
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.title) {
      this.setState({
        leftItem: null,
        rightItem: null,
        loading: false,
        title: nextProps.title
      })
      this.title = nextProps.title
    }
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

  get isChaos() {
    const { title } = this.props
    return title === '混沌魔方'
  }

  get isGuidepost() {
    const { title } = this.props
    return title === '虚空道标'
  }

  get isStardust() {
    const { title } = this.props
    return title === '星光碎片'
  }

  get left() {
    const { $ } = this.context
    const { rightItem, leftValue, isTemple } = this.state

    // 虚空道标 (消耗我的圣殿)
    if (this.isGuidepost) {
      return {
        ...$.temple,
        list: $.temple.list
          .filter(item => {
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
          .sort((a, b) => b.rate - a.rate)
      }
    }

    // 星光碎片 (消耗我的持仓或我的圣殿)
    if (this.isStardust) {
      const data = isTemple ? $.temple : $.chara
      return {
        ...data,
        list: data.list
          .filter(item => {
            if (item.assets < 10) {
              return false
            }

            if (rightItem) {
              if (leftValue) {
                return (
                  item.name.includes(leftValue) &&
                  lv(item) + (isTemple ? 0 : 1) >= lv(rightItem)
                )
              }
              return lv(item) + (isTemple ? 0 : 1) >= lv(rightItem)
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
          if (leftValue) {
            return item.name.includes(leftValue)
          }

          return true
        })
        .sort((a, b) => a.rate - b.rate)
    }
  }

  get right() {
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

  get leftChangeText() {
    const { amount } = this.state
    if (this.isChaos) {
      return '-10'
    }

    if (this.isGuidepost) {
      return '-100'
    }

    if (this.isStardust) {
      return `-${amount || '?'}`
    }

    return ''
  }

  get rightChangeText() {
    const { amount } = this.state
    if (this.isChaos) {
      return '+10-100'
    }

    if (this.isGuidepost) {
      return '+10-100'
    }

    if (this.isStardust) {
      return `+${amount || '?'}`
    }

    return ''
  }

  get canSubmit() {
    const { leftItem, rightItem, amount } = this.state
    if (this.isGuidepost) {
      return !!(leftItem && rightItem)
    }

    if (this.isStardust) {
      return !!(leftItem && rightItem && amount)
    }

    return !!leftItem
  }

  get alert() {
    if (this.isGuidepost) {
      return '虚空道标：消耗100点塔值，抽取目标随机数量的股份，消耗目标的等级必须大于等于抽取目标等级。\n左侧数据基于自己的圣殿。\n右侧数据基于最高股息前面的角色，点击搜索可以查询远端所有角色。'
    }

    if (this.isStardust) {
      return '星光碎片：消耗活股或塔值补充目标已损失塔值。\n消耗目标的等级必须大于等于补充目标等级，使用活股时消耗等级可以比目标等级少1级。\n塔值少于250时塔会找不到请自行查询远端数据。'
    }

    return '混沌魔方：消耗10点塔值，抽取随机目标10-100的股份。\n当前每天可使用3次。'
  }

  renderLeft() {
    const { leftValue } = this.state
    return (
      <>
        <SearchInput
          placeholder='消耗'
          value={leftValue}
          onChangeText={this.onChangeLeft}
        />
        <List data={this.left} renderItem={this.renderItemLeft} />
      </>
    )
  }

  renderItemLeft = ({ item }) => {
    const { leftItem } = this.state
    const disabled = leftItem && leftItem.id !== item.id
    return (
      <Item
        id={item.id}
        src={cover(item)}
        level={lv(item)}
        name={item.name}
        extra={`${
          item.assets && item.assets !== item.sacrifices
            ? `${formatNumber(item.assets, 0)} / `
            : ''
        }${formatNumber(item.sacrifices || item.state, 0)} / +${toFixed(
          item.rate,
          1
        )}`}
        disabled={disabled}
        onPress={() => this.onSelectLeft(item)}
      />
    )
  }

  renderRight() {
    const { rightValue } = this.state
    if (this.isChaos) {
      return (
        <Text type='tinygrailText' size={13} align='center'>
          随机目标
        </Text>
      )
    }

    return (
      <>
        <SearchInput
          placeholder='目标'
          value={rightValue}
          returnKeyType='search'
          returnKeyLabel='搜索'
          onChangeText={this.onChangeRight}
          onSubmitEditing={this.doSearch}
        />
        <List data={this.right} renderItem={this.renderItemRight} />
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
          onPress={() => Alert.alert('使用说明', this.alert)}
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
    backgroundColor: _.tSelect(_.colorTinygrailContainer, _.colorBg)
  },
  focus: {
    marginTop: -parseInt(_.window.height * 0.56)
  },
  wrap: {
    width: '100%',
    maxWidth: _.window.maxWidth,
    height: _.window.height * 0.54,
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
