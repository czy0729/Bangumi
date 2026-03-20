/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:07:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:20:52
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../../types'
import type { Props } from './types'

function BtnNextEp({ subjectId }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handlePress = useCallback(() => {
    $.doWatchedNextEp(subjectId)
  }, [$, subjectId])

  const { sort } = $.nextWatchEp(subjectId)
  if (!sort) return null

  return (
    <Touchable style={styles.touchable} onPress={handlePress}>
      <Flex justify='center'>
        <Iconfont style={styles.icon} name='md-check-circle-outline' size={18} />
        <View style={styles.placeholder}>
          <Text type='sub'>{sort}</Text>
        </View>
      </Flex>
    </Touchable>
  )
}

export default observer(BtnNextEp)
