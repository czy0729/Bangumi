/*
 * @Author: czy0729
 * @Date: 2021-02-10 02:55:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-17 15:58:13
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Label({ focused, model, label, value, onSelect }) {
  return (
    <Popover
      style={_.container.block}
      data={model.data.map(item => item.label)}
      onSelect={onSelect}
    >
      <Flex style={styles.label} justify='center'>
        <Text type='title' size={13} bold={focused} noWrap>
          {label}
        </Text>
        {!WEB && (
          <Text size={10} lineHeight={13} type='sub' noWrap>
            {' '}
            {model.getLabel(value)}{' '}
          </Text>
        )}
      </Flex>
    </Popover>
  )
}

export default ob(Label, COMPONENT)
