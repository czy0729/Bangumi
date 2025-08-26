/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:01:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-26 02:16:23
 */
import React from 'react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import { getShows } from '../../utils'
import UserGridNum from './user-grid-num'
import UserPagination from './user-pagination'
import UserShowManage from './user-show-manage'
import { COMPONENT, TEXTS } from './ds'

/** 时光机 */
function User({ filter }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (WEB || !shows) return null

    const { hd } = TEXTS.user
    return (
      <>
        <ItemSetting hd={hd} arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} title={hd} height={480} onClose={setFalse}>
          {shows.userGridNum && <UserGridNum filter={filter} />}
          {shows.userPagination && <UserPagination filter={filter} />}
          {shows.userShowManage && <UserShowManage filter={filter} />}
        </ActionSheet>
      </>
    )
  })
}

export default User
