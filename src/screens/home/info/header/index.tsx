/*
 * @Author: czy0729
 * @Date: 2024-11-07 11:58:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 05:51:29
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(_props, { $ }: Ctx) {
  return (
    <HeaderComp
      title={$.params.name || '详情'}
      hm={[`subject_info/${$.subjectId}`, 'SubjectInfo']}
    />
  )
}

export default obc(Header, COMPONENT)
