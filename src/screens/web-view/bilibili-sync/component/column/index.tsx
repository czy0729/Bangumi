/*
 * @Author: czy0729
 * @Date: 2022-04-27 06:03:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 18:05:52
 */
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Props } from './types'

function Column({ style, type, text, right, onPress }: Props) {
  r(COMPONENT)

  return (
    <Flex style={style}>
      <Text size={11} type={!text || text === '/' ? 'sub' : type} onPress={onPress}>
        {text || ''}
      </Text>
      {right}
    </Flex>
  )
}

export default observer(Column)
