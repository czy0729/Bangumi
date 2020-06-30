/*
 * @Author: czy0729
 * @Date: 2020-06-28 14:02:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-30 20:05:49
 */
import React from 'react'
import { Alert } from 'react-native'
import { observer } from 'mobx-react'
import {
  ListView,
  Touchable,
  Flex,
  Text,
  Iconfont,
  Input,
  Button
} from '@components'
import Modal from '@components/@/ant-design/modal'
import { Avatar, IconTouchable } from '@screens/_'
import { _, tinygrailStore } from '@stores'
import {
  toFixed,
  formatNumber,
  trim,
  getTimestamp,
  getStorage,
  setStorage
} from '@utils'
import { keyExtractor, tinygrailOSS } from '@utils/app'
import { info } from '@utils/ui'

const namespace = 'TinygrailCharactersModal'
const initState = {
  leftItem: null,
  leftValue: '',
  rightItem: null,
  rightValue: '',
  search: null,
  loading: false,
  title: ''
}

export default
@observer
class CharactersModal extends React.Component {
  static defaultProps = {
    visible: false,
    onSubmit: Function.prototype,
    onClose: Function.prototype
  }

  state = initState
  title

  async componentDidMount() {
    const state = (await getStorage(namespace)) || {}
    this.setState({
      ...state,
      rightItem: null,
      loading: false
    })
    this.title = this.props.title
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.title) {
      this.setState({
        ...initState,
        title: nextProps.title
      })
      this.title = nextProps.title
    }
  }

  onSelectLeft = item => {
    const { leftItem } = this.state
    const actived = leftItem && leftItem.id === item.id
    this.setState({
      leftItem: actived ? null : item
    })
  }

  onSelectRight = item => {
    const { rightItem } = this.state
    const actived = rightItem && rightItem.id === item.id
    this.setState({
      rightItem: actived ? null : item
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

  onClose = async () => {
    await setStorage(namespace, this.state)

    const { onClose } = this.props
    onClose()

    this.setStte({
      loading: false
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
        search
      })
    }
  }

  onSubmit = async () => {
    const { leftItem, rightItem, loading } = this.state
    if (this.btnType === 'disabled' || loading) {
      return
    }

    const { title, onSubmit } = this.props
    this.setState({
      loading: true
    })
    await onSubmit({
      title,
      monoId: leftItem.id,
      toMonoId: rightItem ? rightItem.id : 0
    })

    this.setState({
      loading: false
    })
  }

  get left() {
    const { left, title } = this.props
    const { rightItem, leftValue } = this.state
    if (title === '虚空道标') {
      if (rightItem && rightItem.level) {
        return {
          ...left,
          list: left.list
            .filter(item => {
              if (leftValue) {
                return (
                  item.name.includes(leftValue) &&
                  (item.cLevel || 1) >= rightItem.level
                )
              }
              return (item.cLevel || 1) >= rightItem.level
            })
            .sort((a, b) => b.rate - a.rate)
        }
      }

      if (leftValue) {
        return {
          ...left,
          list: left.list
            .filter(item => item.name.includes(leftValue))
            .sort((a, b) => b.rate - a.rate)
        }
      }

      return {
        ...left,
        list: left.list.sort((a, b) => b.rate - a.rate)
      }
    }

    if (leftValue) {
      return {
        ...left,
        list: left.list
          .filter(item => item.name.includes(leftValue))
          .sort((a, b) => a.rate - b.rate)
      }
    }

    return {
      ...left,
      list: left.list.sort((a, b) => a.rate - b.rate)
    }
  }

  get right() {
    const { right } = this.props
    if (right === false) {
      return false
    }

    const { leftItem, rightValue, search } = this.state
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

    if (leftItem && leftItem.cLevel) {
      if (rightValue) {
        return {
          ...right,
          list: right.list.filter(
            item =>
              item.name.includes(rightValue) &&
              (item.level || 1) <= leftItem.cLevel
          )
        }
      }

      return {
        ...right,
        list: right.list.filter(item => (item.level || 1) <= leftItem.cLevel)
      }
    }

    if (rightValue) {
      return {
        ...right,
        list: right.list.filter(item => item.name.includes(rightValue))
      }
    }

    return right
  }

  get btnType() {
    const { title } = this.props
    const { leftItem, rightItem } = this.state
    if (title === '虚空道标') {
      return leftItem && rightItem ? 'bid' : 'disabled'
    }
    return leftItem ? 'bid' : 'disabled'
  }

  renderItem = ({ item }) => {
    const { leftItem } = this.state
    const disabled = leftItem && leftItem.id !== item.id
    const src = item.cover
    const level = item.cLevel
    return (
      <Touchable onPress={() => this.onSelectLeft(item)}>
        <Flex style={[this.styles.item, disabled && this.styles.disabled]}>
          <Avatar
            src={tinygrailOSS(src)}
            size={28}
            name={item.name}
            borderColor='transparent'
          />
          <Flex.Item style={_.ml.sm}>
            <Text type='tinygrailPlain' size={10} bold numberOfLines={1}>
              <Text type='ask' size={10} bold>
                lv{level}{' '}
              </Text>
              {item.name}
            </Text>
            <Text type='tinygrailText' size={10} numberOfLines={1}>
              {item.assets !== item.sacrifices
                ? `${formatNumber(item.assets, 0)} / `
                : ''}
              {formatNumber(item.sacrifices, 0)} / +{toFixed(item.rate, 1)}
            </Text>
          </Flex.Item>
        </Flex>
      </Touchable>
    )
  }

  renderItemRight = ({ item }) => {
    const { rightItem } = this.state
    const disabled = rightItem && rightItem.id !== item.id
    const src = item.icon
    const level = item.level
    return (
      <Touchable onPress={() => this.onSelectRight(item)}>
        <Flex style={[this.styles.item, disabled && this.styles.disabled]}>
          {src ? (
            <Avatar
              src={tinygrailOSS(src)}
              size={28}
              name={item.name}
              borderColor='transparent'
              onPress={() => {}}
            />
          ) : (
            <Text type='tinygrailPlain' size={10} bold>
              #{item.id}
            </Text>
          )}
          <Flex.Item style={_.ml.sm}>
            <Text type='tinygrailPlain' size={10} bold numberOfLines={1}>
              <Text type='ask' size={10} bold>
                lv{level}{' '}
              </Text>
              {item.name}
            </Text>
            {!!item.rate && (
              <Text type='tinygrailText' size={10} numberOfLines={1}>
                ₵{toFixed(item.current, 0)} / +{toFixed(item.rate, 1)}
              </Text>
            )}
          </Flex.Item>
        </Flex>
      </Touchable>
    )
  }

  renderLeft() {
    const { title } = this.props
    const { leftValue } = this.state
    return (
      <>
        <Flex style={this.styles.inputWrap}>
          <Flex.Item>
            <Input
              style={this.styles.input}
              placeholder='消耗：名称'
              placeholderTextColor={_.colorTinygrailText}
              value={leftValue}
              onChangeText={this.onChangeLeft}
            />
          </Flex.Item>
          <Iconfont name='search' size={14} color={_.colorTinygrailText} />
        </Flex>
        <ListView
          key={title}
          style={[_.container.flex, _.mt.sm]}
          keyExtractor={keyExtractor}
          refreshControlProps={{
            color: _.colorTinygrailText
          }}
          data={this.left}
          showMesume={false}
          footerTextType='tinygrailText'
          footerEmptyDataText='没有符合的结果'
          renderItem={this.renderItem}
        />
      </>
    )
  }

  renderRight() {
    const { rightValue } = this.state
    if (this.right === false) {
      return (
        <Text type='tinygrailText' size={13} align='center'>
          随机目标
        </Text>
      )
    }

    const { title } = this.props
    return (
      <>
        <Flex style={this.styles.inputWrap}>
          <Flex.Item>
            <Input
              style={this.styles.input}
              placeholder='目标：名称'
              placeholderTextColor={_.colorTinygrailText}
              value={rightValue}
              returnKeyType='search'
              returnKeyLabel='搜索'
              onChangeText={this.onChangeRight}
              onSubmitEditing={this.doSearch}
            />
          </Flex.Item>
          <Touchable onPress={this.doSearch}>
            <Iconfont name='search' size={14} color={_.colorTinygrailText} />
          </Touchable>
        </Flex>
        <ListView
          key={title}
          style={[_.container.flex, _.mt.sm]}
          keyExtractor={keyExtractor}
          refreshControlProps={{
            color: _.colorTinygrailText
          }}
          data={this.right}
          showMesume={false}
          footerTextType='tinygrailText'
          footerEmptyDataText='搜索显示远端数据'
          renderItem={this.renderItemRight}
        />
      </>
    )
  }

  renderBtn() {
    const { leftItem, rightItem, loading } = this.state
    return (
      <Flex style={[_.mt.sm, _.mb.sm]}>
        <Flex.Item style={_.mr.sm}>
          {leftItem ? (
            <Flex>
              <Avatar
                src={tinygrailOSS(leftItem.cover)}
                size={28}
                name={leftItem.name}
                borderColor='transparent'
              />
              <Flex.Item style={_.ml.sm}>
                <Text type='tinygrailPlain' size={10} bold numberOfLines={1}>
                  <Text type='ask' size={10} bold>
                    lv{leftItem.cLevel}{' '}
                  </Text>
                  {leftItem.name}
                </Text>
                <Text type='ask' size={10}>
                  -100
                </Text>
              </Flex.Item>
            </Flex>
          ) : (
            <Text type='tinygrailText' size={10}>
              请选择消耗
            </Text>
          )}
        </Flex.Item>
        {this.right !== false && (
          <Flex.Item style={_.mr.sm}>
            {rightItem ? (
              <Flex>
                {rightItem.icon ? (
                  <Avatar
                    src={tinygrailOSS(rightItem.icon)}
                    size={28}
                    name={rightItem.name}
                    borderColor='transparent'
                  />
                ) : (
                  <Text type='tinygrailPlain' size={10} bold>
                    #{rightItem.id}
                  </Text>
                )}
                <Flex.Item style={_.ml.sm}>
                  <Text type='tinygrailPlain' size={10} bold numberOfLines={1}>
                    <Text type='ask' size={10} bold>
                      lv{rightItem.level}{' '}
                    </Text>
                    {rightItem.name}
                  </Text>
                  <Text type='bid' size={10}>
                    +10-100
                  </Text>
                </Flex.Item>
              </Flex>
            ) : (
              <Text type='tinygrailText' size={10}>
                请选择目标
              </Text>
            )}
          </Flex.Item>
        )}
        <Flex.Item style={_.ml.sm}>
          <Button type={this.btnType} loading={loading} onPress={this.onSubmit}>
            提交
          </Button>
        </Flex.Item>
      </Flex>
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
        maskClosable
        closable
        onClose={this.onClose}
      >
        <Flex style={this.styles.wrap}>
          <Flex.Item>{this.renderLeft()}</Flex.Item>
          <Flex.Item style={_.ml.md}>{this.renderRight()}</Flex.Item>
        </Flex>
        {this.renderBtn()}
        <IconTouchable
          style={this.styles.information}
          size={20}
          color={_.colorTinygrailText}
          name='information'
          onPress={() =>
            Alert.alert(
              '使用说明',
              '混沌魔方：消耗10点塔值，抽取随机目标10-100的股份。\n虚空道标：消耗100点塔值，抽取目标随机数量的股份，消耗目标的等级必须大于等于抽取目标等级。左侧数据基于自己的圣殿。右侧数据基于最高股息前面的角色，点击搜索可以查询远端所有角色。'
            )
          }
        />
      </Modal>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  modal: {
    width: _.window.width - 2 * _.wind,
    maxWidth: 400,
    backgroundColor: _.tSelect(_.colorTinygrailContainer, _.colorBg)
  },
  focus: {
    marginTop: -parseInt(_.window.height * 0.32)
  },
  wrap: {
    width: '100%',
    maxWidth: _.window.maxWidth,
    height: _.window.height * 0.54,
    maxHeight: 640,
    paddingBottom: _.sm,
    marginTop: _.md
  },
  inputWrap: {
    paddingHorizontal: 6,
    borderColor: _.colorTinygrailBorder,
    borderWidth: 1,
    borderRadius: _.radiusXs
  },
  input: {
    paddingVertical: 4,
    height: 24,
    padding: 0,
    ..._.fontSize(11),
    color: _.colorTinygrailPlain,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0
  },
  item: {
    paddingVertical: 8
  },
  disabled: {
    opacity: 0.4
  },
  information: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    marginTop: -28,
    marginRight: 8
  }
}))
