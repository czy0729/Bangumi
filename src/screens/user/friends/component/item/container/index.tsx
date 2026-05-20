/*
 * @Author: czy0729
 * @Date: 2026-05-21 01:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-21 02:03:28
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { InView } from '@_'
import { useStore } from '@stores'
import { COMPONENT } from '../ds'
import { memoStyles } from '../styles'

import type { Props } from './types'
import type { Ctx } from '../../../types'

function Container({ index, children }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  return (
    <View style={styles.item}>
      <InView
        style={styles.inView}
        y={InView.y(Math.floor(index / $.numColumns) + 1, styles.item.width + 24)}
      >
        {children}
      </InView>
    </View>
  )
}

export default observer(Container)
