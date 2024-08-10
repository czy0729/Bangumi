/*
 * @Author: czy0729
 * @Date: 2024-08-10 14:06:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-10 14:12:02
 */
import React from 'react'
import { Flex, Heatmap, Image, UserStatus } from '@components'
import { _ } from '@stores'
import { getCoverLarge } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'

function Thumb(props, { $ }: Ctx) {
  const { avatar, userId } = $.detail
  if (!avatar) return null

  return (
    <Flex style={_.mt.lg} justify='center'>
      <UserStatus userId={userId}>
        <Image
          src={getCoverLarge(avatar)}
          size={_.r(80)}
          placeholder={false}
          imageViewer
          event={{
            id: '目录详情.封面图查看',
            data: {
              catalogId: $.catalogId
            }
          }}
        />
      </UserStatus>
      <Heatmap id='目录详情.封面图查看' />
    </Flex>
  )
}

export default obc(Thumb, COMPONENT)
