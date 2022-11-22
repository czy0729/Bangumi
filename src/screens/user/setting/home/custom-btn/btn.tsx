/*
 * @Author: czy0729
 * @Date: 2022-11-22 05:49:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-22 11:26:41
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Text, Flex, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function Btn({ item, active = false, onPress }: any) {
  const styles = memoStyles()
  if (!item) return <View style={styles.btn} />

  return (
    <Touchable style={[styles.btn, active && styles.btnActive]} onPress={onPress}>
      <Flex style={styles.btn} direction='column' justify='center'>
        {item.text ? (
          <Text style={_.mb.xs} bold>
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
        <Text size={10} bold>
          {item.name}
        </Text>
      </Flex>
    </Touchable>
  )
}

export default ob(Btn)
