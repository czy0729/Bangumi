/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 19:33:47
 */
import React from 'react'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Cover from './cover'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function CoverWrap() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <Cover
      image={($.nsfw ? $.subject.images?.common : $.cover) || $.cover}
      placeholder={($.nsfw ? $.subject.images?.common : $.coverPlaceholder) || $.coverPlaceholder}
      width={$.imageWidth}
      height={$.imageHeight}
      subjectId={$.subjectId}
    />
  ))
}

export default CoverWrap
