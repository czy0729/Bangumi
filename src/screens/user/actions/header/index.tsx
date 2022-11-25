/*
 * @Author: czy0729
 * @Date: 2022-11-24 15:39:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-25 09:35:29
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { alert } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  const { name } = $.params
  return (
    <CompHeader
      title={name || '自定义跳转'}
      hm={['actions', 'Actions']}
      headerRight={() => (
        <IconTouchable
          name='md-info-outline'
          color={_.colorDesc}
          onPress={() => {
            alert(
              '目前为实验性。\n本功能对应到具体条目，通常用于给单独条目添加特定跳转。\n后续会开发云同步和共享功能，请慎重添加带个人信息隐私的链接。',
              '自定义跳转'
            )
          }}
        />
      )}
    />
  )
}

export default obc(Header)
