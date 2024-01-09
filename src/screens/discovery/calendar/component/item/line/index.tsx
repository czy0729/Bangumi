/*
 * @Author: czy0729
 * @Date: 2024-01-09 15:42:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 15:42:53
 */
import React from 'react'
import { Flex, Heatmap, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { date, getTimestamp } from '@utils'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Line() {
  const styles = memoStyles()
  return (
    <Flex>
      <Flex.Item style={styles.line} />
      <Iconfont name='md-access-time' color={_.colorMain} size={16} />
      <Text style={_.ml.xs} type='main' bold>
        {date('H:i', getTimestamp())}
      </Text>
      <Flex.Item style={styles.line} />
      <Heatmap id='每日放送.跳转' />
    </Flex>
  )
}

export default ob(Line, COMPONENT)
