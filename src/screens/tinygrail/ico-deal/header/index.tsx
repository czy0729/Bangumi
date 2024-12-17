/*
 * @Author: czy0729
 * @Date: 2024-03-01 22:59:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:47:10
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      backgroundStyle={_.container.tinygrail}
      title='ICO'
      hm={[`tinygrail/ico/deal/${$.monoId}`, 'TinygrailICODeal']}
    />
  )
}

export default ob(Header, COMPONENT)
