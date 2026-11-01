/*
 * @Author: czy0729
 * @Date: 2022-08-19 02:18:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 05:52:07
 *
 * 可展开的调试数据展示块
 */
import { useState } from 'react'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { logger, r } from '@utils/dev'
import { COMPONENT_BLOCK } from './ds'
import { memoStyles } from './styles'

import type { BlockProps } from './types'

function Block({ title, value = [], defaultOpen = false, children }: BlockProps) {
  r(COMPONENT_BLOCK)

  const [open, setOpen] = useState(defaultOpen)

  const styles = memoStyles()

  return (
    <Flex style={[styles.code, _.mt.md]}>
      <Flex.Item>
        <Text
          size={12}
          lineHeight={16}
          selectable
          onLongPress={() => {
            logger.log(
              'DEV',
              title,
              typeof value === 'string'
                ? value
                : value.map(item => `\n${JSON.stringify(item, null, 2)}`)
            )
          }}
        >
          {!!title && (
            <Text size={12} lineHeight={16} type='sub'>
              {title}
              {open ? '\n' : ''}
            </Text>
          )}
          {open && (
            <>
              {typeof value === 'string'
                ? value
                : value.map(item => `\n${JSON.stringify(item, null, 2)}`)}
              {children}
            </>
          )}
        </Text>
      </Flex.Item>
      {!open && (
        <Touchable onPress={() => setOpen(true)}>
          <Text>open</Text>
        </Touchable>
      )}
    </Flex>
  )
}

export default observer(Block)
