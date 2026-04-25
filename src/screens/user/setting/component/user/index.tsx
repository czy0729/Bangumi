/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:01:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-25 22:17:05
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { WEB } from '@constants'
import { getShows } from '../../utils'
import UserCommentsFull from './user-comments-full'
import UserCommentsLines from './user-comments-lines'
import UserGridNum from './user-grid-num'
import UserPagination from './user-pagination'
import UserShowManage from './user-show-manage'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'

/** 时光机 */
function User({
  filter,
  open = false
}: WithFilterProps<{
  open: boolean
}>) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(open)
  const shows = getShows(filter, TEXTS)

  if (WEB || !shows) return null

  const { hd } = TEXTS.user

  return (
    <>
      <ItemSetting hd={hd} arrow highlight filter={filter} onPress={setTrue} />
      <ActionSheet show={state} title={hd} height={620} onClose={setFalse}>
        {shows.userGridNum && <UserGridNum filter={filter} />}
        {shows.userPagination && <UserPagination filter={filter} />}
        {shows.userShowManage && <UserShowManage filter={filter} />}
        {shows.userCommentsFull && <UserCommentsFull filter={filter} />}
        {shows.userCommentsLines && <UserCommentsLines filter={filter} />}
      </ActionSheet>
    </>
  )
}

export default observer(User)
