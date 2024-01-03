/*
 * @Author: czy0729
 * @Date: 2019-06-08 22:14:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 00:06:54
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import BookEp from './book-ep'
import { memoStyles } from './styles'

function BookEpWrap({ onScrollIntoViewIfNeeded }, { $ }: Ctx) {
  return (
    <BookEp
      styles={memoStyles()}
      chap={$.state.chap || '0'}
      vol={$.state.vol || '0'}
      book={$.subjectFormHTML.book}
      comicLength={$.comic.length}
      status={$.collection.status}
      focusOrigin={systemStore.setting.focusOrigin}
      onChangeText={$.changeText}
      onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
      doUpdateBookEp={$.doUpdateBookEp}
      doUpdateNext={$.doUpdateNext}
    />
  )
}

export default obc(BookEpWrap)
