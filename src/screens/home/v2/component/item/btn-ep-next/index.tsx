/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:40:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-20 07:39:19
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { SubjectId } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function BtnEpNext({
  subjectId,
  epStatus,
  isFirst
}: {
  subjectId: SubjectId
  epStatus: string | number
  isFirst: boolean
}) {
  const { $ } = useStore<Ctx>()
  const { sort } = $.nextWatchEp(subjectId)
  if (!sort) return null

  return (
    <Touchable style={styles.touch} onPress={() => $.doWatchedNextEp(subjectId)}>
      <Flex style={styles.btn} justify='center'>
        <Iconfont style={styles.icon} name='md-check-circle-outline' size={19} />
        <View style={styles.text}>
          <Text type='sub'>{Math.max(sort, $.countFixed(subjectId, epStatus) + 1)}</Text>
        </View>
      </Flex>
      {isFirst && <Heatmap right={26} id='首页.观看下一章节' />}
    </Touchable>
  )
}

export default ob(BtnEpNext, COMPONENT)
