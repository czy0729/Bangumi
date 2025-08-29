/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-28 16:21:51
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Cover from './cover'
import { COMPONENT } from './ds'

function CoverWrap() {
  const { $ } = useStore<Ctx>()
  return (
    <Cover
      image={($.nsfw ? $.subject.images?.common : $.cover) || $.cover}
      placeholder={($.nsfw ? $.subject.images?.common : $.coverPlaceholder) || $.coverPlaceholder}
      width={$.imageWidth}
      height={$.imageHeight}
      subjectId={$.subjectId}
    />
  )
}

export default ob(CoverWrap, COMPONENT)
