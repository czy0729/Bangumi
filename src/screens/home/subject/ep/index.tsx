/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 15:38:07
 */
import React from 'react'
import { View } from 'react-native'
import { systemStore, subjectStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import BookEp from '../book-ep'
import Disc from '../disc'
import { TITLE_DISC, TITLE_EP } from '../ds'
import { Ctx } from '../types'
import Ep from './ep'
import { memoStyles } from './styles'

export default obc(({ onBlockRef, onScrollIntoViewIfNeeded }, { $ }: Ctx) => {
  rerender('Subject.Ep')

  if (!$.showEp[1]) return null

  const typeCn =
    $.type || MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subjectStore.type($.subjectId))
  return (
    <>
      <View ref={ref => onBlockRef(ref, typeCn === '音乐' ? TITLE_DISC : TITLE_EP)} />
      {typeCn === '书籍' ? (
        <BookEp onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded} />
      ) : typeCn === '音乐' ? (
        <Disc />
      ) : (
        <Ep
          styles={memoStyles()}
          watchedEps={$.state.watchedEps}
          totalEps={$.subjectFormHTML.totalEps}
          onAirCustom={$.onAirCustom}
          status={$.collection.status}
          isDoing={$.collection?.status?.type === 'do'}
          showEpInput={systemStore.setting.showEpInput}
          showCustomOnair={systemStore.setting.showCustomOnair}
          focusOrigin={systemStore.setting.focusOrigin}
          onChangeText={$.changeText}
          onSelectOnAir={$.onSelectOnAir}
          onResetOnAirUser={$.resetOnAirUser}
          onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
          doUpdateSubjectEp={$.doUpdateSubjectEp}
        />
      )}
    </>
  )
})
