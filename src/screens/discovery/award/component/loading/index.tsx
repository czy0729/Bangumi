/*
 * @Author: czy0729
 * @Date: 2024-02-12 02:08:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-13 14:51:47
 */
import React from 'react'
import { Loading as LoadingComp, Text } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Loading({ redirectCount, onOpen }) {
  r(COMPONENT)

  return useObserver(() => (
    <LoadingComp style={styles.loading} color={_.__colorPlain__}>
      <Text style={_.mt.md} size={13} type={_.select('plain', 'title')}>
        {redirectCount ? `第${redirectCount}次重试` : '网页加载中, 请稍等'}
      </Text>
      <Text style={styles.extra} size={10} type={_.select('plain', 'title')} onPress={onOpen}>
        或点这里使用浏览器打开
      </Text>
    </LoadingComp>
  ))
}

export default Loading
