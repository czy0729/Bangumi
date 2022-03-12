/*
 * @Author: czy0729
 * @Date: 2022-03-12 22:58:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-12 22:59:43
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { obc } from '@utils/decorators'
import Extra from './extra'

function Header(props, { $ }) {
  return (
    <CompHeader
      title='推荐'
      hm={['guess', 'Guess']}
      headerRight={() => <Extra $={$} />}
    />
  )
}

export default obc(Header)
