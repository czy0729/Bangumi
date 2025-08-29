/*
 * @Author: czy0729
 * @Date: 2025-03-07 14:43:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-07 17:04:20
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Input, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { COLORS } from '../../ds'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Textarea() {
  const { $ } = useStore<Ctx>()
  if (!$.state.show) return null

  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <Input
        ref={$.forwardInputRef}
        style={[
          styles.textarea,
          {
            backgroundColor: String($.state.color).replace(', 1)', ', 0.8)')
          }
        ]}
        inputStyle={styles.input}
        value={$.state.text}
        multiline
        numberOfLines={6}
        placeholder='留言描述（最大二百字，每个人暂只保留一条信息，重复发布会覆盖之前的信息）'
        autoFocus
        onChangeText={$.onChangeText}
      />
      <Flex style={_.mt.md}>
        <Flex.Item style={_.mr.xs}>
          <Input
            style={styles.textarea}
            value={$.state.monoId}
            numberOfLines={1}
            placeholder='关联角色 ID（选填）'
            keyboardType='number-pad'
            onChangeText={$.onChangeMonoId}
          />
        </Flex.Item>
        {COLORS.map(item => (
          <Touchable style={_.ml.sm} onPress={() => $.onChangeColor(item)}>
            <View
              style={[
                styles.color,
                {
                  backgroundColor: item
                }
              ]}
            />
          </Touchable>
        ))}
      </Flex>
      <Touchable style={_.mt.md} onPress={$.onSubmit}>
        <View style={styles.btn}>
          <Text size={16} bold align='center'>
            POST
          </Text>
        </View>
      </Touchable>
    </View>
  )
}

export default ob(Textarea, COMPONENT)
