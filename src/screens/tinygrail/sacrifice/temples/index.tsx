/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:06:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 18:47:11
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber, stl, toFixed } from '@utils'
import { obc } from '@utils/decorators'
import ItemTemple from '@tinygrail/_/item-temple'
import { calculateRate } from '@tinygrail/_/utils'
import { ViewStyle } from '@types'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const EVENT = {
  id: '资产重组.圣殿图查看'
} as const

class Temples extends React.Component<{
  style?: ViewStyle
}> {
  get myTemple() {
    const { $ } = this.context as Ctx
    const { list } = $.charaTemple
    return list.find(item => item.name === $.hash)
  }

  get levelMap() {
    const { $ } = this.context as Ctx
    const { list } = $.charaTemple
    const levelMap = {
      1: 0,
      2: 0,
      3: 0,
      4: 0
    }
    list.forEach(item => {
      const { level } = item
      if (!levelMap[level]) {
        levelMap[level] = 1
      } else {
        levelMap[level] += 1
      }
    })
    return levelMap
  }

  get list() {
    const { $ } = this.context as Ctx
    const { expand } = $.state
    const { list } = $.charaTemple
    if (expand) {
      // 自己的排最前
      return list.slice().sort((a, b) => {
        let _a = 0
        let _b = 0
        if (a.name === $.hash) _a += 1
        if (b.name === $.hash) _b += 1
        return _b - _a
      })
    }

    const _list = []
    const map = {}
    list.forEach(item => {
      if (!map[item.cover]) {
        map[item.cover] = _list.length
        _list.push({
          ...item,
          count: 1
        })
        return
      }
      _list[map[item.cover]].count += 1
    })

    // 保证能看见自己
    if (this.myTemple && !_list.find(item => item.name === $.hash)) {
      _list.unshift(this.myTemple)
    }
    return _list
  }

  // onShowAlert = () => {
  //   const { $ } = this.context as Ctx
  //   const { rate } = $.chara
  //   const { amount } = $.userLogs
  //   t('资产重组.股息查看', {
  //     monoId: $.monoId
  //   })

  //   const rateBonus = amount * rate
  //   let message = `您拥有流动股 ${amount} 股，派息 ${toFixed(rateBonus, 1)}`
  //   if (this.myTemple) {
  //     const { sacrifices = 0 } = this.myTemple || {}
  //     const templeRateBonus = sacrifices * this.templeRate
  //     message += `\n圣殿股 ${sacrifices} 股，派息 ${toFixed(
  //       templeRateBonus,
  //       1
  //     )}\n共派息 ${toFixed(rateBonus + templeRateBonus, 1)}`
  //   }

  //   alert(message, '小圣杯助手')
  // }

  render() {
    const { $ } = this.context as Ctx
    const { style } = this.props
    const { showTemples, expand } = $.state
    const { rate, rank, stars } = $.chara
    const { list } = $.charaTemple
    return (
      <View style={stl(this.styles.container, style)}>
        <Flex style={this.styles.info}>
          <Flex.Item>
            <Text type='tinygrailPlain' size={13}>
              固定资产{' '}
              <Text type='tinygrailText' size={11} lineHeight={13}>
                {list.length || '-'}{' '}
                {!!list.length && `(${this.levelMap[3]}+${this.levelMap[2]}+${this.levelMap[1]})`} /{' '}
              </Text>
              <Text type='warning' size={11} lineHeight={13}>
                +{rate ? formatNumber(rate, 1) : '-'}({toFixed(calculateRate(rate, rank, stars), 1)}
                )
              </Text>
            </Text>
          </Flex.Item>
          {/* <Touchable
            style={{
              padding: _.sm
            }}
            size={13}
            onPress={this.onShowAlert}
          >
            <Text type='tinygrailText'>[计息]</Text>
          </Touchable> */}
        </Flex>
        {showTemples && (
          <Flex style={this.styles.temples} wrap='wrap'>
            {this.list.map(item => (
              <ItemTemple
                key={item.nickname}
                assets={item.assets}
                avatar={item.avatar}
                cover={item.cover}
                level={item.level}
                userId={item.name}
                nickname={item.nickname}
                sacrifices={item.sacrifices}
                refine={item.refine}
                event={EVENT}
              />
            ))}
          </Flex>
        )}
        <Flex style={_.mt.md} justify='center'>
          <Touchable style={this.styles.expand} onPress={$.toggleTemples}>
            <Iconfont
              name={showTemples ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
              color={_.colorTinygrailText}
            />
          </Touchable>
          {showTemples && list.length > 6 && (
            <Text
              style={[this.styles.expand, _.ml.md]}
              type='tinygrailText'
              onPress={$.toggleExpand}
            >
              [{expand ? '收起' : '展开'}圣殿]
            </Text>
          )}
        </Flex>
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(Temples)
