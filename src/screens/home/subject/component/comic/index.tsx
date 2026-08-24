/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:11:01
 */
import React, { Suspense } from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { useStore } from '@stores'
import { TITLE_COMIC } from '../../ds'
import BlockAnchor from '../block-anchor'
import Split from '../split'
import Comic from './comic'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function ComicWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  if (!$.showComic[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-comic'>
        <BlockAnchor title={TITLE_COMIC} onBlockRef={onBlockRef} />

        <Comic navigation={navigation} subjectId={$.subjectId} comic={$.comic} />

        <Split />
      </Component>
    </Suspense>
  )
}

export default observer(ComicWrap)
