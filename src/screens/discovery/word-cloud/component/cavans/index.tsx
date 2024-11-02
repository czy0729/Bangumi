/*
 * @Author: czy0729
 * @Date: 2024-09-26 18:30:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-02 11:15:59
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MAX_PAGE } from '../../ds'
import { Ctx } from '../../types'
import RNWordCloud from '../react-native-wordcloud'
import { getWords } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Cavans(_props, { $ }: Ctx) {
  if (!$.state._loaded) return null

  const styles = memoStyles()
  const { list, _loaded } = $.data
  if (_loaded && !list.length) {
    return (
      <Flex style={styles.empty} justify='center'>
        <Text type='__plain__' bold>
          没有足够的数据
        </Text>
      </Flex>
    )
  }

  const isCollection = !!$.userId
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
            minFont: isCollection ? 12 : 14,
            maxFont: isCollection ? 34 : 68,
            fontOffset: 4,
            ...styles.container
          }}
          onPress={$.onWordPress}
        />
      )}
    </View>
  )
}

export default obc(Cavans, COMPONENT)
