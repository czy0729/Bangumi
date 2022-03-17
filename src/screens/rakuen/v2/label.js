/*
 * @Author: czy0729
 * @Date: 2021-02-10 02:55:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-08 13:49:43
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function Label({ focused, model, label, value }, { $ }) {
  return (
    <Popover
      style={styles.label}
      data={model.data.map(item => item.label)}
      onSelect={$.onGroupMenuPress}
    >
      <Flex style={styles.label} justify='center'>
        <Text type='title' size={13} bold={focused}>
          {label}
        </Text>
        <Text size={10} lineHeight={13} type='sub'>
          {' '}
          {model.getLabel(value)}{' '}
        </Text>
      </Flex>
    </Popover>
  )
}

export default obc(Label)

const styles = _.create({
  label: {
    width: '100%'
  }
})
