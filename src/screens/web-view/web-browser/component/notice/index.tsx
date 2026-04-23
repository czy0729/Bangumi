/*
 * @Author: czy0729
 * @Date: 2025-08-06 16:55:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-21 15:51:49
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

function Notice({ value, onClose }) {
  r(COMPONENT)

  if (!value) return null

  return (
    <Flex style={[_.container.wind, _.mb.sm]}>
      <Flex.Item>
        <Text size={12} lineHeight={13} bold>
          {value}
        </Text>
      </Flex.Item>
      <IconTouchable
        style={{
          marginRight: -10
        }}
        name='md-close'
        size={19}
        color={_.colorDesc}
        onPress={onClose}
      />
    </Flex>
  )
}

export default observer(Notice)
