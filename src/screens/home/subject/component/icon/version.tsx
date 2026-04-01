/*
 * @Author: czy0729
 * @Date: 2024-07-06 12:46:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:29:14
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { styles } from './styles'

import type { Ctx } from '../../types'

function IconVersion() {
  const { $ } = useStore<Ctx>()

  if (!$.subjectComments.version) return null

  const { filterVersion } = $.state

  return (
    <Touchable style={styles.version} onPress={$.toggleVersion}>
      <Text type={filterVersion ? 'main' : _.select('sub', 'icon')} size={13} bold>
        {filterVersion ? '当前' : '全部'}版本
      </Text>
    </Touchable>
  )
}

export default observer(IconVersion)
