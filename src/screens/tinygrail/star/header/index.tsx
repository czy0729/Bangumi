/*
 * @Author: czy0729
 * @Date: 2024-03-10 03:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 18:34:20
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
      backgroundStyle={_.container.tinygrail}
      title='通天塔(β)'
      hm={HM}
      headerRight={() => <Label $={$} />}
    />
  )
}

export default ob(Header, COMPONENT)
