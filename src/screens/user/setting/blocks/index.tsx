/*
 * @Author: czy0729
 * @Date: 2023-02-14 03:18:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-12 22:23:29
 */
import React from 'react'
import { View } from 'react-native'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { useBoolean, useObserver } from '@utils/hooks'
import { STORYBOOK } from '@constants'
import RakuenBlocks from '../../../rakuen/setting/blocks'
import { getShows } from '../utils'
import { TEXTS } from './ds'
import { styles } from './styles'

function Blocks({ navigation, filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    return (
      <>
        <ItemSetting hd='屏蔽' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} title='屏蔽' height={760} onClose={setFalse}>
          <View style={!STORYBOOK && styles.container}>
            <RakuenBlocks
              navigation={navigation}
              onNavigate={(path: any, params: any) => {
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
  })
}

export default Blocks
