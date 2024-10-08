/*
 * @Author: czy0729
 * @Date: 2024-08-25 00:59:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-27 13:01:57
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Tag } from '../../../base'
import { styles } from './styles'
import { Props } from './types'

function Content({ cn, jp, replies, info, position, onPress }: Props) {
  return (
    <Touchable style={styles.touch} animate onPress={onPress}>
      <Flex style={_.container.block} align='start'>
        <Flex.Item style={_.mr.md}>
          <Text size={15} numberOfLines={2} bold>
            {cn}
            {!!jp && jp !== cn && (
              <Text type='sub' size={11} lineHeight={15} bold>
                {' '}
                {jp}
              </Text>
            )}
            {!!replies && (
              <Text type='main' size={11} lineHeight={15} bold>
                {'  '}
                {replies.replace(/\(|\)/g, '')}
              </Text>
            )}
          </Text>
        </Flex.Item>
      </Flex>
      <Flex style={_.mt.sm} wrap='wrap'>
        {position.map(item => (
          <Tag key={item} style={styles.position} value={item} />
        ))}
        {!!info && <Text size={12}>{info}</Text>}
      </Flex>
    </Touchable>
  )
}

export default ob(Content)
