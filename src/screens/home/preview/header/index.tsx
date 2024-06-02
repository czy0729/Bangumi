/*
 * @Author: czy0729
 * @Date: 2022-10-21 12:58:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-03 06:50:54
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { cnjp } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Header(props, { $ }: Ctx) {
  const name = cnjp($.params?.cn, $.params?.jp)
  return (
    <HeaderComp
      headerTitleStyle={styles.title}
      title={name ? `${name}的预览` : '预览'}
      alias='预览'
      hm={[$.url, 'Preview']}
    />
  )
}

export default obc(Header, COMPONENT)
