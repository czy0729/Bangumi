/*
 * @Author: czy0729
 * @Date: 2021-03-08 21:36:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-12 01:39:33
 */
import React from 'react'
import { Alert, View } from 'react-native'
import { computed } from 'mobx'
import { Flex, Text, Image, Touchable } from '@components'
import { IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { obc } from '@utils/decorators'
import { tinygrailOSS } from '@utils/app'
import { info } from '@utils/ui'
import CharactersModal from '@tinygrail/_/characters-modal'

const OSS = 'https://tinygrail.oss-cn-hangzhou.aliyuncs.com/image'

class Items extends React.Component {
  state = {
    title: '',
    visible: false
  }

  onOpen = title =>
    this.setState({
      title,
      visible: true
    })

  onClose = () =>
    this.setState({
      title: '',
      visible: false
    })

  get text() {
    const { $ } = this.context
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
    const { $ } = this.context
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
    const { $ } = this.context
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
          name={showItems ? 'down' : 'up'}
          color={_.colorTinygrailText}
          onPress={$.toggleItems}
        />
      </Flex>
    )
  }

  renderList() {
    const { $ } = this.context
    const { showItems } = $.state
    const { sacrifices = 0 } = $.userLogs
    const { assets = 0 } = $.myTemple
    if (!showItems) {
      return null
    }

    return (
      <Flex wrap='wrap' align='start'>
        <Touchable
          style={this.styles.item}
          onPress={() => {
            if (sacrifices < 500) {
              info('需要已献祭大于500才能使用')
              return
            }

            Alert.alert('小圣杯助手', '确定消耗10点固定资产使用混沌魔方?', [
              {
                text: '取消',
                style: 'cancel'
              },
              {
                text: '确定',
                onPress: () =>
                  $.doUse({
                    title: '混沌魔方'
                  })
              }
            ])
          }}
        >
          <Flex style={_.mr.sm} align='start'>
            <Image size={28} radius src={tinygrailOSS(`${OSS}/cube.png`)} />
            <Flex.Item style={_.ml.sm}>
              <Text type='tinygrailPlain' size={12} bold>
                混沌魔方
              </Text>
              <Text style={_.mt.xs} type='tinygrailText' size={9}>
                消耗10点「固定资产」获取随机角色20-200股，需要有一座塔才能使用,
                每天3次
              </Text>
            </Flex.Item>
          </Flex>
        </Touchable>
        <Touchable
          style={this.styles.item}
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
                消耗100点「固定资产」获取指定角色20-100股，需当前角色等级大于等于目标等级,
                每天3次
              </Text>
            </Flex.Item>
          </Flex>
        </Touchable>
        <Touchable
          style={this.styles.item}
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
                消耗当前角色「活股」补充目标「固定资产」，受等级差倍率影响，最高为32倍
              </Text>
            </Flex.Item>
          </Flex>
        </Touchable>
        <Touchable
          style={this.styles.item}
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
                消耗当前角色100点「固定资产」，对目标「星之力」造成20-200股随机伤害，受等级差倍率影响
              </Text>
            </Flex.Item>
          </Flex>
        </Touchable>
        <Touchable
          style={[this.styles.item, this.styles.full]}
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
                消耗当前角色100点「固定资产」，将「幻想乡」中100-300股转移到「英灵殿」，可能会让（33%-50%）目标股份转化为「星之力」
              </Text>
            </Flex.Item>
          </Flex>
        </Touchable>
      </Flex>
    )
  }

  renderModal() {
    const { $ } = this.context
    const { title, visible } = this.state
    const props = {}
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
        <View style={[this.styles.container, style]} wrap='wrap'>
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

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorTinygrailBg
  },
  item: {
    width: '50%',
    marginVertical: _.sm
  },
  full: {
    width: '100%'
  }
}))
