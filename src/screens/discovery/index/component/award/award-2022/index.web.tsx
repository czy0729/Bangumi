/*
 * @Author: czy0729
 * @Date: 2023-04-11 10:44:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 02:46:04
 */
import { useEffect, useRef } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Squircle, Touchable } from '@components'
import { systemStore } from '@stores'
import { stl } from '@utils'
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

    // 项目未启用 DOM lib, 用最小结构描述宿主元素
    const el = ref.current as { innerHTML: string } | null
    if (!el) return

    el.innerHTML = getHtml(width || styles.body.width, height || styles.body.height)
  }, [active, height, width])

  const w = width || styles.item2022.width
  const h = height || styles.item2022.height

  return (
    <View
      style={stl(styles.container, {
        height: height || styles.container.height,
        marginRight: height ? 0 : styles.container.marginRight
      })}
    >
      <Squircle width={w} height={h} radius={systemStore.coverRadius}>
        <Touchable
          style={stl(styles.item2022, {
            width: w,
            height: h
          })}
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
