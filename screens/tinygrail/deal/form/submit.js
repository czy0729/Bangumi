/*
 * @Author: czy0729
 * @Date: 2019-09-12 11:40:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 21:30:51
 */
import React from 'react'
import { ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

function Submit({ style }, { $ }) {
  const styles = memoStyles()
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
        <Text
          style={{
            color: _.colorTinygrailPlain
          }}
          align='center'
        >
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

const memoStyles = _.memoStyles(_ => ({
  btn: {
    padding: 8,
    marginVertical: 8,
    backgroundColor: 'rgb(23, 41, 65)'
  },
  btnBid: {
    backgroundColor: _.colorBid
  },
  btnAsk: {
    backgroundColor: _.colorAsk
  }
}))
