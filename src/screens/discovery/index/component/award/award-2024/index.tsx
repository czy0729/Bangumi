/*
 * @Author: czy0729
 * @Date: 2025-01-27 15:33:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 20:32:43
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Image, Text, Touchable } from '@components'
import { open } from '@utils'
import { useNavigation } from '@utils/hooks'
import { ASSETS_AWARDS, HOST, TEXT_ONLY } from '@constants'
import { COMPONENT, URI } from './ds'
import { memoStyles } from './styles'

function Award2024() {
  const navigation = useNavigation(COMPONENT)

  const styles = memoStyles()

  return (
    <View style={styles.container}>
      <Touchable
        animate
        onPress={() => {
          navigation.push('Award', {
            uri: URI
          })
        }}
      >
        <View style={styles.item}>
          {!TEXT_ONLY && (
            <Image
              src={ASSETS_AWARDS[2024]}
              size={styles.body.width}
              height={styles.body.height}
              placeholder={false}
            />
          )}
        </View>
      </Touchable>

      <View style={styles.fixed}>
        <Touchable
          onPress={() => {
            open(`${HOST}/award/2024/winner`)
          }}
        >
          <Text style={styles.tba} type='__plain__' size={11} bold>
            TBA
          </Text>
        </Touchable>
      </View>
    </View>
  )
}

export default observer(Award2024)
