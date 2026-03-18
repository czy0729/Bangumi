/*
 * @Author: czy0729
 * @Date: 2021-01-17 00:59:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:26:25
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { IconReverse as IconComp } from '@_'
import { _, useStore } from '@stores'
import { styles } from './styles'

import type { Ctx } from '../../types'

function IconReverse() {
  const { $ } = useStore<Ctx>()

  return (
    <IconComp
      style={styles.iconReverse}
      color={$.state.epsReverse ? _.colorMain : _.colorIcon}
      onPress={$.toggleReverseEps}
    >
      <Heatmap right={-5} id='条目.章节倒序' />
    </IconComp>
  )
}

export default observer(IconReverse)
