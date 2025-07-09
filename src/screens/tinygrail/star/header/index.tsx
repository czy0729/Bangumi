/*
 * @Author: czy0729
 * @Date: 2024-03-10 03:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 18:38:28
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import Label from '../component/label'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      title='通天塔'
      headerTitleAlign='left'
      backgroundStyle={_.container.tinygrail}
      hm={HM}
      headerRight={() => <Label $={$} />}
    />
  )
}

export default ob(Header, COMPONENT)
