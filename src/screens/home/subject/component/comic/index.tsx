/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-21 00:28:16
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TITLE_COMIC } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Comic from './comic.lazy'
import { COMPONENT } from './ds'
import { Props } from './types'

function ComicWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.showComic[1]) return null

    return (
      <Suspense fallback={null}>
        <Component id='screen-subject-comic'>
          <View
            ref={ref => onBlockRef(ref, TITLE_COMIC)}
            style={_.container.layout}
            collapsable={false}
          />
          <Comic navigation={navigation} subjectId={$.subjectId} comic={$.comic} />
          <Split />
        </Component>
      </Suspense>
    )
  })
}

export default ComicWrap
