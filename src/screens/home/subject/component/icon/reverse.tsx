/*
 * @Author: czy0729
 * @Date: 2021-01-17 00:59:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:56:29
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconReverse as IconReverseComp } from '@_'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { styles } from './styles'

function IconReverse() {
  const { $ } = useStore<Ctx>()
  const { epsReverse } = $.state
  return (
    <IconReverseComp
      style={stl(styles.iconReverse, epsReverse && styles.reverse)}
      color={epsReverse ? _.colorMain : _.colorIcon}
      onPress={$.toggleReverseEps}
    >
      <Heatmap right={-5} id='条目.章节倒序' />
    </IconReverseComp>
  )
}

export default ob(IconReverse)
