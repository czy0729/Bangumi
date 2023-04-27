/*
 * @Author: czy0729
 * @Date: 2022-11-22 05:49:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-27 19:46:39
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Text, Flex, Iconfont } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function Btn({ item, active = false, onPress }: any) {
  const styles = memoStyles()
  if (!item) return <View style={styles.btn} />

  return (
    <Touchable style={stl(styles.btn, active && styles.btnActive)} onPress={onPress}>
      <Flex style={styles.btn} direction='column' justify='center'>
        <Flex style={styles.icon} justify='center'>
          {item.text ? (
            <Text style={_.mb.xs} size={Math.floor((item.size || 24) * 0.9)} bold>
              {item.text}
            </Text>
          ) : (
            <Iconfont
              style={_.mb.xs}
              name={item.icon}
              color={_.colorDesc}
              size={Math.floor((item.size || 24) * 0.9)}
            />
          )}
        </Flex>
        <Text size={10} bold>
          {item.name}
        </Text>
      </Flex>
    </Touchable>
  )
}

export default ob(Btn)
