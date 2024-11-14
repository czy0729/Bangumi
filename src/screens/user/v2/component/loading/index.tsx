/*
 * @Author: czy0729
 * @Date: 2023-03-21 16:44:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 11:39:52
 */
import React from 'react'
import { Loading as LoadingComp } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Loading() {
  return <LoadingComp style={[_.ios(_.container.plain, _.container.plain), styles.loading]} />
}

export default ob(Loading, COMPONENT)
