/*
 * @Author: czy0729
 * @Date: 2021-03-08 21:36:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 05:09:36
 */
import React from 'react'
import { View } from 'react-native'
import { computed } from 'mobx'
import { Flex, Text, Image, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { formatNumber, info, confirm, tinygrailOSS, stl } from '@utils'
import { obc } from '@utils/decorators'
import CharactersModal from '@tinygrail/_/characters-modal'
import { ITEMS_DESC } from '@tinygrail/_/ds'
import { ViewStyle } from '@types'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const OSS = 'https://tinygrail.mange.cn/image'

class Items extends React.Component<{
  style?: ViewStyle
}> {
  state = {
    title: '',
    visible: false
  }

  onOpen = (title: string) => {
    return this.setState({
      title,
      visible: true
    })
  }

  onClose = () => {
    return this.setState({
      title: '',
      visible: false
    })
  }

  get text() {
    const { $ } = this.context as Ctx
    const { amount = 0, sacrifices = 0 } = $.userLogs
    const { assets = 0 } = $.myTemple
    const max = parseInt(assets || sacrifices)

    const text = []
    text.push(
      `当前 ${formatNumber(amount, 0)} 股`,
      `固定资产 ${formatNumber(max, 0)}${
        max !== sacrifices ? ` (${formatNumber(sacrifices, 0)})` : ''
      }`
    )
    return text.join(' / ')
  }

  @computed get item() {
    const { $ } = this.context as Ctx
    const { id, level, icon, name, rank, rate } = $.chara
    const { assets = 0 } = $.myTemple
    const { sacrifices = 0 } = $.userLogs
    return {
      assets,
      level,
      icon,
      id,
      name,
      rank,
      rate,
      sacrifices
    }
  }

  renderTop() {
    const { $ } = this.context as Ctx
    const { showItems } = $.state
    return (
      <Flex>
        <Flex.Item>
          <Text type='tinygrailPlain' size={13}>
            道具
            <Text type='tinygrailText' size={11} lineHeight={13}>
              {' '}
              {this.text}
            </Text>
          </Text>
        </Flex.Item>
        <IconTouchable
          style={[_.ml.sm, _.mr._sm]}
          name={showItems ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
          color={_.colorTinygrailText}
          onPress={$.toggleItems}
        />
      </Flex>
    )
  }

  renderList() {
    const { $ } = this.context as Ctx
    const { showItems } = $.state
    const { sacrifices = 0 } = $.userLogs
    const { assets = 0 } = $.myTemple
    if (!showItems) return null

    return (
      <Flex wrap='wrap' align='start'>
        <View style={this.styles.item}>
          <Touchable
            onPress={() => {
              if (sacrifices < 500) {
                info('需要已献祭大于500才能使用')
                return
              }

              confirm(
                '确定消耗10点固定资产使用混沌魔方?',
                () =>
                  $.doUse({
                    title: '混沌魔方'
                  }),
                '小圣杯助手'
              )
            }}
          >
            <Flex style={_.mr.sm} align='start'>
              <Image size={28} radius src={tinygrailOSS(`${OSS}/cube.png`)} />
              <Flex.Item style={_.ml.sm}>
                <Text type='tinygrailPlain' size={12} bold>
                  混沌魔方
                </Text>
                <Text style={_.mt.xs} type='tinygrailText' size={9}>
                  {ITEMS_DESC['混沌魔方']}
                </Text>
              </Flex.Item>
            </Flex>
          </Touchable>
        </View>
        <View style={this.styles.item}>
          <Touchable
            onPress={() => {
              if (assets < 100) {
                info('当前固定资产不够100点')
                return
              }
              this.onOpen('虚空道标')
            }}
          >
            <Flex align='start'>
              <Image size={28} radius src={tinygrailOSS(`${OSS}/sign.png`)} />
              <Flex.Item style={_.ml.sm}>
                <Text type='tinygrailPlain' size={12} bold>
                  虚空道标
                </Text>
                <Text style={_.mt.xs} type='tinygrailText' size={9}>
                  {ITEMS_DESC['虚空道标']}
                </Text>
              </Flex.Item>
            </Flex>
          </Touchable>
        </View>
        <View style={this.styles.item}>
          <Touchable
            onPress={() => {
              if (assets === sacrifices) {
                info('当前固定资产没有损耗')
                return
              }
              this.onOpen('星光碎片')
            }}
          >
            <Flex style={_.mr.sm} align='start'>
              <Image size={28} radius src={tinygrailOSS(`${OSS}/star.png`)} />
              <Flex.Item style={_.ml.sm}>
                <Text type='tinygrailPlain' size={12} bold>
                  星光碎片
                </Text>
                <Text style={_.mt.xs} type='tinygrailText' size={9}>
                  {ITEMS_DESC['星光碎片']}
                </Text>
              </Flex.Item>
            </Flex>
          </Touchable>
        </View>
        <View style={this.styles.item}>
          <Touchable
            onPress={() => {
              if (assets < 100) {
                info('当前固定资产不够100点')
                return
              }
              this.onOpen('闪光结晶')
            }}
          >
            <Flex align='start'>
              <Image size={28} radius src={tinygrailOSS(`${OSS}/fire.png`)} />
              <Flex.Item style={_.ml.sm}>
                <Text type='tinygrailPlain' size={12} bold>
                  闪光结晶
                </Text>
                <Text style={_.mt.xs} type='tinygrailText' size={9}>
                  {ITEMS_DESC['闪光结晶']}
                </Text>
              </Flex.Item>
            </Flex>
          </Touchable>
        </View>
        <View style={[this.styles.item, this.styles.full]}>
          <Touchable
            onPress={() => {
              if (assets < 100) {
                info('当前固定资产不够100点')
                return
              }
              this.onOpen('鲤鱼之眼')
            }}
          >
            <Flex align='start'>
              <Image size={28} radius src={tinygrailOSS(`${OSS}/eye2.png`)} />
              <Flex.Item style={_.ml.sm}>
                <Text type='tinygrailPlain' size={12} bold>
                  鲤鱼之眼
                </Text>
                <Text style={_.mt.xs} type='tinygrailText' size={9}>
                  {ITEMS_DESC['鲤鱼之眼']}
                </Text>
              </Flex.Item>
            </Flex>
          </Touchable>
        </View>
      </Flex>
    )
  }

  renderModal() {
    const { $ } = this.context as Ctx
    const { title, visible } = this.state
    const props: {
      leftItem?: unknown
      rightItem?: unknown
    } = {}
    if (['虚空道标', '闪光结晶', '鲤鱼之眼'].includes(title)) {
      props.leftItem = this.item
    } else {
      props.rightItem = this.item
    }
    return (
      <CharactersModal
        title={title}
        visible={visible}
        onClose={this.onClose}
        onSubmit={$.doUse}
        {...props}
      />
    )
  }

  render() {
    const { style } = this.props
    return (
      <>
        <View style={stl(this.styles.container, style)}>
          {this.renderTop()}
          {this.renderList()}
        </View>
        {this.renderModal()}
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(Items)
