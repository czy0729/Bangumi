/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-15 19:29:48
 */
import React from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, subjectStore, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { TITLE_DISC, TITLE_EP } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import BookEp from './book-ep'
import Disc from './disc'
import Ep from './ep'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function EpWrap({ onBlockRef, onScrollIntoViewIfNeeded }) {
  const { $ } = useStore<Ctx>()
  if (!$.showEp[1]) return null

  const typeCn = $.type || MODEL_SUBJECT_TYPE.getTitle(subjectStore.type($.subjectId))
  return (
    <Component id='screen-subject-ep'>
      <View
        ref={ref => onBlockRef(ref, typeCn === '音乐' ? TITLE_DISC : TITLE_EP)}
        style={_.container.layout}
        collapsable={false}
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
          onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
          doUpdateSubjectEp={$.doUpdateSubjectEp}
        />
      )}
      <Split />
    </Component>
  )
}

export default ob(EpWrap, COMPONENT)
