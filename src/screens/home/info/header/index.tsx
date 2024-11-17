/*
 * @Author: czy0729
 * @Date: 2024-11-07 11:58:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 09:57:15
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderComp
      title={$.params.name || '详情'}
      hm={[`subject_info/${$.subjectId}`, 'SubjectInfo']}
    />
  )
}

export default ob(Header, COMPONENT)
