/*
 * @Author: czy0729
 * @Date: 2023-05-19 09:58:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 05:36:49
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, SafeAreaBottom, Touchable } from '@components'
import { _, rakuenStore } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Direction, Props } from './types'

function Extra({ onDirect }: Props) {
  r(COMPONENT)

  const styles = memoStyles()

  const { switchSlider } = rakuenStore.setting
  const type = _.ios('height', 'bottom')

  const handlePress = useCallback(
    (isNext: boolean, long = false) => {
      onDirect(isNext, long ? 20 : undefined)
    },
    [onDirect]
  )

  const getIconName = useCallback(
    (direction: Direction) => {
      const isLeft = direction === 'left'
      const useNext = switchSlider ? isLeft : !isLeft
      return `md-navigate-${useNext ? 'next' : 'before'}` as const
    },
    [switchSlider]
  )

  const NavButton = ({ direction }: { direction: Direction }) => {
    const isLeft = direction === 'left'
    const isNext = isLeft ? switchSlider : !switchSlider
    const sideStyle = isLeft ? styles.left : styles.right
    const marginStyle = isLeft ? _.mr.md : _.ml.md

    return (
      <SafeAreaBottom style={sideStyle} type={type}>
        <Touchable
          useRN
          onPress={() => handlePress(isNext)}
          onLongPress={() => handlePress(isNext, true)}
        >
          <Flex style={styles.btn} justify='center'>
            <Iconfont style={marginStyle} name={getIconName(direction)} size={24} />
          </Flex>
        </Touchable>
      </SafeAreaBottom>
    )
  }

  return (
    <>
      <NavButton direction='left' />
      <SafeAreaBottom style={styles.center} type={type} pointerEvents='none'>
        <Flex style={styles.btn} justify='center'>
          <Iconfont name='md-edit' size={15} />
        </Flex>
      </SafeAreaBottom>
      <NavButton direction='right' />
    </>
  )
}

export default observer(Extra)
