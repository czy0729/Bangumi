/*
 * @Author: czy0729
 * @Date: 2023-02-14 03:18:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 05:34:12
 */
import React, { useEffect } from 'react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { rakuenStore, userStore } from '@stores'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import RakuenBlocks from '../../../../rakuen/setting/component/blockeds'
import { getShows } from '../../utils'
import { COMPONENT, TEXTS } from './ds'

/** 屏蔽 */
function Blocks({ navigation, filter }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  useEffect(() => {
    if (!userStore.isWebLogin || !state) return

    rakuenStore.fetchPrivacy()
  }, [state])

  return useObserver(() => {
    if (!shows) return null

    return (
      <>
        <ItemSetting hd='屏蔽' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} title='屏蔽' height={760} onClose={setFalse}>
          <RakuenBlocks
            navigation={navigation}
            onNavigate={(path: any, params: any) => {
              setFalse()
              setTimeout(() => {
                navigation.push(path, params)
              }, 240)
            }}
          />
        </ActionSheet>
      </>
    )
  })
}

export default Blocks
