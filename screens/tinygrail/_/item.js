/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-18 00:41:07
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { Avatar, StockPreview } from '@screens/_'
import { open, lastDate, getTimestamp } from '@utils'
import { formatTime } from '@utils/app'
import { HOST } from '@constants'
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

function Item(props, { navigation }) {
  const {
    index,
    id,
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
  const isICO = !!users
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
  const extra = isICO
    ? `${formatTime(_end)} / ₵${totalText} / ${users}人`
    : `${lastDate(
        getTimestamp(lastOrder.replace('T', ' '))
      )} / ₵${marketValueText} / ${totalText}`

  return (
    <View style={styles.container}>
      <Flex align='start'>
        <Avatar
          style={styles.image}
          src={icon}
          size={44}
          onPress={() =>
            navigation.push('Mono', {
              monoId: `character/${id}`
            })
          }
        />
        <Flex.Item style={!isTop && styles.border}>
          <Flex align='start'>
            <Flex.Item style={_.mr.sm}>
              <Touchable
                style={styles.item}
                highlight
                onPress={() => {
                  if (isDeal) {
                    navigation.push('TinygrailDeal', {
                      monoId: `character/${id}`,
                      type,
                      form: 'item' // @notice 点击K线图跳转特殊处理
                    })
                    return
                  }

                  if (isICO) {
                    open(`${HOST}/character/${id}`)
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
                      {isDeal ? (
                        <Text
                          style={{
                            color: type === 'bid' ? colorBid : colorAsk
                          }}
                          size={16}
                        >
                          ({state}股){' '}
                        </Text>
                      ) : (
                        `${index + 1}. `
                      )}
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
                        _.mt.sm,
                        {
                          color: colorText
                        }
                      ]}
                      size={12}
                    >
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
