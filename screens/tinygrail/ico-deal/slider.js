/*
 * @Author: czy0729
 * @Date: 2019-09-20 22:05:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-04 01:40:38
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Input, Text, Button, Slider as CompSlider } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'

function Slider({ style }, { $ }) {
  const styles = memoStyles()
  const { loading, amount } = $.state
  const { balance } = $.assets
  const balanceText = `可用 ${formatNumber(balance)}`
  return (
    <View style={[styles.container, style]}>
      <Flex>
        <Flex.Item>
          <View style={styles.inputWrap}>
            <Input
              style={styles.input}
              keyboardType='numeric'
              value={String(parseInt(amount))}
              onChangeText={$.changeAmount}
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
            loading={loading}
            onPress={$.doSubmit}
          >
            确定
          </Button>
        </View>
      </Flex>
      <Text style={styles.balance} type='tinygrailPlain' size={12}>
        {balanceText}
      </Text>
      <Flex style={[styles.slider, _.mt.sm]}>
        <View style={{ width: '100%' }}>
          <CompSlider
            value={amount}
            min={5000}
            max={balance < 5000 ? 5000 : parseInt(balance)}
            step={100}
            minimumTrackTintColor={_.colorBid}
            maximumTrackTintColor={_.colorTinygrailBorder}
            onChange={value => $.changeAmount(value < 5000 ? 5000 : value)}
          />
        </View>
      </Flex>
      <Flex>
        <Flex.Item>
          <Text type='tinygrailText' size={12}>
            {formatNumber(5000, 0)}
          </Text>
        </Flex.Item>
        <Text type='tinygrailText' size={12}>
          {formatNumber(balance < 5000 ? 5000 : balance, 0)}
        </Text>
      </Flex>
    </View>
  )
}

Slider.contextTypes = {
  $: PropTypes.object
}

export default observer(Slider)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind,
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
  balance: {
    marginTop: 16
  },
  slider: {
    height: 40,
    opacity: 0.8
  },
  btnSubmit: {
    width: 96
  }
}))
