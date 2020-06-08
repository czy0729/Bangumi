/*
 * @Author: czy0729
 * @Date: 2020-04-25 19:45:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-25 20:05:04
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'

function SectionRight({ event, text, to }, { $, navigation }) {
  return (
    <Touchable
      style={_.mr.md}
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
        <Iconfont name='right' size={16} />
      </Flex>
    </Touchable>
  )
}

SectionRight.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(SectionRight)
