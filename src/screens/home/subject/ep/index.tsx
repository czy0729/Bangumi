/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-29 15:01:36
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import BookEp from '../book-ep'
import Disc from '../disc'
import { Ctx } from '../types'
import Ep from './ep'
import { memoStyles } from './styles'

export default obc(({ onScrollIntoViewIfNeeded }, { $ }: Ctx) => {
  // global.rerender('Subject.Ep')

  // 游戏没有ep
  if ($.type === '游戏') return null

  if ($.type === '书籍') {
    return <BookEp onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded} />
  }

  if ($.type === '音乐') return <Disc />

  const { showEpInput, showCustomOnair, focusOrigin } = systemStore.setting
  return (
    <Ep
      styles={memoStyles()}
      watchedEps={$.state.watchedEps}
      totalEps={$.subjectFormHTML.totalEps}
      onAirCustom={$.onAirCustom}
      status={$.collection.status}
      isDoing={$.collection?.status?.type === 'do'}
      showEpInput={showEpInput}
      showCustomOnair={showCustomOnair}
      focusOrigin={focusOrigin}
      onChangeText={$.changeText}
      onSelectOnAir={$.onSelectOnAir}
      onResetOnAirUser={$.resetOnAirUser}
      onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
      doUpdateSubjectEp={$.doUpdateSubjectEp}
    />
  )
})
