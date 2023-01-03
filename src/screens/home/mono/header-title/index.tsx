/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-03 23:12:40
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import HeaderTitle from './header-title'

export default obc(({ $ }: Ctx) => {
  global.rerender('Mono.HeaderTitle')

  return (
    <HeaderTitle
      cover={$.params._image || $.cover}
      tinygrail={$.tinygrail}
      nameTop={$.nameTop}
      nameBottom={$.nameBottom}
    />
  )
})
