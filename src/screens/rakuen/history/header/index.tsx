/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 02:51:50
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import IconFavor from '../component/icon-favor'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $ }: Ctx) {
  return (
    <HeaderComp
      title={$.state.favor ? `收藏 (${$.list.length})` : `缓存 (${$.keys.length})`}
      alias='本地帖子'
      hm={['rakuen/history', 'RakuenHistory']}
      headerTitleAlign='left'
      headerRight={() => <IconFavor $={$} />}
    />
  )
}

export default obc(Header, COMPONENT)
