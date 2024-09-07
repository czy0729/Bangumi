/*
 * @Author: czy0729
 * @Date: 2022-10-21 12:58:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-07 01:49:54
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Header(_props, { $ }: Ctx) {
  return (
    <HeaderComp
      headerTitleStyle={styles.title}
      title={$.name ? `${$.name}的预览` : '预览'}
      alias='预览'
      hm={[$.url, 'Preview']}
    />
  )
}

export default obc(Header, COMPONENT)
