/*
 * @Author: czy0729
 * @Date: 2022-08-19 02:18:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 02:20:38
 */
import React, { useState } from 'react'
import { Touchable, Flex, Text } from '@components'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

function Block({
  title,
  value = [],
  children
}: {
  title?: string
  value: string | any[]
  children?: any
}) {
  const [open, setOpen] = useState(false)
  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Flex style={[styles.code, _.mt.md]}>
        <Flex.Item>
          <Text size={12} lineHeight={16} selectable>
            {!!title && (
              <Text size={12} lineHeight={16} type='sub'>
                {title}
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
