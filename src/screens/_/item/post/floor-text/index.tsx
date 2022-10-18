/*
 * @Author: czy0729
 * @Date: 2021-01-20 11:59:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-18 04:08:43
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { simpleTime } from '@utils'
import { memoStyles } from './styles'

function FloorText({ time, floor }) {
  const styles = memoStyles()
  return (
    <Flex style={styles.container}>
      <Text type='sub' size={10} lineHeight={12}>
        {simpleTime(time)}
      </Text>
      <Text style={_.ml.sm} type='sub' size={10} lineHeight={12}>
        #
      </Text>
      <Text type='sub' size={10} lineHeight={12}>
        {String(floor).replace('#', '')}
      </Text>
    </Flex>
  )
}

export default ob(FloorText)
