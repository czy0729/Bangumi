/*
 * @Author: czy0729
 * @Date: 2024-03-05 03:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 03:54:07
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'

function Label({ route, focused }, { $ }: Ctx) {
  let count: string | number
  switch (route.key) {
    case 'chara':
      count = $.myCharaAssets?.chara?.list?.length || 0
      break

    case 'temple':
      count = $.temple?.list?.length === 2000 ? '2000+' : $.temple?.list?.length || 0
      break

    case 'ico':
      count = $.myCharaAssets?.ico?.list?.length || 0
      break

    default:
      count = 0
      break
  }

  return (
    <Flex style={_.container.block} justify='center'>
      <Text type='tinygrailPlain' size={13} bold={focused}>
        {route.title}
      </Text>
      {!!count && (
        <Text type='tinygrailText' size={11} bold lineHeight={13}>
          {' '}
          {count}{' '}
        </Text>
      )}
    </Flex>
  )
}

export default obc(Label, COMPONENT)
