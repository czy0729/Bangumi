/*
 * @Author: czy0729
 * @Date: 2019-09-12 11:40:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-13 02:26:50
 */
import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorBid, colorAsk } from '../../styles'

function Submit({ style }, { $ }) {
  const { loading } = $.state
  return (
    <Touchable
      style={[styles.btn, $.isBid ? styles.btnBid : styles.btnAsk, style]}
      onPress={$.doSubmit}
    >
      <Flex justify='center'>
        {loading && (
          <ActivityIndicator style={_.mr.sm} color='white' size='small' />
        )}
        <Text type='plain' align='center'>
          {$.isBid ? '买入' : '卖出'}
        </Text>
      </Flex>
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
