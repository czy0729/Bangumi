/*
 * @Author: czy0729
 * @Date: 2022-06-08 09:41:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 15:45:52
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { obc } from '@utils/decorators'
import Right from '../right'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title={$.params?.userName ? `${$.params.userName}的持仓` : '我的持仓'}
      alias='我的持仓'
      hm={['tinygrail/chara/assets', 'TinygrailCharaAssets']}
      statusBarEvents={false}
      statusBarEventsType='Tinygrail'
      headerRight={() => <Right $={$} />}
    />
  )
}

export default obc(Header)
