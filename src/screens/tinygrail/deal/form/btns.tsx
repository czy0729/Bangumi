/*
 * @Author: czy0729
 * @Date: 2019-09-11 17:17:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 10:59:54
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'

function Btns() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { type } = $.state
  const isBid = type === 'bid'
  return (
    <Flex>
      <Flex.Item>
        <Touchable
          style={stl(styles.btn, isBid && styles.btnBid)}
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
          style={stl(styles.btn, !isBid && styles.btnAsk)}
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

export default ob(Btns)

const memoStyles = _.memoStyles(() => ({
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
