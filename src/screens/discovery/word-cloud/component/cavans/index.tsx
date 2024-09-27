/*
 * @Author: czy0729
 * @Date: 2024-09-26 18:30:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 04:33:07
 */
import React from 'react'
import { Flex, Loading, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import RNWordCloud from '../react-native-wordcloud'
import { getWords } from './utils'

function Cavans(_props, { $ }: Ctx) {
  if (!$.state._loaded) return null

  const containerStyles = {
    width: _.window.contentWidth,
    height: _.window.height - 280
  }

  const { fetching } = $.state
  if (fetching) {
    return (
      <Flex style={containerStyles}>
        <Loading>
          <Text style={_.mt.sm} type='sub' bold>
            {fetching} / 5
          </Text>
        </Loading>
      </Flex>
    )
  }

  const { list, _loaded } = $.state.data
  if (!list.length) {
    return (
      <Text style={_.mt.lg} type='sub' bold align='center'>
        没有足够的吐槽
      </Text>
    )
  }

  return (
    <RNWordCloud
      key={String(_loaded)}
      style={containerStyles}
      options={{
        words: getWords(list),
        verticalEnabled: false,
        minFont: 14,
        maxFont: 68,
        fontOffset: 4,
        ...containerStyles
      }}
      onPress={$.onWordPress}
    />
  )
}

export default obc(Cavans)
