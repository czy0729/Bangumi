/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:40:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:32:33
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function BtnEpNext({ subjectId, epStatus, isFirst }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handlePress = useCallback(() => {
    $.doWatchedNextEp(subjectId)
  }, [$, subjectId])

  const { sort } = $.nextWatchEp(subjectId)
  if (!sort) return null

  return (
    <Touchable style={styles.touch} onPress={handlePress}>
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

export default observer(BtnEpNext)
