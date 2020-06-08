/*
 * @Author: czy0729
 * @Date: 2019-09-11 17:17:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-20 00:54:57
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

function Btns(props, { $ }) {
  const styles = memoStyles()
  const { type } = $.state
  const isBid = type === 'bid'
  return (
    <Flex>
      <Flex.Item>
        <Touchable
          style={[styles.btn, isBid && styles.btnBid]}
          onPress={() => $.toggleType('bid')}
        >
          <Text
            style={{
              color: isBid ? _.__colorPlain__ : _.colorTinygrailText
            }}
            align='center'
          >
            买入
          </Text>
        </Touchable>
      </Flex.Item>
      <Flex.Item style={_.ml.sm}>
        <Touchable
          style={[styles.btn, !isBid && styles.btnAsk]}
          onPress={() => $.toggleType('ask')}
        >
          <Text
            style={{
              color: !isBid ? _.__colorPlain__ : _.colorTinygrailText
            }}
            align='center'
          >
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

const memoStyles = _.memoStyles(_ => ({
  btn: {
    padding: 8,
    marginBottom: 8,
    backgroundColor: _.colorTinygrailBorder
  },
  btnBid: {
    backgroundColor: _.colorBid
  },
  btnAsk: {
    backgroundColor: _.colorAsk
  }
}))
