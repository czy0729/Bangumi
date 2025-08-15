/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:07:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:40:01
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function BtnNextEp({ subjectId }) {
  const { $ } = useStore<Ctx>()
  const { sort } = $.nextWatchEp(subjectId)
  if (!sort) return null

  return (
    <Touchable
      style={styles.touchable}
      onPress={() => {
        $.doWatchedNextEp(subjectId)
      }}
    >
      <Flex justify='center'>
        <Iconfont style={styles.icon} name='md-check-circle-outline' size={18} />
        <View style={styles.placeholder}>
          <Text type='sub'>{sort}</Text>
        </View>
      </Flex>
    </Touchable>
  )
}

export default ob(BtnNextEp, COMPONENT)
