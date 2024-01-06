/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:40:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-25 14:57:59
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function BtnEpNext({ subjectId, epStatus, isFirst }, { $ }: Ctx) {
  const { sort } = $.nextWatchEp(subjectId)
  if (!sort) return null

  const countFixed = $.countFixed(subjectId, epStatus)
  return (
    <Touchable style={styles.touch} onPress={() => $.doWatchedNextEp(subjectId)}>
      <Flex style={styles.btn} justify='center'>
        <Iconfont style={styles.icon} name='md-check-circle-outline' size={19} />
        <View style={styles.text}>
          <Text type='sub'>{Math.max(sort, countFixed + 1)}</Text>
        </View>
      </Flex>
      {isFirst && <Heatmap right={26} id='首页.观看下一章节' />}
    </Touchable>
  )
}

export default obc(BtnEpNext, COMPONENT)
