/*
 * 5个竖条的Loading
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-24 00:14:34
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { randomSpeech } from '@constants/speech'
import Flex from './flex'
import Text from './text'
import Mesume from './mesume'

function Empty() {
  return (
    <Flex style={styles.empty} direction='column' justify='center'>
      <Mesume size={80} />
      <Text style={_.mt.sm} type='sub' align='center'>
        {randomSpeech()}
      </Text>
    </Flex>
  )
}

export default observer(Empty)

const styles = StyleSheet.create({
  empty: {
    paddingHorizontal: _.wind,
    minHeight: 400
  }
})
