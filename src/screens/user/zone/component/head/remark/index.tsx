/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:01:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:40:54
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text, Touchable } from '@components'
import { useStore } from '@stores'
import { styles } from './styles'

import type { WithViewStyles } from '@types'
import type { Ctx } from '../../../types'

function Remark({ style }: WithViewStyles) {
  const { $ } = useStore<Ctx>()

  return (
    <View style={style}>
      <Touchable style={styles.remark} animate scale={0.8} onPress={$.openRemarkModal}>
        <Text type='__plain__' size={11} bold shadow numberOfLines={1} noWrap>
          {$.userRemark ? `[${$.userRemark}]` : '备注'}
        </Text>
      </Touchable>
    </View>
  )
}

export default observer(Remark)
