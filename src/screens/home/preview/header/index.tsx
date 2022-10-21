/*
 * @Author: czy0729
 * @Date: 2022-10-21 12:58:14
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-21 12:58:14
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title={$.params?.name ? `${$.params.name}的预览` : '预览'}
      alias='预览'
      hm={[$.url, 'Preview']}
      headerTitleStyle={styles.title}
    />
  )
}

export default obc(Header)
