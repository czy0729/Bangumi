/*
 * @Author: czy0729
 * @Date: 2023-12-26 07:10:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 20:34:11
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Image, Squircle, Touchable } from '@components'
import { systemStore } from '@stores'
import { withT } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { ASSETS_AWARDS, HOST } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function Block({ year }: Props) {
  const navigation = useNavigation(COMPONENT)

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
        <View style={styles[`item${year}` as const]}>
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

export default observer(Block)
