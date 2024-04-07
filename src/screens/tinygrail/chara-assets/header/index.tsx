/*
 * @Author: czy0729
 * @Date: 2022-06-08 09:41:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-12 18:02:36
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import Right from '../component/right'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $ }: Ctx) {
  return (
    <HeaderComp
      title={$.params?.userName ? `${$.params.userName}的持仓` : '我的持仓'}
      alias='我的持仓'
      hm={['tinygrail/chara/assets', 'TinygrailCharaAssets']}
      statusBarEvents={false}
      statusBarEventsType='Tinygrail'
      headerRight={() => <Right $={$} />}
    />
  )
}

export default obc(Header, COMPONENT)
