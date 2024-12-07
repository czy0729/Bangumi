/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:49:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:36:26
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      title={`分类排行 · ${MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>($.type)} · ${$.tag} (${
        $.state.ids.length
      })`}
      hm={HM}
    />
  )
}

export default ob(Header, COMPONENT)
