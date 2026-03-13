/*
 * @Author: czy0729
 * @Date: 2024-08-10 14:06:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:22:36
 */
import React from 'react'
import { Flex, Heatmap, Image, UserStatus } from '@components'
import { _, useStore } from '@stores'
import { getCoverLarge } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'

function Thumb() {
  const { $ } = useStore<Ctx>()
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

export default ob(Thumb, COMPONENT)
