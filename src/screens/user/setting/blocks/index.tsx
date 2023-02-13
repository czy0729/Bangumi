/*
 * @Author: czy0729
 * @Date: 2023-02-14 03:18:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-14 03:58:03
 */
import React from 'react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { useBoolean, useObserver } from '@utils/hooks'
import RakuenBlocks from '../../../rakuen/setting/blocks'
import { getShows } from '../utils'
import { TEXTS } from './ds'

function Blocks({ navigation, filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

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
