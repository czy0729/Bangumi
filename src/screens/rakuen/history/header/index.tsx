/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 17:34:33
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { obc } from '@utils/decorators'
import IconFavor from '../icon-favor'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='收藏'
      alias='本地帖子'
      hm={['rakuen/history', 'RakuenHistory']}
      headerRight={() => <IconFavor $={$} />}
    />
  )
}

export default obc(Header)
