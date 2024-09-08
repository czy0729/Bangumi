/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 19:48:12
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_COMIC } from '../../ds'
import { Ctx } from '../../types'
import Comic from './comic.lazy'
import { COMPONENT } from './ds'

function ComicWrap({ onBlockRef }, { $, navigation }: Ctx) {
  if (!$.showComic[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-comic'>
        <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_COMIC)} />
        <Comic navigation={navigation} subjectId={$.subjectId} comic={$.comic} />
      </Component>
    </Suspense>
  )
}

export default obc(ComicWrap, COMPONENT)
