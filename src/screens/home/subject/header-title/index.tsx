/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-26 19:26:45
 */
import React from 'react'
import { ob } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import HeaderTitle from './header-title'

export default ob(({ $ }: Ctx) => {
  rerender('Subject.HeaderTitle')

  return (
    <HeaderTitle
      common={$.subject.images?.common || $.coverPlaceholder || $.cover}
      score={$.rating.score}
      type={$.type}
      cn={$.cn}
      jp={$.jp}
      titleLabel={$.titleLabel}
    />
  )
})
