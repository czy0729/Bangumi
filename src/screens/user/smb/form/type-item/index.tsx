/*
 * @Author: czy0729
 * @Date: 2023-11-17 05:01:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-25 14:41:50
 */
import React from 'react'
import { Flex, Text, SegmentedControl, Touchable } from '@components'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import { Ctx } from '../../types'
import { styles } from './styles'

function TypeItem(
  {
    store
  }: {
    store: Ctx['$']
  },
  { $ }: Ctx
) {
  $ = $ || store

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

export default obc(TypeItem)
