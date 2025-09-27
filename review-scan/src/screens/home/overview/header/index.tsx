/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:32:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:10:46
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return <HeaderV2 title={`${$.params.title} (${$.list.length})`} hm={HM} />
}

export default ob(Header, COMPONENT)
