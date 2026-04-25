/*
 * @Author: czy0729
 * @Date: 2022-01-28 15:31:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-25 21:13:42
 */
import React from 'react'
import { ActionSheet, Divider } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { getShows } from '../../utils'
import CommentSplit from './comment-split'
import HtmlExpand from './html-expand'
import PromoteAlias from './promote-alias'
import ShowAirdayMonth from './show-airday-month'
import ShowCount from './show-count'
import ShowCustomOnair from './show-custom-onair'
import ShowEpInput from './show-ep-input'
import SplitStyles from './split-styles'
import SubjectLayout from './subject-layout'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'

/** 条目 */
function Subject({
  filter,
  open = false
}: WithFilterProps<{
  open: boolean
}>) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(open)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    return (
      <>
        <ItemSetting hd='条目' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} title='条目' height={filter ? 440 : 760} onClose={setFalse}>
          {shows.splitStyles && <SplitStyles filter={filter} />}
          {shows.showAirdayMonth && <ShowAirdayMonth filter={filter} />}
          {shows.htmlExpand && <HtmlExpand filter={filter} />}
          {shows.commentSplit && <CommentSplit filter={filter} />}
          {shows.promoteAlias && <PromoteAlias filter={filter} />}
          {shows.showCount && <ShowCount filter={filter} />}
          {shows.showEpInput && <ShowEpInput filter={filter} />}
          {shows.showCustomOnair && <ShowCustomOnair filter={filter} />}
          <Divider style={_.mt.sm} />
          {shows.layout && <SubjectLayout filter={filter} />}
        </ActionSheet>
      </>
    )
  })
}

export default Subject
