/*
 * @Author: czy0729
 * @Date: 2019-09-12 11:40:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 11:00:16
 */
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'

function Submit({ style }) {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { loading, isIce } = $.state
  return (
    <Touchable
      style={stl(styles.btn, $.isBid ? styles.btnBid : styles.btnAsk, style)}
      onPress={$.doSubmit}
    >
      <Flex justify='center'>
        {loading && <ActivityIndicator style={_.mr.sm} color='white' size='small' />}
        <Text style={styles.text} align='center'>
          {isIce && '冰山'}
          {$.isBid ? '买入' : '卖出'}
        </Text>
      </Flex>
    </Touchable>
  )
}

export default ob(Submit)

const memoStyles = _.memoStyles(() => ({
  btn: {
    padding: 8,
    marginVertical: 8
  },
  text: {
    color: _.__colorPlain__
  },
  btnBid: {
    backgroundColor: _.colorBid
  },
  btnAsk: {
    backgroundColor: _.colorAsk
  }
}))
