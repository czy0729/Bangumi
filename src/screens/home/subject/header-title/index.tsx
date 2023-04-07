/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 00:49:49
 */
import React from 'react'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import HeaderTitle from './header-title'

export default ob(({ $ }: Ctx) => {
  // global.rerender('Subject.HeaderTitle')

  return (
    <HeaderTitle
      common={$.coverPlaceholder || $.subject.images?.common}
      score={$.rating.score}
      type={$.type}
      cn={$.cn}
      jp={$.jp}
      titleLabel={$.titleLabel}
    />
  )
})
