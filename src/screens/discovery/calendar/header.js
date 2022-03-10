/*
 * @Author: czy0729
 * @Date: 2022-03-11 01:55:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-11 02:02:55
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { obc } from '@utils/decorators'
import Extra from './extra'

function Header(props, { $ }) {
  return (
    <CompHeader
      title='每日放送'
      hm={['calendar', 'Calendar']}
      headerRight={() => <Extra $={$} />}
    />
  )
}

export default obc(Header)
