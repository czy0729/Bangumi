/*
 * @Author: czy0729
 * @Date: 2023-04-11 10:44:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-10 22:54:22
 */
import React, { useRef } from 'react'
import { View } from 'react-native'
import { Touchable, Squircle } from '@components'
import { systemStore } from '@stores'
import { useMount } from '@utils/hooks'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import { Navigation } from '@types'
import { getHtml } from './utils'
import { memoStyles } from './styles'

function Award2022({
  navigation,
  width,
  height
}: {
  navigation: Navigation
  width?: number
  height?: number
}) {
  const styles = memoStyles()
  const { coverRadius } = systemStore.setting
  const ref = useRef(null)
  useMount(() => {
    ref.current.innerHTML = getHtml(
      width || styles.body.width,
      height || styles.body.height
    )
  })

  const h = height || styles.item2022.height
  return (
    <View
      style={[
        styles.container,
        {
          height: height || styles.container.height,
          marginRight: height ? 0 : styles.container.marginRight
        }
      ]}
    >
      <Squircle width={h} radius={coverRadius}>
        <Touchable
          style={[
            styles.item2022,
            {
              width: width || styles.item2022.width,
              height: h
            }
          ]}
          animate
          onPress={() => {
            t('发现.跳转', {
              to: 'Award',
              year: 2022,
              from: 'Award2022'
            })

            navigation.push('Award', {
              uri: `${HOST}/award/2022`
            })
          }}
        >
          <View ref={ref} />
        </Touchable>
      </Squircle>
    </View>
  )
}

export default Award2022
