/*
 * @Author: czy0729
 * @Date: 2021-01-20 11:59:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-20 15:35:08
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { simpleTime } from '@utils'

function FloorText({ time, floor }) {
  const styles = memoStyles()
  return (
    <Flex style={styles.container}>
      <Text type='sub' size={10} lineHeight={12}>
        {simpleTime(time)}
      </Text>
      <Text style={styles.floor} type='sub' size={10} lineHeight={12}>
        #
      </Text>
      <Text type='sub' size={10} lineHeight={12}>
        {floor.replace('#', '')}
      </Text>
    </Flex>
  )
}

export default ob(FloorText)

const memoStyles = _.memoStyles(_ => ({
  container: {
    opacity: _.select(1, 0.64)
  },
  floor: {
    marginLeft: _.sm
  }
}))
