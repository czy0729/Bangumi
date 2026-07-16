/*
 * @Author: czy0729
 * @Date: 2023-03-21 16:44:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-15 05:50:19
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Loading as LoadingComp } from '@components'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Loading() {
  r(COMPONENT)

  const styles = memoStyles()

  return <LoadingComp style={styles.loading} />
}

export default observer(Loading)
