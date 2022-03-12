/*
 * @Author: czy0729
 * @Date: 2022-03-11 17:19:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-11 17:25:06
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { obc } from '@utils/decorators'
import Extra from './extra'

function Header({ title = '找番剧', alias = 'Anime', hm = ['anime', 'Anime'] }, { $ }) {
  return (
    <CompHeader
      title={title}
      alias={alias}
      hm={hm}
      headerRight={() => <Extra $={$} title={alias} />}
    />
  )
}

export default obc(Header)
