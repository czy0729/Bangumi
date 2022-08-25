/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 07:52:06
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import HeaderTitle from './header-title'

export default obc(({ $ }: Ctx) => {
  global.rerender('Mono.HeaderTitle')

  return (
    <HeaderTitle
      cover={$.cover}
      tinygrail={$.tinygrail}
      nameTop={$.nameTop}
      nameBottom={$.nameBottom}
    />
  )
})
