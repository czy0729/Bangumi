/*
 * @Author: czy0729
 * @Date: 2024-03-01 22:59:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-31 01:10:33
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return <HeaderV2 backgroundStyle={_.container.tinygrail} title='ICO' hm={$.hm} />
}

export default ob(Header, COMPONENT)
