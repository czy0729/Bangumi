/*
 * @Author: czy0729
 * @Date: 2023-04-11 15:43:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 16:21:31
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { obc } from '@utils/decorators'
import Type from '../component/type'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='目录'
      headerTitleAlign='left'
      hm={['discovery/catalog', 'Catalog']}
      headerRight={() => <Type $={$} />}
    />
  )
}

export default obc(Header, COMPONENT)
