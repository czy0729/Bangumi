/*
 * @Author: czy0729
 * @Date: 2024-03-20 00:13:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-10 01:05:09
 */
import React from 'react'
import { Button, ToolBar as ToolBarComp } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Collect from './collect'
import Layout from './layout'
import Sort from './sort'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ToolBar(props, { $ }: Ctx) {
  return (
    <ToolBarComp>
      <Sort />
      <Layout />
      <Collect />
      <Button
        style={styles.btn}
        styleText={_.fontSize12}
        type='plain'
        bold
        onPress={$.fetchSubjectsQueue}
      >
        更新评分
      </Button>
    </ToolBarComp>
  )
}

export default obc(ToolBar, COMPONENT)
