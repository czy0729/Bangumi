/*
 * @Author: czy0729
 * @Date: 2024-01-10 04:19:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:05:18
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function SectionRight({ event, text, to }) {
  const { $, navigation } = useStore<Ctx>()
  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        t(event.id, {
          ...event.data,
          to,
          monoId: $.monoId
        })

        navigation.push(to, {
          monoId: $.monoId,
          name: $.cn || $.jp
        })
      }}
    >
      <Flex>
        <Text type='sub'>{text}</Text>
        <Iconfont name='md-navigate-next' />
      </Flex>
    </Touchable>
  )
}

export default ob(SectionRight, COMPONENT)
