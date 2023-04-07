/*
 * @Author: czy0729
 * @Date: 2019-06-08 22:14:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-11 14:42:09
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import BookEp from './book-ep'
import { memoStyles } from './styles'

export default obc(({ onScrollIntoViewIfNeeded }, { $ }: Ctx) => {
  // global.rerender('Subject.BookEp')

  return (
    <BookEp
      styles={memoStyles()}
      chap={$.state.chap}
      vol={$.state.vol}
      book={$.subjectFormHTML.book}
      comicLength={$.comic.length}
      status={$.collection.status}
      onChangeText={$.changeText}
      onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
      doUpdateBookEp={$.doUpdateBookEp}
      doUpdateNext={$.doUpdateNext}
    />
  )
})
