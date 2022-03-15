/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:21:16
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-03-15 22:21:16
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { obc } from '@utils/decorators'
import Extra from './extra'

function Header(props, { $ }) {
  return (
    <CompHeader
      title='小组'
      hm={['group/mine', 'Mine']}
      headerRight={() => <Extra $={$} />}
    />
  )
}

export default obc(Header)
