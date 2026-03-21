/*
 * @Author: czy0729
 * @Date: 2021-02-10 02:55:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 03:00:16
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { WEB } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Model, Props } from './types'

function Label<T extends Model>({ focused, model, label, value, onSelect }: Props<T>) {
  r(COMPONENT)

  const memoData = useMemo(() => model.data.map(item => item.label), [model.data])

  return (
    <Popover style={_.container.block} data={memoData} onSelect={onSelect}>
      <Flex style={styles.label} justify='center'>
        <Text type='title' size={13} bold={focused} noWrap>
          {label}
        </Text>
        {!WEB && (
          <Text type='sub' size={10} lineHeight={13} noWrap>
            {` ${model.getLabel(value)} `}
          </Text>
        )}
      </Flex>
    </Popover>
  )
}

export default observer(Label)
