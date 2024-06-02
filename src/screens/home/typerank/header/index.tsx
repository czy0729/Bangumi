/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:49:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-02 17:18:09
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $ }: Ctx) {
  return (
    <HeaderComp
      title={`分类排行 · ${MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>($.type)} · ${$.tag} (${
        $.ids.length
      })`}
      hm={['typerank', 'Typerank']}
      headerTitleAlign='left'
    />
  )
}

export default obc(Header, COMPONENT)
