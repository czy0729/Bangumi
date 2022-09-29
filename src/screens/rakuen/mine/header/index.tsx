/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:21:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 17:28:31
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { obc } from '@utils/decorators'
import Extra from '../extra'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='小组'
      hm={['group/mine', 'Mine']}
      headerRight={() => <Extra $={$} />}
    />
  )
}

export default obc(Header)
