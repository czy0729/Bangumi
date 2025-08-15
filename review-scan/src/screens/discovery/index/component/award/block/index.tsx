/*
 * @Author: czy0729
 * @Date: 2023-12-26 07:10:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 20:35:12
 */
import React from 'react'
import { View } from 'react-native'
import { Image, Squircle, Touchable } from '@components'
import { systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { withT } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { ASSETS_AWARDS, HOST } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Block({ year }) {
  const navigation = useNavigation()
  const styles = memoStyles()
  const { width, height } = styles.item
  return (
    <Touchable
      style={styles.item}
      animate
      onPress={withT(
        () => {
          navigation.push('Award', {
            uri: `${HOST}/award/${year}`
          })
        },
        '发现.跳转',
        {
          to: 'Award',
          year,
          from: 'Award'
        }
      )}
    >
      <Squircle width={width} height={height} radius={systemStore.coverRadius}>
        <View style={styles[`item${year}`]}>
          <Image
            src={ASSETS_AWARDS[year]}
            size={width - (year === 2019 ? 32 : 0)}
            height={height}
            placeholder={false}
            resizeMode={year !== 2018 ? 'contain' : 'cover'}
          />
        </View>
      </Squircle>
    </Touchable>
  )
}

export default ob(Block, COMPONENT)
