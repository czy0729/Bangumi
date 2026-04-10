/*
 * @Author: czy0729
 * @Date: 2022-08-19 02:18:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 23:44:52
 */
import React, { useState } from 'react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { logger } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

type Props = {
  title?: string
  value: string | any[]
  defaultOpen?: boolean
  children?: any
}

function Block({ title, value = [], defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return useObserver(() => {
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
  })
}

export default Block
