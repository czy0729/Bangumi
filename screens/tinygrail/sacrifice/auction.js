/*
 * @Author: czy0729
 * @Date: 2019-11-17 15:33:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-25 15:43:48
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Input, Text, Button, Slider as CompSlider } from '@components'
import { _ } from '@stores'
import { formatNumber, lastDate, toFixed } from '@utils'
import { observer } from '@utils/decorators'
import Stepper from './stepper'

function Auction({ style }, { $ }) {
  const styles = memoStyles()
  const { auctionLoading, auctionAmount, auctionPrice, lastAuction } = $.state
  const { price = 0, amount } = $.valhallChara
  const { balance } = $.assets
  const { state, type } = $.auctionStatus
  return (
    <View style={[styles.container, style]}>
      <Flex>
        <Flex.Item flex={1.6}>
          <Text
            style={{
              color: _.colorTinygrailPlain
            }}
          >
            竞拍
            <Text
              style={{
                color: _.colorTinygrailText
              }}
              size={12}
              lineHeight={14}
            >
              {' '}
              底价 (₵{price ? toFixed(price + 0.01, 2) : '-'})
            </Text>
          </Text>
        </Flex.Item>
        <Flex.Item style={_.ml.sm}>
          <Text
            style={{
              color: _.colorTinygrailText
            }}
            size={12}
          >
            数量 ({amount ? formatNumber(amount, 0) : '-'}股)
          </Text>
        </Flex.Item>
        <View style={[styles.btnSubmit, _.ml.sm]} />
      </Flex>
      <Flex style={_.mt.sm}>
        <Flex.Item flex={1.6}>
          <View style={styles.inputWrap}>
            <Stepper />
          </View>
        </Flex.Item>
        <Flex.Item style={_.ml.sm}>
          <View style={styles.inputWrap}>
            <Input
              style={styles.input}
              keyboardType='numeric'
              value={String(auctionAmount)}
              onChangeText={$.changeAuctionAmount}
            />
          </View>
        </Flex.Item>
        <View style={[styles.btnSubmit, _.ml.sm]}>
          <Button
            style={{
              height: 36
            }}
            type='bid'
            radius={false}
            loading={auctionLoading}
            onPress={$.doAuction}
          >
            竞拍
          </Button>
        </View>
      </Flex>
      {!!lastAuction.time && (
        <Text
          style={[
            {
              color: _.colorTinygrailText
            },
            _.mt.sm
          ]}
          size={12}
        >
          上次出价 (₵{lastAuction.price} / {formatNumber(lastAuction.amount, 0)}
          股 / {lastDate(lastAuction.time)})
        </Text>
      )}
      <Flex style={_.mt.md}>
        <Flex.Item>
          <Text style={styles.plain} size={12}>
            合计{' '}
            <Text
              style={{
                color: _.colorAsk
              }}
              size={12}
            >
              -₵{toFixed(auctionAmount * auctionPrice, 2)}
            </Text>
          </Text>
        </Flex.Item>
        <Text
          style={[
            _.ml.sm,
            {
              color: _.colorTinygrailText
            }
          ]}
          size={12}
        >
          当前竞拍 {state}人 / {formatNumber(type, 0)}股
        </Text>
      </Flex>
      <Flex style={[styles.slider, _.mt.sm]}>
        <View style={{ width: '100%' }}>
          <CompSlider
            value={auctionAmount}
            min={0}
            max={parseInt(balance / Math.max(auctionPrice, price || 1))}
            step={1}
            minimumTrackTintColor={_.colorAsk}
            maximumTrackTintColor={_.colorTinygrailBorder}
            onChange={value => $.changeAuctionAmount(value)}
          />
        </View>
      </Flex>
      <Flex>
        <Flex.Item>
          <Text style={styles.text} size={12}>
            余额 0
          </Text>
        </Flex.Item>
        <Text style={styles.text} size={12}>
          ₵{formatNumber(balance, 2)}
        </Text>
      </Flex>
    </View>
  )
}

Auction.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Auction)

const memoStyles = _.memoStyles(_ => ({
  container: {
    padding: _.wind,
    backgroundColor: _.colorTinygrailBg
  },
  inputWrap: {
    paddingLeft: 4,
    borderColor: _.colorTinygrailBorder,
    borderWidth: 1
  },
  input: {
    height: 34,
    color: _.colorTinygrailPlain,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0
  },
  placeholder: {
    position: 'absolute',
    top: 8,
    right: 8
  },
  slider: {
    height: 40,
    opacity: 0.8
  },
  plain: {
    color: _.colorTinygrailPlain
  },
  btnSubmit: {
    width: 72
  },
  text: {
    color: _.colorTinygrailText
  }
}))
