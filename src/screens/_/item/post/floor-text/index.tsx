/*
 * @Author: czy0729
 * @Date: 2021-01-20 11:59:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-13 22:42:11
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { simpleTime } from '@utils'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'
import { Props } from './types'

function FloorText({ time, floor, isNew }: Props) {
  return useObserver(() => {
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
  })
}

export default FloorText
