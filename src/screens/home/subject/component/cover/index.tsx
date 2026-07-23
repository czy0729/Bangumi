/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 02:47:55
 */
import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import Cover from './cover'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function CoverWrap() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <Cover
      image={($.nsfw ? $.subject.images?.common : $.cover) || $.cover}
      placeholder={($.nsfw ? $.subject.images?.common : $.coverPlaceholder) || $.coverPlaceholder}
      width={$.imageWidth}
      height={$.imageHeight}
      subjectId={$.subjectId}
      nsfw={$.nsfw}
    />
  )
}

export default observer(CoverWrap)
