/*
 * @Author: czy0729
 * @Date: 2020-06-28 14:02:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-06 19:42:57
 */
import React from 'react'
import { View } from 'react-native'
import { computed } from 'mobx'
import { Button, Flex, Iconfont, Modal, Text } from '@components'
import { Popover } from '@_'
import { _, tinygrailStore } from '@stores'
import {
  alert,
  formatNumber,
  getStorage,
  getTimestamp,
  info,
  setStorage,
  stl,
  toFixed,
  trim
} from '@utils'
import { ob } from '@utils/decorators'
import { FROZEN_FN, M2 } from '@constants'
import { calculateRate } from '../utils'
import BackHandler from './back-handler'
import Item from './item'
import ItemBottom from './item-bottom'
import List from './list'
import SearchInput from './search-input'
import { assets, bottomTextType, charge, cover, lv, rk } from './utils'
import { HIT_SLOP, ITEMS_NOTIFY, ITEMS_TYPE, ITEMS_USED, NAMESPACE } from './ds'
import { memoStyles } from './styles'
import { PickItem, Props, State } from './types'

export { ITEMS_TYPE, ITEMS_USED }

class CharactersModal extends React.Component<Props, State> {
  static defaultProps: Props = {
    title: '',
    visible: false,
    onClose: FROZEN_FN,
    onSubmit: FROZEN_FN
  }

  state: State = {
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
    isTemple: false,
    focus: false
  }

  private _title: string

  async componentDidMount() {
    this._title = this.props.title

    const state = (await getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      leftItem: null,
      rightItem: null,
      loading: false,
      focus: false,
      title: this.props.title
    })

    await this.initFetch()
    this.setDefaultRightItem(this.props.rightItemId)
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (nextProps.title !== this._title) {
      this._title = nextProps.title

      const { leftItem = null, rightItem = null } = nextProps
      this.setState({
        leftItem,
        rightItem,
        loading: false,
        title: nextProps.title
      })
    }

    this.setDefaultRightItem(nextProps.rightItemId)
  }

  setDefaultRightItem = (nextId: number) => {
    setTimeout(() => {
      const id = nextId || this.props.rightItemId
      if (id && this.right && this.right?.list?.length) {
        const find = this.right.list.find(item => item.id == id)
        if (find) {
          this.setState({
            rightItem: find
          })
        }
      }
    }, 0)
  }

  onBackAndroid = () => {
    const { visible, onClose } = this.props
    if (visible) {
      onClose()
      return true
    }

    return false
  }

  onSelectLeft = (item: PickItem) => {
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
        if (this.isStarDust && leftItem && rightItem) {
          this.setState({
            amount: Math.min(assets(leftItem), charge(rightItem))
          })
        }
      }
    )
  }

  onSelectRight = (item: PickItem) => {
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
        if (this.isStarDust && leftItem && rightItem) {
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

  onChangeLeft = (value: string) => {
    this.setState({
      leftValue: trim(value)
    })
  }

  onChangeRight = (value: string) => {
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

  onChangeNum = (value: string) => {
    let _value: any = parseInt(value)
    if (Number.isNaN(_value) || _value == 0) _value = ''
    this.setState({
      amount: _value
    })
  }

  onToogleIsTemple = (title: string) => {
    const { isTemple } = this.state
    if ((isTemple && title === '消耗圣殿') || (!isTemple && title === '消耗活股')) {
      return
    }

    this.setState({
      leftItem: null,
      isTemple: !isTemple
    })
  }

  onClose = () => {
    const { onClose } = this.props
    onClose()
    this.setState({
      loading: false
    })
    setStorage(NAMESPACE, this.state)
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
    const keyword = String(rightValue).trim()
    if (!keyword) {
      info('请输入关键字')
      return
    }

    if (/^\d+$/.test(keyword)) {
      this.setState({
        search: [
          {
            id: Number(keyword),
            name: '指定 ID 人物',
            level: 0
          }
        ],
        rightItem: null
      })
      return
    }

    const result = await tinygrailStore.doSearch({
      keyword: rightValue
    })
    if (result.data && result.data.State === 0) {
      const search = result.data.Value.filter((item: { ICO: any }) => !item.ICO).map(
        (item: { Id: any; Name: any; Level: any }) => ({
          id: item.Id,
          name: item.Name,
          level: item.Level
        })
      )
      this.setState({
        search,
        rightItem: null
      })
    }
  }

  onSubmit = async () => {
    const { leftItem, rightItem, amount, isTemple, loading } = this.state
    if (!this.canSubmit || loading) return

    const { title, onSubmit } = this.props
    this.setState({
      loading: true
    })
    await onSubmit({
      title,
      monoId: leftItem.id,
      toMonoId: rightItem ? rightItem.id : 0,
      amount,
      isTemple,
      leftItem,
      rightItem
    })

    this.setState({
      loading: false
    })
    if (this.isStarDust) {
      this.setState({
        amount: 0
      })
    }
  }

  onAlert = () => {
    alert(this.alert, '使用说明')
  }

  // -------------------- fetch --------------------
  initFetch = async () => {
    const current = getTimestamp()
    if (
      !this.temple._loaded ||
      (this.temple._loaded && current - Number(this.temple._loaded) > M2)
    ) {
      return this.fetchTemple()
    }

    if (!this.chara._loaded || (this.chara._loaded && current - Number(this.chara._loaded) > M2)) {
      return this.fetchMyCharaAssets()
    }

    if (!this.msrc._loaded || (this.msrc._loaded && current - Number(this.msrc._loaded) > M2)) {
      return this.fetchMsrc()
    }

    if (!this.star._loaded || (this.star._loaded && current - Number(this.star._loaded) > M2)) {
      return this.fetchStar()
    }

    if (
      !this.fantasy._loaded ||
      (this.fantasy._loaded && current - Number(this.fantasy._loaded) > M2)
    ) {
      return this.fetchFantasy()
    }
  }

  /** 我的圣殿 */
  fetchTemple = () => tinygrailStore.fetchTemple()

  /** 我的持仓 */
  fetchMyCharaAssets = () => tinygrailStore.fetchMyCharaAssets()

  /** 最高股息 */
  fetchMsrc = () => tinygrailStore.fetchList('msrc')

  /** 通天塔 */
  fetchStar = () => tinygrailStore.fetchStar(1, 100)

  /** 幻想乡 */
  fetchFantasy = () => tinygrailStore.fetchFantasyList()

  // -------------------- data --------------------
  @computed get temple() {
    return tinygrailStore.temple()
  }

  @computed get chara() {
    return tinygrailStore.myCharaAssets.chara
  }

  @computed get msrc() {
    return tinygrailStore.msrc
  }

  @computed get star() {
    return tinygrailStore.star('1|100')
  }

  @computed get fantasy() {
    return tinygrailStore.fantasy
  }

  // -------------------- type --------------------
  @computed get isChaos() {
    return this.props.title === '混沌魔方'
  }

  @computed get isGuidePost() {
    return this.props.title === '虚空道标'
  }

  @computed get isStarDust() {
    return this.props.title === '星光碎片'
  }

  @computed get isStarBreak() {
    return this.props.title === '闪光结晶'
  }

  @computed get isFishEye() {
    return this.props.title === '鲤鱼之眼'
  }

  // -------------------- computed data --------------------
  @computed get left() {
    const { rightItem, leftValue, isTemple } = this.state

    // 虚空道标 (消耗我的圣殿)
    if (this.isGuidePost) {
      return {
        ...this.temple,
        list: this.temple.list
          .filter(item => {
            if (this.props.leftItem) return item.id === this.props.leftItem.id

            // 一次消耗 100 且成塔
            if (item.assets < 100 || item.sacrifices < 500) return false

            if (rightItem) {
              if (leftValue) return item.name.includes(leftValue)
            }

            if (leftValue) return item.name.includes(leftValue)

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
    if (this.isStarDust) {
      const data = isTemple ? this.temple : this.chara
      return {
        ...data,
        list: data.list
          .filter(item => {
            if (assets(item) < 10) return false

            if (rightItem) {
              const _lv = lv(item) - lv(rightItem)
              if (leftValue) {
                if (isTemple) {
                  return (
                    item.name.includes(leftValue) && lv(item) + (isTemple ? 0 : 1) >= lv(rightItem)
                  )
                }

                return (
                  item.name.includes(leftValue) && assets(item) >= Math.min(32, 2 ** -(_lv + 1))
                )
              }

              return isTemple
                ? lv(item) + (isTemple ? 0 : 1) >= lv(rightItem)
                : assets(item) >= Math.min(32, 2 ** -(_lv + 1))
            }

            if (leftValue) return item.name.includes(leftValue)

            return true
          })
          .sort((a, b) => {
            const lA = lv(a)
            const lB = lv(b)
            if (lA !== lB) return lB - lA

            return a.current - b.current
          })
      }
    }

    // 混沌魔方 (消耗我的圣殿) | 兼容星光碎片
    return {
      ...this.temple,
      list: this.temple.list
        .filter(item => {
          if (this.props.leftItem) return item.id === this.props.leftItem.id

          // 一次消耗10且成塔
          if (assets(item) < 250 || item.sacrifices < 500) return false

          if (leftValue) return item.name.includes(leftValue)

          return true
        })
        .sort((a, b) => a.rate - b.rate)
    }
  }

  @computed get computedLeft() {
    const { leftFilter } = this.state
    if (!leftFilter || !this.left?.list?.length) return this.left

    return {
      ...this.left,
      list: this.left.list.filter(item => lv(item) == leftFilter)
    }
  }

  @computed get leftLevelMap() {
    const { list } = this.left
    const data = {}

    try {
      ;(list || []).forEach(item =>
        data[lv(item) || 0] ? (data[lv(item) || 0] += 1) : (data[lv(item) || 0] = 1)
      )
    } catch (error) {
      console.error(error)
    }

    return data
  }

  @computed get leftDS() {
    const sum = Object.keys(this.leftLevelMap).reduce(
      (total, level) => total + this.leftLevelMap[level],
      0
    )
    return [
      `全部 (${sum})`,
      ...Object.keys(this.leftLevelMap).map(level => `lv${level} (${this.leftLevelMap[level]})`)
    ]
  }

  @computed get leftChangeText() {
    const { amount, isTemple } = this.state
    if (this.isChaos) return '-10'

    if (this.isGuidePost || this.isStarBreak || this.isFishEye) return '-100'

    if (this.isStarDust) {
      const { leftItem, rightItem } = this.state
      if (!isTemple && leftItem && rightItem) {
        const _lv = lv(leftItem) - lv(rightItem)
        if (_lv < 0) return `每 -${Math.min(32, 2 ** -(_lv + 1))}`
      }

      return `-${amount || '?'}`
    }

    return ''
  }

  @computed get right() {
    const { title } = this.props
    if (!title || this.isChaos) return false

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

    if (this.isGuidePost) {
      return {
        ...this.msrc,
        list: this.msrc.list
          .filter(item => {
            if (leftItem) {
              if (rightValue) return item.name.includes(rightValue)
            }

            if (rightValue) return item.name.includes(rightValue)

            return true
          })
          .sort((a, b) => rk(a) - rk(b))
      }
    }

    if (this.isStarDust) {
      return {
        ...this.temple,
        list: this.temple.list
          .filter(item => {
            if (this.props.rightItemId) return item.id === this.props.rightItemId

            if (this.props.rightItem) return item.id === this.props.rightItem.id

            if (item.assets === item.sacrifices) return false

            if (leftItem) {
              if (rightValue) {
                if (isTemple) {
                  return (
                    item.name.includes(rightValue) && lv(item) <= lv(leftItem) + (isTemple ? 0 : 1)
                  )
                }

                return item.name.includes(rightValue)
              }

              return isTemple ? lv(item) <= lv(leftItem) + (isTemple ? 0 : 1) : true
            }

            if (rightValue) return item.name.includes(rightValue)

            return true
          })
          .sort((a, b) => rk(a) - rk(b))
      }
    }

    if (this.isStarBreak) {
      return {
        ...this.star,
        list: this.star.list.filter(item => {
          if (rightValue) return item.name.includes(rightValue)

          return true
        })
      }
    }

    if (this.isFishEye) {
      return {
        ...this.fantasy,
        list: this.fantasy.list.filter(item => {
          if (rightValue) return item.name.includes(rightValue)

          return true
        })
      }
    }

    return {
      ...this.temple,
      list: this.temple.list
        .filter(item => {
          if (item.assets === item.sacrifices) return false

          if (leftItem) {
            if (rightValue) {
              return item.name.includes(rightValue) && lv(item) <= lv(leftItem) + (isTemple ? 0 : 1)
            }

            return lv(item) <= lv(leftItem) + (isTemple ? 0 : 1)
          }

          if (rightValue) return item.name.includes(rightValue)

          return true
        })
        .sort((a, b) => lv(b) - lv(a))
    }
  }

  @computed get computedRight() {
    if (!this.right) return this.right

    const { rightFilter } = this.state
    if (!rightFilter || !this.right?.list?.length) return this.right

    return {
      ...this.right,
      list: this.right?.list.filter(
        (item: { cLevel?: any; level?: any }) => lv(item) == rightFilter
      )
    }
  }

  @computed get rightLevelMap() {
    const { list } = this.right || {}
    const data = {}

    try {
      ;(list || []).forEach((item: { cLevel: any; level: any }) =>
        data[lv(item) || 0] ? (data[lv(item) || 0] += 1) : (data[lv(item) || 0] = 1)
      )
    } catch (error) {
      console.error(error)
    }

    return data
  }

  @computed get rightDS() {
    const sum = Object.keys(this.rightLevelMap).reduce(
      (total, level) => total + this.rightLevelMap[level],
      0
    )
    return [
      `全部 (${sum})`,
      ...Object.keys(this.rightLevelMap)
        .map(level => `lv${level} (${this.rightLevelMap[level]})`)
        .reverse()
    ]
  }

  @computed get rightChangeText() {
    if (this.isChaos) return '+10-100'

    if (this.isGuidePost) return '+10-100'

    const { amount } = this.state
    if (this.isStarDust || this.isFishEye) return `+${amount || '?'}`

    if (this.isStarBreak) return '-20-200'

    return ''
  }

  // -------------------- status --------------------
  @computed get canSubmit() {
    const { leftItem, rightItem, amount } = this.state
    if (this.isGuidePost) return !!(leftItem && rightItem)

    if (this.isStarDust) return !!(leftItem && rightItem && amount)

    return !!leftItem
  }

  @computed get alert() {
    if (this.isGuidePost) return ITEMS_NOTIFY['混沌魔方']

    if (this.isStarDust) return ITEMS_NOTIFY['星光碎片']

    return ITEMS_NOTIFY['混沌魔方']
  }

  renderFilter(
    filter: string,
    data: string[],
    map: { [x: string]: any },
    onSelect: { (lv: any): void; (lv: any): void; (arg0: any): void }
  ) {
    return (
      <Popover.Old
        data={data}
        hitSlop={HIT_SLOP}
        onSelect={(title: string) => {
          const lv = title.split(' ')[0]
          onSelect(lv === '全部' ? '' : lv.replace('lv', ''))
        }}
      >
        <Flex justify='center'>
          <Iconfont
            name='md-filter-list'
            size={14}
            color={filter ? _.colorAsk : _.colorTinygrailText}
          />
          <Text style={_.ml.xs} size={10} type={filter ? 'ask' : 'tinygrailText'}>
            {filter ? `lv${filter}` : '等级'}
            {map[filter] ? ` (${map[filter]})` : ''}
          </Text>
        </Flex>
      </Popover.Old>
    )
  }

  renderLeft() {
    const { leftValue, leftFilter } = this.state
    return (
      <>
        <Flex style={_.ml.xs}>
          {this.renderFilter(leftFilter, this.leftDS, this.leftLevelMap, (lv: any) =>
            this.setState({
              leftFilter: lv
            })
          )}
          <Flex.Item style={_.ml.sm}>
            <SearchInput placeholder='消耗' value={leftValue} onChangeText={this.onChangeLeft} />
          </Flex.Item>
        </Flex>
        <List data={this.computedLeft} renderItem={this.renderLeftItem} />
      </>
    )
  }

  renderLeftItem = ({ item }: { item: PickItem }) => {
    const { leftItem, isTemple } = this.state
    const disabled = leftItem?.id !== item?.id
    const extra = []
    if (!this.isStarDust) {
      if (item.assets !== (item.sacrifices || item.state)) {
        extra.push(
          `${formatNumber(item.assets, 0)} (${formatNumber(item.sacrifices || item.state, 0)})`
        )
      } else {
        extra.push(formatNumber(item.sacrifices || item.state, 0))
      }
    } else if (isTemple) {
      extra.push(formatNumber(item.sacrifices || item.state, 0))
    } else {
      extra.push(formatNumber(item.state, 0))
    }
    if (item.current) extra.push(`₵${formatNumber(item.current, 0)}`)
    extra.push(
      `+${toFixed(item.rate, 1)} (${toFixed(calculateRate(item.rate, item.rank, item.stars), 1)})`
    )

    return (
      <Item
        type='ask'
        id={item.id}
        src={cover(item)}
        level={lv(item)}
        name={item.name}
        rank={item.rank}
        extra={extra.join(' / ')}
        assets={item.assets}
        sacrifices={item.sacrifices}
        disabled={disabled}
        item={item}
        onPress={this.onSelectLeft}
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
          {this.renderFilter(rightFilter, this.rightDS, this.rightLevelMap, lv =>
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
        <List data={this.computedRight} renderItem={this.renderRightItem} />
      </>
    )
  }

  renderRightItem = ({ item }: { item: PickItem }) => {
    const { rightItem } = this.state
    const disabled = rightItem?.id !== item?.id
    const extra = []

    if (item.assets && item.assets !== item.sacrifices) {
      extra.push(`${formatNumber(item.assets, 0)} (${formatNumber(item.sacrifices, 0)})`)
    } else if (item.sacrifices) {
      extra.push(formatNumber(item.sacrifices, 0))
    }
    if (item.current) extra.push(`₵${formatNumber(item.current, 0)}`)
    if (item.userAmount) extra.push(formatNumber(item.userAmount, 0))
    if (item.rate) {
      extra.push(
        `+${toFixed(item.rate, 1)} (${toFixed(calculateRate(item.rate, item.rank, item.stars), 1)})`
      )
    }

    return (
      <Item
        type={this.isStarBreak ? 'ask' : 'bid'}
        id={item.id}
        src={cover(item)}
        level={lv(item)}
        name={item.name}
        extra={extra.join(' / ')}
        assets={item.assets}
        sacrifices={item.sacrifices}
        rank={item.rank}
        disabled={disabled}
        item={item}
        onPress={this.onSelectRight}
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
                // rank={leftItem.rank}
                change={this.leftChangeText}
                type={bottomTextType(this.leftChangeText)}
                onPress={this.onCancelLeft}
              />
            ) : (
              <Text type='tinygrailText' size={10}>
                - 选择消耗 -
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
                  // rank={rightItem.rank}
                  change={this.rightChangeText}
                  type={bottomTextType(this.rightChangeText)}
                  onPress={this.onCancelRight}
                />
              ) : (
                <Text type='tinygrailText' size={10}>
                  - 选择目标 -
                </Text>
              )}
            </Flex.Item>
          )}
          {!this.isStarDust && this.renderSubmitBtn()}
        </Flex>
        {this.isStarDust && (
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
    if (!this.isStarDust) return null

    const { amount } = this.state
    return (
      <>
        <Text type='tinygrailText' size={10}>
          消耗股份
        </Text>
        <Flex.Item style={_.ml.sm}>
          <Text type='tinygrailPlain' size={10}>
            {amount}
          </Text>
          {/* <SearchInput
            keyboardType='numeric'
            placeholder='数量'
            value={amount}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChangeText={this.onChangeNum}
          /> */}
        </Flex.Item>
      </>
    )
  }

  render() {
    const { visible, title } = this.props
    const { focus } = this.state
    return (
      <>
        <Modal
          style={stl(this.styles.modal, focus && this.styles.focus)}
          visible={visible}
          title={title}
          focus={false}
          type='tinygrailPlain'
          onClose={this.onClose}
        >
          <Flex style={this.styles.wrap}>
            <Flex.Item>{this.renderLeft()}</Flex.Item>
            <Flex.Item style={_.ml.md}>{this.renderRight()}</Flex.Item>
          </Flex>
          {this.renderBottom()}
        </Modal>
        <BackHandler handler={this.onBackAndroid} />
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default ob(CharactersModal)
