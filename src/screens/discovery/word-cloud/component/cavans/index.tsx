/*
 * @Author: czy0729
 * @Date: 2024-09-26 18:30:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 16:55:53
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MAX_PAGE } from '../../ds'
import { Ctx } from '../../types'
import RNWordCloud from '../react-native-wordcloud'
import { getWords } from './utils'
import { memoStyles } from './styles'

function Cavans(_props, { $ }: Ctx) {
  if (!$.state._loaded) return null

  const styles = memoStyles()
  const { list, _loaded } = $.state.data
  if (_loaded && !list.length) {
    return (
      <Text style={styles.empty} type='__plain__' bold align='center'>
        没有足够的吐槽
      </Text>
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
        <RNWordCloud
          key={String(_loaded)}
          style={_.mt.md}
          options={{
            words: getWords(list),
            verticalEnabled: false,
            minFont: 14,
            maxFont: 68,
            fontOffset: 4,
            ...styles.container
          }}
          onPress={$.onWordPress}
        />
      )}
    </View>
  )
}

export default obc(Cavans)
