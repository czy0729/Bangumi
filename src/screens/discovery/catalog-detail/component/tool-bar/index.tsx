/*
 * @Author: czy0729
 * @Date: 2024-03-20 00:13:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 05:06:47
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Button, ToolBar as ToolBarComp } from '@components'
import { _, useStore } from '@stores'
import Collect from './collect'
import Layout from './layout'
import Reverse from './reverse'
import Sort from './sort'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <ToolBarComp>
      <Sort />
      <Layout />
      {!!$.catalogDetail.list.length && (
        <>
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
        </>
      )}
      <Reverse />
    </ToolBarComp>
  )
}

export default observer(ToolBar)
