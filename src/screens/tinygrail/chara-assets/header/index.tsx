/*
 * @Author: czy0729
 * @Date: 2022-06-08 09:41:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 21:24:25
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import Right from '../component/right'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      backgroundStyle={_.container.tinygrail}
      title={$.params?.userName ? `${$.params.userName}的持仓` : '我的持仓'}
      headerTitleAlign='left'
      alias='我的持仓'
      hm={HM}
      headerRight={() => <Right $={$} />}
    />
  )
}

export default ob(Header, COMPONENT)
