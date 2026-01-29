/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:01:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:03:53
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

import type { WithViewStyles } from '@types'
import type { Ctx } from '../../../types'

function Remark({ style }: WithViewStyles) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <View style={style}>
      <Touchable style={styles.remark} animate scale={0.8} onPress={$.openRemarkModal}>
        <Text type={_.select('plain', 'title')} size={11} bold shadow numberOfLines={1} noWrap>
          {$.userRemark ? `[${$.userRemark}]` : '备注'}
        </Text>
      </Touchable>
    </View>
  ))
}

export default Remark
