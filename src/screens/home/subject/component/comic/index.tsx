/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 12:46:37
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
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
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_COMIC)} />
      <Comic navigation={navigation} subjectId={$.subjectId} comic={$.comic} />
    </Suspense>
  )
}

export default obc(ComicWrap, COMPONENT)
