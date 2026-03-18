/*
 * @Author: czy0729
 * @Date: 2019-06-08 22:14:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:04:43
 */
import React from 'react'
import { observer } from 'mobx-react'
import { systemStore, useStore } from '@stores'
import BookEp from './book-ep'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function BookEpWrap({ onScrollIntoViewIfNeeded }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

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

export default observer(BookEpWrap)
