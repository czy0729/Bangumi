/*
 * @Author: czy0729
 * @Date: 2023-03-21 16:44:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:05:13
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Loading as LoadingComp } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Loading() {
  r(COMPONENT)

  return <LoadingComp style={stl(_.ios(_.container.plain, _.container.plain), styles.loading)} />
}

export default observer(Loading)
