/*
 * @Author: czy0729
 * @Date: 2019-09-11 17:17:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-12 11:56:19
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorBid, colorAsk } from '../../styles'

function Btns(props, { $ }) {
  const { type } = $.state
  const isBid = type === 'bid'
  return (
    <Flex>
      <Flex.Item>
        <Touchable
          style={[styles.btn, isBid && styles.btnBid]}
          onPress={() => $.toggleType('bid')}
        >
          <Text type={isBid ? 'plain' : 'sub'} align='center'>
            买入
          </Text>
        </Touchable>
      </Flex.Item>
      <Flex.Item style={_.ml.sm}>
        <Touchable
          style={[styles.btn, !isBid && styles.btnAsk]}
          onPress={() => $.toggleType('ask')}
        >
          <Text type={!isBid ? 'plain' : 'sub'} align='center'>
            卖出
          </Text>
        </Touchable>
      </Flex.Item>
    </Flex>
  )
}

Btns.contextTypes = {
  $: PropTypes.object
}

export default observer(Btns)

const styles = StyleSheet.create({
  btn: {
    padding: 8,
    marginBottom: 8,
    backgroundColor: 'rgb(23, 41, 65)'
  },
  btnBid: {
    backgroundColor: colorBid
  },
  btnAsk: {
    backgroundColor: colorAsk
  }
})
