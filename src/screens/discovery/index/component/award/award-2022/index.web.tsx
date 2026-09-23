/*
 * @Author: czy0729
 * @Date: 2023-04-11 10:44:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:23:54
 */
import React, { useEffect, useRef } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Squircle, Touchable } from '@components'
import { systemStore } from '@stores'
import { withT } from '@utils/fetch'
import { useActive, useNavigation } from '@utils/hooks'
import { HOST } from '@constants'
import { getHtml } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function Award2022({ width, height }: Props) {
  const navigation = useNavigation(COMPONENT)
  const ref = useRef(null)

  const active = useActive()

  useEffect(() => {
    if (!active) return

    const el = ref.current as HTMLElement | null
    if (!el) return

    el.innerHTML = getHtml(width || styles.body.width, height || styles.body.height)
  }, [active, height, width])

  const w = width || styles.item2022.width
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
      <Squircle width={w} height={h} radius={systemStore.coverRadius}>
        <Touchable
          style={[
            styles.item2022,
            {
              width: w,
              height: h
            }
          ]}
          animate
          onPress={withT(
            () => {
              navigation.push('Award', {
                uri: `${HOST}/award/2022`
              })
            },
            '发现.跳转',
            {
              to: 'Award',
              year: 2022,
              from: 'Award2022'
            }
          )}
        >
          <View ref={ref} />
        </Touchable>
      </Squircle>
    </View>
  )
}

export default observer(Award2022)
