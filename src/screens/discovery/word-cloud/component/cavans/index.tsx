/*
 * @Author: czy0729
 * @Date: 2024-09-26 18:30:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 07:32:11
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { MAX_PAGE } from '../../ds'
import Canvas from './canvas'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Cavans() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.state._loaded) return null

  const styles = memoStyles()
  const { list, _loaded } = $.data
  if (_loaded && !list.length) {
    return (
      <Flex style={styles.empty} justify='center'>
        <Text style={styles.transparent} type='__plain__' bold>
          没有足够的数据，或者授权过期
        </Text>
      </Flex>
    )
  }

  const { fetching } = $.state

  return (
    <View style={styles.container}>
      {!!fetching && (
        <Text style={styles.fetching} type='__plain__' align='center' bold>
          获取数据中 {fetching} / {MAX_PAGE}...
        </Text>
      )}
      {!!list.length && (
        <Canvas
          key={String(_loaded)}
          list={list}
          container={styles.container}
          style={_.mt.md}
          isCollection={!!$.userId}
          onPress={$.onWordPress}
        />
      )}
    </View>
  )
}

export default observer(Cavans)
