/*
 * @Author: czy0729
 * @Date: 2024-03-20 00:13:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-08 07:52:29
 */
import React from 'react'
import { Button, ToolBar as ToolBarComp } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Collect from './collect'
import Layout from './layout'
import Reverse from './reverse'
import Sort from './sort'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ToolBar() {
  const { $ } = useStore<Ctx>()
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

export default ob(ToolBar, COMPONENT)
