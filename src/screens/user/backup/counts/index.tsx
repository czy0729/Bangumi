/*
 * @Author: czy0729
 * @Date: 2022-12-06 18:35:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-07 14:39:29
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Text, ScrollView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { SUBJECT_TYPE } from '@constants'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Counts(props, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <View style={styles.scrollView}>
      <ScrollView contentContainerStyle={_.container.wind} horizontal>
        {SUBJECT_TYPE.map(item => (
          <Touchable key={item.label} style={styles.item}>
            <Text size={12} bold>
              {item.title}
              <Text size={12} type='sub' bold>
                {'  '}
                {$.state[item.label].length}
              </Text>
            </Text>
          </Touchable>
        ))}
      </ScrollView>
    </View>
  )
}

export default obc(Counts)
