/*
 * @Author: czy0729
 * @Date: 2022-02-14 06:57:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 20:31:38
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Image, Squircle, Touchable } from '@components'
import { systemStore } from '@stores'
import { withT } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { ASSETS_AWARDS, HOST, TEXT_ONLY } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Award2021() {
  const navigation = useNavigation(COMPONENT)

  const styles = memoStyles()
  const { width, height } = styles.item2021

  return (
    <View style={styles.container}>
      <Touchable
        animate
        onPress={withT(
          () => {
            navigation.push('Award', {
              uri: `${HOST}/award/2021`
            })
          },
          '发现.跳转',
          {
            to: 'Award',
            year: 2021,
            from: 'Award2021'
          }
        )}
      >
        <Squircle width={width} height={height} radius={systemStore.coverRadius}>
          <View style={styles.item2021}>
            {!TEXT_ONLY && (
              <Image
                src={ASSETS_AWARDS[2021]}
                size={styles.body.width}
                height={styles.body.height}
                placeholder={false}
                resizeMode='contain'
              />
            )}
          </View>
        </Squircle>
      </Touchable>
    </View>
  )
}

export default observer(Award2021)
