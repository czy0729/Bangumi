/*
 * @Author: czy0729
 * @Date: 2019-09-12 11:40:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-12 11:59:03
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Text, Touchable } from '@components'
import { observer } from '@utils/decorators'
import { colorBid, colorAsk } from '../../styles'

function Submit({ style }, { $ }) {
  const { type } = $.state
  const isBid = type === 'bid'
  return (
    <Touchable
      style={[styles.btn, isBid ? styles.btnBid : styles.btnAsk, style]}
      onPress={$.doSubmit}
    >
      <Text type='plain' align='center'>
        {isBid ? '买入' : '卖出'}
      </Text>
    </Touchable>
  )
}

Submit.contextTypes = {
  $: PropTypes.object
}

export default observer(Submit)

const styles = StyleSheet.create({
  btn: {
    padding: 8,
    marginVertical: 8,
    backgroundColor: 'rgb(23, 41, 65)'
  },
  btnBid: {
    backgroundColor: colorBid
  },
  btnAsk: {
    backgroundColor: colorAsk
  }
})
