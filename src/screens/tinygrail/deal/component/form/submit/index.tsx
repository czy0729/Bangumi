/*
 * @Author: czy0729
 * @Date: 2019-09-12 11:40:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 12:58:59
 */
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { useObserver } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { _, tinygrailStore, useStore } from '@stores'
import { stl } from '@utils'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function Submit({ style }) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const { loading, isIce } = $.state

    return (
      <Touchable
        style={stl(styles.btn, $.isBid ? styles.btnBid : styles.btnAsk, style)}
        onPress={() => {
          if (tinygrailStore.checkAuth()) $.doSubmit()
        }}
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
  })
}

export default Submit
