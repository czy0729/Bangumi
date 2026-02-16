/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-06 21:23:47
 */
import React from 'react'
import { getCoverMedium } from '@utils'
import { ob } from '@utils/decorators'
import HeaderTitle from './header-title'
import { COMPONENT } from './ds'
import { Props } from './types'

function HeaderTitleWrap({ $, onScrollToTop }: Props) {
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
      onScrollToTop={onScrollToTop}
    />
  )
}

export default ob(HeaderTitleWrap, COMPONENT)
