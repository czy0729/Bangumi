/*
 * @Author: czy0729
 * @Date: 2022-03-11 17:19:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:15:08
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import Extra from '../component/extra'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'
import { Props } from './types'

function Header({ title = '找番剧', alias = 'Anime', hm }: Props) {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      title={title}
      alias={alias}
      hm={hm || HM}
      headerRight={() => <Extra $={$} title={alias} />}
    />
  )
}

export default ob(Header, COMPONENT)
