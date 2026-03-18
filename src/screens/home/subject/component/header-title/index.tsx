/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:17:15
 */
import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import { getCoverMedium } from '@utils'
import HeaderTitle from './header-title'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function HeaderTitleWrap({ onScrollToTop }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

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

export default observer(HeaderTitleWrap)
