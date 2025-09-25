/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-22 18:27:36
 */
import React from 'react'
import { useStore } from '@stores'
import { getCoverMedium } from '@utils'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import HeaderTitle from './header-title'
import { COMPONENT } from './ds'
import { Props } from './types'

function HeaderTitleWrap({ onScrollToTop }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
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
  ))
}

export default HeaderTitleWrap
