/*
 * @Author: czy0729
 * @Date: 2024-02-12 02:08:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:10:00
 *
 * 网页加载中的占位, 提供浏览器打开入口
 */
import { observer } from 'mobx-react'
import { Loading as LoadingComp, Text } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function Loading({ onOpen }: Props) {
  r(COMPONENT)

  return (
    <LoadingComp style={styles.loading} color={_.__colorPlain__}>
      <Text style={_.mt.md} type='__plain__' size={13}>
        网页加载中, 请稍等
      </Text>
      <Text style={styles.extra} type='__plain__' size={10} onPress={onOpen}>
        或点这里使用浏览器打开
      </Text>
    </LoadingComp>
  )
}

export default observer(Loading)
