/*
 * @Author: czy0729
 * @Date: 2023-03-21 16:44:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 10:37:01
 */
import React from 'react'
import { Loading as LoadingComp } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Loading() {
  r(COMPONENT)

  return useObserver(() => (
    <LoadingComp style={stl(_.ios(_.container.plain, _.container.plain), styles.loading)} />
  ))
}

export default Loading
