/*
 * @Author: czy0729
 * @Date: 2022-04-01 04:04:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:20:55
 */
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import Form from './form'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

export default observer(() => {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <Form
      store={$}
      styles={memoStyles()}
      visible={$.state.visible}
      name={$.state.name}
      onClose={$.onClose}
    />
  )
})
