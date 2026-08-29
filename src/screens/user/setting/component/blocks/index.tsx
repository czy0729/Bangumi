/*
 * @Author: czy0729
 * @Date: 2023-02-14 03:18:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 20:06:04
 */
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { rakuenStore, userStore } from '@stores'
import { useBoolean, useNavigation } from '@utils/hooks'
import RakuenBlocks from '../../../../rakuen/setting/component/blockeds'
import { getShows } from '../../utils'
import { COMPONENT, TEXTS } from './ds'
import { memoStyles } from './styles'

import type { WithFilterProps } from '../../types'

/** 屏蔽 */
function Blocks({ filter }: WithFilterProps) {
  const navigation = useNavigation(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  useEffect(() => {
    if (!userStore.isWebLogin || !state) return

    rakuenStore.fetchPrivacy()
  }, [state])

  if (!shows) return null

  const styles = memoStyles()

  return (
    <>
      <ItemSetting arrow highlight filter={filter} onPress={setTrue} {...TEXTS.blocks} />
      <ActionSheet show={state} title={TEXTS.blocks.hd} height={760} onClose={setFalse}>
        <View style={styles.container}>
          <RakuenBlocks
            onNavigate={(path, params) => {
              setFalse()
              setTimeout(() => {
                navigation.push(path, params)
              }, 240)
            }}
          />
        </View>
      </ActionSheet>
    </>
  )
}

export default observer(Blocks)
