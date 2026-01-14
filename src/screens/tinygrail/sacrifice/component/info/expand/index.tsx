/*
 * @Author: czy0729
 * @Date: 2024-03-07 06:39:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 06:59:50
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Expand() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <Flex style={_.mt.sm} justify='center'>
      <Touchable onPress={$.toggleCover}>
        <Flex style={styles.expand} justify='center'>
          <Iconfont
            name={$.state.showCover ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
            color={_.colorTinygrailText}
          />
        </Flex>
      </Touchable>
    </Flex>
  ))
}

export default Expand
