/*
 * @Author: czy0729
 * @Date: 2023-11-17 05:01:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 05:42:37
 */
import React from 'react'
import { Flex, SegmentedControl, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { alert } from '@utils'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function TypeItem({ store }: { store: Ctx['$'] }) {
  let { $ } = useStore<Ctx>()
  $ = $?.state ? $ : store

  const { webDAV } = $.state
  const elType = (
    <SegmentedControl
      style={styles.segmentedControl}
      size={11}
      values={['SMB', 'webDAV']}
      selectedIndex={webDAV ? 1 : 0}
      enabled={!IOS}
      onChange={() => $.onChange('webDAV', !webDAV)}
    />
  )

  return (
    <Flex>
      <Text style={styles.label} size={12}>
        类型
      </Text>
      <Flex.Item>
        {IOS ? (
          <Touchable
            onPress={() => {
              alert('iOS 目前仅支持 webDAV 模式')
            }}
          >
            {elType}
          </Touchable>
        ) : (
          elType
        )}
      </Flex.Item>
    </Flex>
  )
}

export default ob(TypeItem)
