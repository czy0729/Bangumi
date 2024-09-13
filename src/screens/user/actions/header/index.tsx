/*
 * @Author: czy0729
 * @Date: 2022-11-24 15:39:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 07:29:29
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(_props, { $, navigation }: Ctx) {
  return (
    <HeaderComp
      title={$.params.name || '自定义跳转'}
      hm={['actions', 'Actions']}
      headerRight={() => (
        <IconTouchable
          name='md-info-outline'
          color={_.colorDesc}
          onPress={() => {
            navigation.push('Information', {
              title: '自定义跳转',
              message: [
                '目前为实验性。',
                '本功能对应到具体条目，通常用于给单独条目添加特定跳转。',
                '后续会开发云同步和共享功能，请慎重添加带个人信息隐私的链接。'
              ]
            })
          }}
        />
      )}
    />
  )
}

export default obc(Header, COMPONENT)
