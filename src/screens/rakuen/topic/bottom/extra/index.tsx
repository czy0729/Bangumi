/*
 * @Author: czy0729
 * @Date: 2023-05-19 09:58:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-19 11:14:41
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Iconfont } from '@components'
import { _, rakuenStore } from '@stores'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function Extra({ onDirect }) {
  const styles = memoStyles()
  const { switchSlider } = rakuenStore.setting
  return (
    <>
      <View style={styles.left}>
        <Touchable
          useRN
          onPress={() => onDirect(switchSlider ? true : false)}
          onLongPress={() => onDirect(switchSlider ? true : false, 20)}
        >
          <Flex style={styles.btn} justify='center'>
            <Iconfont
              style={_.mr.md}
              name={switchSlider ? 'md-navigate-next' : 'md-navigate-before'}
              size={24}
            />
          </Flex>
        </Touchable>
      </View>
      <View style={styles.center} pointerEvents='none'>
        <Flex style={styles.btn} justify='center'>
          <Iconfont name='md-edit' size={15} />
        </Flex>
      </View>
      <View style={styles.right}>
        <Touchable
          useRN
          onPress={() => onDirect(switchSlider ? false : true)}
          onLongPress={() => onDirect(switchSlider ? false : true, 20)}
        >
          <Flex style={styles.btn} justify='center'>
            <Iconfont
              style={_.ml.md}
              name={switchSlider ? 'md-navigate-before' : 'md-navigate-next'}
              size={24}
            />
          </Flex>
        </Touchable>
      </View>
    </>
  )
}

export default ob(Extra)
