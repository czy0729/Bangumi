/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:50:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 22:57:26
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { IconBack } from '@_'
import { _ } from '@stores'
import { useInsets, useNavigation, useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import { IS_IOS_5_6_7_8 } from '@styles'
import { styles } from './styles'

function Back() {
  const navigation = useNavigation()
  const { statusBarHeight } = useInsets()

  const header = useMemo(
    () =>
      ({
        left: {
          position: 'absolute',
          top: IOS ? statusBarHeight + (IS_IOS_5_6_7_8 ? 12 : 8) : statusBarHeight + 12,
          left: 4
        }
      } as const),
    [statusBarHeight]
  )

  return useObserver(() => (
    <View style={[header.left, styles.back]}>
      <IconBack navigation={navigation} color={_.__colorPlain__} />
    </View>
  ))
}

export default Back
