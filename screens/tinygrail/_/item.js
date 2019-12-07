/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-08 02:23:05
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { Avatar, StockPreview } from '@screens/_'
import { lastDate, getTimestamp, formatNumber } from '@utils'
import { tinygrailOSS, formatTime } from '@utils/app'
import { B, M } from '@constants'
import _ from '@styles'
import {
  colorBid,
  colorAsk,
  colorContainer,
  colorText,
  colorBorder
} from '../styles'
import Popover from './popover'

let timezone = new Date().getTimezoneOffset() / -60
if (String(timezone).length === 1) {
  timezone = `0${timezone}`
}

const colorMap = {
  bid: colorBid,
  asks: colorAsk,
  chara: _.colorWarning,
  ico: _.colorPrimary,
  auction: _.colorWarning
}

/**
 * 修复时间
 * 2019-10-04T13:34:03.4243768+08:00 => 2019-10-04 13:34:03
 * @param {*} time
 */
function fixedTime(time) {
  return (time || '')
    .replace('T', ' ')
    .split('+')[0]
    .split('.')[0]
}

function Item(props, { navigation }) {
  const {
    _index,
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
    users,
    type,
    amount,
    price,
    state,
    rate
  } = props
  const isTop = index === 0
  const isICO = users !== undefined // 有users为ico中
  const isDeal = !!type // 有此值为用户委托单
  const isAuction = type === 'auction'
  const isValhall = type === 'valhall'

  let marketValueText
  let totalText
  if (marketValue > B) {
    marketValueText = `${parseFloat((marketValue / B).toFixed(1))}亿`
  } else if (marketValue > M) {
    marketValueText = `${parseFloat((marketValue / M).toFixed(1))}万`
  } else {
    marketValueText = formatNumber(marketValue, 0)
  }

  if (total > 1000) {
    totalText = `${parseFloat((total / M).toFixed(1))}万`
  } else {
    totalText = formatNumber(total, 0)
  }

  let _end = end
  if (!String(_end).includes('+')) {
    _end = `${end}+${timezone}:00`
  }

  let extra
  if (isICO) {
    extra = `${formatTime(_end)} / 已筹集${totalText || '-'}`
  } else {
    extra = lastDate(getTimestamp(fixedTime(lastOrder)))
    if (isValhall) {
      extra += ` / 底价${parseFloat(price.toFixed(1))} / 数量${formatNumber(
        state,
        0
      )}`
    } else {
      extra += ` / 总${marketValueText || '-'} / 量${totalText || '-'}`
    }
  }

  if (users && users !== 'ico') {
    extra += ` / ${users || '-'}人`
  }

  let prevText
  let auctionText = '竞拍中'
  let auctionTextColor = colorText
  let auctionSubText = ''
  if (['bid', 'asks', 'chara'].includes(type)) {
    prevText = `${state}股`
  } else if (type === 'ico') {
    prevText = `注资${state}`
  } else if (type === 'auction') {
    auctionSubText = `₵${price} / ${formatNumber(amount, 0)}`
    if (state === 1) {
      auctionText = '成功'
      auctionTextColor = colorBid
    } else if (state === 2) {
      auctionText = '失败'
      auctionTextColor = colorAsk
    }
  }

  return (
    <Flex style={styles.container} align='start'>
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
                if (isAuction || isValhall) {
                  navigation.push('TinygrailSacrifice', {
                    monoId: `character/${monoId || id}`
                  })
                  return
                }

                if (isICO) {
                  navigation.push('TinygrailICODeal', {
                    monoId: `character/${monoId || id}`
                  })
                  return
                }

                if (isDeal) {
                  navigation.push('TinygrailDeal', {
                    monoId: `character/${id}`,
                    type
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
                    {!isDeal && `${_index}. `}
                    {name}
                    {!!bonus && (
                      <Text size={12} lineHeight={16} type='warning'>
                        {' '}
                        X{bonus}
                      </Text>
                    )}
                    {!!rate && (
                      <Text
                        style={{
                          color: colorText
                        }}
                        size={12}
                        lineHeight={16}
                      >
                        {' '}
                        +{parseFloat(rate.toFixed(2))}
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
                    {isDeal && !isAuction && !isValhall && ' / '}
                    {extra}
                  </Text>
                </Flex.Item>
                {isAuction && (
                  <View>
                    <Text
                      style={{
                        color: auctionTextColor
                      }}
                      size={16}
                      align='right'
                    >
                      {auctionText}
                    </Text>
                    <Text
                      style={[
                        _.mt.xs,
                        {
                          color: colorText
                        }
                      ]}
                      size={12}
                      align='right'
                    >
                      {auctionSubText}
                    </Text>
                  </View>
                )}
              </Flex>
            </Touchable>
          </Flex.Item>
          {!isAuction && (
            <StockPreview
              style={{
                marginRight: -_.sm
              }}
              {...props}
              _loaded
              theme='dark'
            />
          )}
          {!isICO && <Popover id={monoId || id} />}
        </Flex>
      </Flex.Item>
    </Flex>
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
    borderTopWidth: _.hairlineWidth
  }
})
