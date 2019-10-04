/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-03 21:05:54
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { Avatar, StockPreview } from '@screens/_'
import { lastDate, getTimestamp } from '@utils'
import { tinygrailOSS, formatTime } from '@utils/app'
import _ from '@styles'
import {
  colorBid,
  colorAsk,
  colorContainer,
  colorText,
  colorBorder
} from '../styles'

let timezone = new Date().getTimezoneOffset() / -60
if (String(timezone).length === 1) {
  timezone = `0${timezone}`
}

const colorMap = {
  bid: colorBid,
  asks: colorAsk,
  chara: _.colorWarning,
  ico: _.colorPrimary
}

function Item(props, { navigation }) {
  const {
    index,
    id,
    monoId,
    name,
    icon,
    lastOrder,
    end,
    marketValue,
    total,
    bonus,
    users, // 有此值为ico中
    type, // 有此值为用户委托单
    state
  } = props
  const isTop = index === 0
  const isICO = users !== undefined
  const isDeal = !!type

  let marketValueText
  let totalText
  if (marketValue > 100000000) {
    marketValueText = `${(marketValue / 100000000).toFixed(1)}亿`
  } else if (marketValue > 1000) {
    marketValueText = `${(marketValue / 10000).toFixed(1)}万`
  }
  if (total > 1000) {
    totalText = `${(total / 10000).toFixed(1)}万`
  }

  let _end = end
  if (!String(_end).includes('+')) {
    _end = `${end}+${timezone}:00`
  }
  let extra = isICO
    ? `${formatTime(_end)} / 已筹集${totalText}`
    : `${lastDate(
        getTimestamp((lastOrder || '').replace('T', ' '))
      )} / 总${marketValueText} / 量${totalText}`
  if (users && users !== 'ico') {
    extra += ` / ${users}人`
  }

  let prevText
  if (['bid', 'asks', 'chara'].includes(type)) {
    prevText = `${state}股`
  } else if (type === 'ico') {
    prevText = `注资${state}`
  }

  return (
    <View style={styles.container}>
      <Flex align='start'>
        <Avatar
          style={styles.image}
          src={tinygrailOSS(icon)}
          size={40}
          borderColor='transparent'
          onPress={() =>
            navigation.push('Mono', {
              monoId: `character/${monoId || id}`
            })
          }
        />
        <Flex.Item style={!isTop && styles.border}>
          <Flex align='start'>
            <Flex.Item style={_.mr.sm}>
              <Touchable
                style={styles.item}
                onPress={() => {
                  if (isICO) {
                    navigation.push('TinygrailICODeal', {
                      monoId: `character/${monoId || id}`
                    })
                    return
                  }

                  if (isDeal) {
                    navigation.push('TinygrailDeal', {
                      monoId: `character/${id}`,
                      type,
                      form: 'item' // @notice 点击K线图跳转特殊处理
                    })
                    return
                  }

                  navigation.push('TinygrailTrade', {
                    monoId: `character/${id}`
                  })
                }}
              >
                <Flex align='start'>
                  <Flex.Item>
                    <Text size={16} type='plain'>
                      {!isDeal && `${index + 1}. `}
                      {name}
                      {!!bonus && (
                        <Text size={12} lineHeight={16} type='warning'>
                          {' '}
                          X{bonus}
                        </Text>
                      )}
                    </Text>
                    <Text
                      style={[
                        _.mt.xs,
                        {
                          color: colorText
                        }
                      ]}
                      size={12}
                    >
                      {isDeal && (
                        <Text
                          style={{
                            color: colorMap[type]
                          }}
                          size={12}
                        >
                          {prevText}
                        </Text>
                      )}
                      {isDeal && ' / '}
                      {extra}
                    </Text>
                  </Flex.Item>
                </Flex>
              </Touchable>
            </Flex.Item>
            <StockPreview style={_.mr.sm} {...props} _loaded theme='dark' />
          </Flex>
        </Flex.Item>
      </Flex>
    </View>
  )
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const styles = StyleSheet.create({
  container: {
    paddingLeft: _.wind,
    backgroundColor: colorContainer
  },
  image: {
    marginRight: _.xs,
    marginTop: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingLeft: _.sm
  },
  border: {
    borderTopColor: colorBorder,
    borderTopWidth: StyleSheet.hairlineWidth
  }
})
