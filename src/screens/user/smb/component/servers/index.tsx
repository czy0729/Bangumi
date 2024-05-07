/*
 * @Author: czy0729
 * @Date: 2023-12-25 15:27:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 22:46:07
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Servers(
  {
    store
  }: {
    store: Ctx['$']
  },
  { $ }: Ctx
) {
  $ = $ || store

  const smb = $.current?.smb
  if (!smb) return null

  const { name, ip, sharedFolder } = smb
  return (
    <View>
      <Popover
        data={$.smbs.map((item, index) => item.name || `未命名服务 ${index + 1}`)}
        onSelect={$.onSwitch}
      >
        <Flex>
          <Text bold numberOfLines={1}>
            {name || ip || '未命名服务'}
          </Text>
          <Iconfont name='md-arrow-drop-down' color={_.colorDesc} />
        </Flex>
      </Popover>
      <Text size={10} type='sub' bold numberOfLines={1}>
        {sharedFolder}
      </Text>
    </View>
  )
}

export default obc(Servers, COMPONENT)
