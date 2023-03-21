/*
 * @Author: czy0729
 * @Date: 2023-03-21 16:44:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-21 16:45:55
 */
import React from 'react'
import { Loading as LoadingComp } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { styles } from './styles'

function Loading() {
  return (
    <LoadingComp
      style={[_.ios(_.container.plain, _.container._plain), styles.loading]}
    />
  )
}
export default ob(Loading)
