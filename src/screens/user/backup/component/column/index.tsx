/*
 * @Author: czy0729
 * @Date: 2022-12-08 10:47:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 04:03:41
 *
 * 列展示单元
 */
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Props } from './types'

function Column({ style, show = true, type, text, right, onPress }: Props) {
  r(COMPONENT)

  if (!show) return null

  return (
    <Flex style={style}>
      <Text type={!text || text === '/' ? 'sub' : type} size={11} onPress={onPress}>
        {text || '__'}
      </Text>
      {right}
    </Flex>
  )
}

export default observer(Column)
