/*
 * @Author: czy0729
 * @Date: 2021-01-20 11:59:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:36:12
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { simpleTime } from '@utils'
import { memoStyles } from './styles'

import type { Props } from './types'

function FloorText({ time, floor, isNew }: Props) {
  const styles = memoStyles()

  return (
    <Flex>
      {isNew && <View style={styles.new} />}
      <Text style={styles.container} type='sub' size={11} lineHeight={12}>
        {simpleTime(time)}
        {'  '}#{String(floor).replace('#', '')}
      </Text>
    </Flex>
  )
}

export default observer(FloorText)
