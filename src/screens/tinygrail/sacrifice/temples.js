/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:06:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 22:40:26
 */
import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import ItemTemple from '../_/item-temple'

const event = {
  id: '资产重组.圣殿图查看'
}

export default
@observer
class Temples extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  }

  get myTemple() {
    const { $ } = this.context
    const { list } = $.charaTemple
    return list.find(item => item.name === $.hash)
  }

  get templeRate() {
    const { $ } = this.context
    const { rate, level } = $.chara
    return rate * (level + 1) * 0.3
  }

  get levelMap() {
    const { $ } = this.context
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
    const { $ } = this.context
    const { expand } = $.state
    const { list } = $.charaTemple
    if (expand) {
      // 自己的排最前
      return list.sort((a, b) => {
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

  onShowRule = () => {}

  onShowAlert = () => {
    const { $ } = this.context
    const { rate } = $.chara
    const { amount } = $.userLogs
    t('资产重组.股息查看', {
      monoId: $.monoId
    })

    const rateBonus = amount * rate
    let message = `您拥有流动股 ${amount} 股，派息 ${toFixed(rateBonus, 1)}`
    if (this.myTemple) {
      const { sacrifices = 0 } = this.myTemple || {}
      const templeRateBonus = sacrifices * this.templeRate
      message += `\n圣殿股 ${sacrifices} 股，派息 ${toFixed(
        templeRateBonus,
        1
      )}\n共派息 ${toFixed(rateBonus + templeRateBonus, 1)}`
    }

    Alert.alert('小圣杯助手', message, [
      {
        text: '知道了'
      }
    ])
  }

  render() {
    const { $ } = this.context
    const { style } = this.props
    const { showTemples, expand } = $.state
    const { rate } = $.chara
    const { list } = $.charaTemple
    return (
      <View style={[styles.container, style]}>
        <Flex style={styles.info}>
          <Flex.Item>
            <Text type='tinygrailText' size={13} lineHeight={17}>
              固定资产{list.length || '-'}{' '}
              {!!list.length &&
                `(${this.levelMap[3]}+${this.levelMap[2]}+${this.levelMap[1]})`}{' '}
              /{' '}
              <Text size={17} type='warning'>
                +{rate ? formatNumber(rate) : '-'} (
                {toFixed(this.templeRate, 2)})
              </Text>
            </Text>
          </Flex.Item>
          <Touchable
            style={{
              padding: _.sm
            }}
            onPress={this.onShowAlert}
          >
            <Text type='tinygrailText'>[角色计息]</Text>
          </Touchable>
        </Flex>
        {showTemples && (
          <Flex style={styles.temples} wrap='wrap'>
            {this.list.map(item => (
              <ItemTemple
                key={item.nickname}
                event={event}
                cover={item.cover}
                avatar={item.avatar}
                name={item.name}
                nickname={item.nickname}
                sacrifices={item.sacrifices}
                level={item.level}
                count={item.count}
              />
            ))}
          </Flex>
        )}
        <Flex style={_.mt.md} justify='center'>
          <Text
            style={styles.expand}
            type='tinygrailText'
            onPress={$.toggleTemples}
          >
            [{showTemples ? '隐藏' : '显示'}圣殿]
          </Text>
          {showTemples && list.length > 6 && (
            <Text
              style={[styles.expand, _.ml.md]}
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
}

const styles = StyleSheet.create({
  container: {
    minHeight: 120
  },
  temples: {
    paddingHorizontal: _.wind - _._wind
  },
  info: {
    paddingTop: _.md,
    paddingLeft: _.wind,
    paddingRight: _.wind - _.sm
  },
  expand: {
    paddingVertical: _.sm
  }
})
