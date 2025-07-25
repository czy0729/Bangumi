/*
 * @Author: czy0729
 * @Date: 2023-11-17 05:01:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:23:27
 */
import React from 'react'
import { Flex, SegmentedControl, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { Ctx } from '../../../types'
import { styles } from './styles'

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
