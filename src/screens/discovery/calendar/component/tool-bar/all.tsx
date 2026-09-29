/*
 * @Author: czy0729
 * @Date: 2024-08-09 07:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 16:51:29
 */
import { observer } from 'mobx-react'
import { Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function All() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <Touchable style={styles.touch} onPress={$.onToggleExpand}>
      <Iconfont
        name={$.state.expand ? 'md-radio-button-on' : 'md-radio-button-off'}
        size={15}
        color={_.colorDesc}
      />
    </Touchable>
  )
}

export default observer(All)
