/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-26 19:26:45
 */
import React from 'react'
import { getCoverMedium } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import HeaderTitle from './header-title'
import { COMPONENT } from './ds'

function HeaderTitleWrap({ $ }: Ctx) {
  return (
    <HeaderTitle
      subjectId={$.subjectId}
      common={getCoverMedium($.subject.images?.common || $.coverPlaceholder || $.cover)}
      rank={$.subject.rank || $.subjectFromOSS?.rating?.rank || '-'}
      score={$.rating.score}
      type={$.type}
      cn={$.cn}
      jp={$.jp}
      titleLabel={$.titleLabel}
    />
  )
}

export default ob(HeaderTitleWrap, COMPONENT)
