/*
 * @Author: czy0729
 * @Date: 2020-04-25 19:45:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-18 16:29:20
 */
import React from 'react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function SectionRight({ event, text, to }, { $, navigation }) {
  return (
    <Touchable
      style={_.mr.sm}
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
