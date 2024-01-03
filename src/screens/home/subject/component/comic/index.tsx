/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 12:07:11
 */
import React from 'react'
import { View } from 'react-native'
import { obc } from '@utils/decorators'
import { TITLE_COMIC } from '../../ds'
import { Ctx } from '../../types'
import Comic from './comic'
import { COMPONENT } from './ds'

function ComicWrap({ onBlockRef }, { $, navigation }: Ctx) {
  if (!$.showComic[1]) return null

  return (
    <>
      <View ref={ref => onBlockRef(ref, TITLE_COMIC)} />
      <Comic navigation={navigation} subjectId={$.subjectId} comic={$.comic} />
    </>
  )
}

export default obc(ComicWrap, COMPONENT)
