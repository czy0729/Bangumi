/*
 * @Author: czy0729
 * @Date: 2024-02-12 02:08:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-12 02:32:26
 */
import React from 'react'
import { Loading as LoadingComp, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Loading({ redirectCount, onOpen }) {
  return (
    <LoadingComp style={styles.loading} color={_.__colorPlain__}>
      <Text style={_.mt.md} size={13} type={_.select('plain', 'title')}>
        {redirectCount ? `第${redirectCount}次重试` : '网页加载中, 请稍等'}
      </Text>
      <Text style={styles.extra} size={10} type={_.select('plain', 'title')} onPress={onOpen}>
        或点这里使用浏览器打开
      </Text>
    </LoadingComp>
  )
}

export default ob(Loading, COMPONENT)
