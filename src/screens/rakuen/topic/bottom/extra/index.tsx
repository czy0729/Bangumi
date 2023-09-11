/*
 * @Author: czy0729
 * @Date: 2023-05-19 09:58:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-30 18:30:14
 */
import React from 'react'
import { SafeAreaBottom, Touchable, Flex, Iconfont } from '@components'
import { _, rakuenStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

function Extra({ onDirect }) {
  const styles = memoStyles()
  const { switchSlider } = rakuenStore.setting
  const type = _.ios('height', 'bottom')
  return useObserver(() => (
    <>
      <SafeAreaBottom style={styles.left} type={type}>
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
      </SafeAreaBottom>
      <SafeAreaBottom style={styles.center} type={type} pointerEvents='none'>
        <Flex style={styles.btn} justify='center'>
          <Iconfont name='md-edit' size={15} />
        </Flex>
      </SafeAreaBottom>
      <SafeAreaBottom style={styles.right} type={type}>
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
      </SafeAreaBottom>
    </>
  ))
}

export default Extra
