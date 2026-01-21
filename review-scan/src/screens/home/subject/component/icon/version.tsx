/*
 * @Author: czy0729
 * @Date: 2024-07-06 12:46:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:02:08
 */
import React from 'react'
import { Text, Touchable } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { styles } from './styles'

function IconVersion() {
  const { $ } = useStore<Ctx>()
  if (!$.subjectComments.version) return null

  const { filterVersion } = $.state
  return (
    <Touchable style={styles.version} onPress={$.toggleVersion}>
      <Text type={filterVersion ? 'main' : 'icon'} size={13} bold>
        {filterVersion ? '当前' : '全部'}版本
      </Text>
    </Touchable>
  )
}

export default ob(IconVersion)
