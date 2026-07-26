/*
 * @Author: czy0729
 * @Date: 2023-06-20 10:03:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 07:00:28
 */
import React from 'react'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { Component } from '../../component'
import { Flex } from '../../flex'
import { Text } from '../../text'
import { memoStyles } from './styles'

import type { Props as CoverProps } from '../types'

function TextOnly({
  width,
  height,
  radius,
  onPress
}: Pick<CoverProps, 'width' | 'height' | 'radius' | 'onPress'>) {
  const styles = memoStyles()

  return (
    <Component id='component-cover' data-type='text-only'>
      <Flex
        style={stl(
          styles.textOnly,
          {
            width,
            height
          },
          radius && styles.radius
        )}
        justify='center'
      >
        <Text type='sub' size={10} bold onPress={onPress}>
          {/* text-only */}
        </Text>
      </Flex>
    </Component>
  )
}

export default observer(TextOnly)
