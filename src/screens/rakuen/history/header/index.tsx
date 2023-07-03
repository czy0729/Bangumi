/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-03 10:30:07
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { obc } from '@utils/decorators'
import IconFavor from '../icon-favor'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  const { favor } = $.state
  return (
    <CompHeader
      title={favor ? `收藏 (${$.list.length})` : `缓存 (${$.keys.length})`}
      alias='本地帖子'
      hm={['rakuen/history', 'RakuenHistory']}
      headerTitleAlign='left'
      headerRight={() => <IconFavor $={$} />}
    />
  )
}

export default obc(Header)
