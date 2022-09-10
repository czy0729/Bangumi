/*
 * @Author: czy0729
 * @Date: 2022-03-11 17:19:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-10 17:51:16
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { obc } from '@utils/decorators'
import Extra from '../extra'
import { Ctx, TitleType } from '../types'

function Header({ title = '找番剧', alias = 'Anime', hm = undefined }, { $ }: Ctx) {
  return (
    <CompHeader
      title={title}
      alias={alias}
      hm={hm || ['anime', 'Anime']}
      headerRight={() => <Extra $={$} title={alias as TitleType} />}
    />
  )
}

export default obc(Header)
