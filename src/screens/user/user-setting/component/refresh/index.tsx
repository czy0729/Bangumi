/*
 * @Author: czy0729
 * @Date: 2024-01-22 13:17:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:08:58
 *
 * 随机头像页的刷新按钮
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Refresh({ onRefresh }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  if ($.state.selectedIndex !== 1) return null

  const styles = memoStyles()

  return (
    <View style={styles.btn}>
      <Touchable style={styles.touch} onPress={onRefresh}>
        <Flex style={styles.icon} justify='center'>
          <Iconfont name='md-refresh' color={_.colorPlain} size={20} />
        </Flex>
      </Touchable>
    </View>
  )
}

export default observer(Refresh)
