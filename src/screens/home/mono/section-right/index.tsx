/*
 * @Author: czy0729
 * @Date: 2020-04-25 19:45:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 17:27:30
 */
import React from 'react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { styles } from './styles'

function SectionRight({ event, text, to }, { $, navigation }: Ctx) {
  // global.rerender('Mono.SectionRight')

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

export default obc(SectionRight)
