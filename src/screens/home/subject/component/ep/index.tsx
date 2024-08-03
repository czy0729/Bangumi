/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 13:43:20
 */
import React from 'react'
import { View } from 'react-native'
import { _, subjectStore, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { TITLE_DISC, TITLE_EP } from '../../ds'
import { Ctx } from '../../types'
import Disc from '../disc'
import BookEp from './book-ep'
import Ep from './ep.lazy'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function EpWrap({ onBlockRef, onScrollIntoViewIfNeeded }, { $ }: Ctx) {
  if (!$.showEp[1]) return null

  const typeCn = $.type || MODEL_SUBJECT_TYPE.getTitle(subjectStore.type($.subjectId))
  return (
    <>
      <View
        style={_.container.layout}
        ref={ref => onBlockRef(ref, typeCn === '音乐' ? TITLE_DISC : TITLE_EP)}
      />
      {typeCn === '书籍' ? (
        <BookEp onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded} />
      ) : typeCn === '音乐' ? (
        <Disc />
      ) : (
        <Ep
          styles={memoStyles()}
          watchedEps={$.state.watchedEps || '0'}
          totalEps={$.subjectFormHTML.totalEps || '0'}
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
}

export default obc(EpWrap, COMPONENT)
