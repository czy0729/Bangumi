/*
 * @Author: czy0729
 * @Date: 2023-05-19 09:58:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 00:39:35
 */
import React from 'react'
import { Flex, Iconfont, SafeAreaBottom, Touchable } from '@components'
import { _, rakuenStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Extra({ onDirect }) {
  r(COMPONENT)

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
