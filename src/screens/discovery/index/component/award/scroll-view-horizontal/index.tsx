/*
 * @Author: czy0729
 * @Date: 2023-11-08 00:47:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 20:53:20
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ScrollView } from '@components'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { ScrollViewProps } from '@components'

function ScrollViewHorizontal({ children, ...other }: ScrollViewProps) {
  r(COMPONENT)

  const styles = memoStyles()

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle} {...other} horizontal>
      {children}
    </ScrollView>
  )
}

export default observer(ScrollViewHorizontal)
