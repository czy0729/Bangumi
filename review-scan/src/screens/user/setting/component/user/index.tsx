/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:01:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-26 04:41:43
 */
import React from 'react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import { getShows } from '../../utils'
import UserGridNum from './user-grid-num'
import { COMPONENT, TEXTS } from './ds'

/** 时光机 */
function User({ filter }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (WEB || !shows) return null

    return (
      <>
        <ItemSetting hd='时光机' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} title='时光机' onClose={setFalse}>
          {shows.userGridNum && <UserGridNum filter={filter} />}
        </ActionSheet>
      </>
    )
  })
}

export default User
