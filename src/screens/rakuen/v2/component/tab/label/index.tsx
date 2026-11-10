/*
 * @Author: czy0729
 * @Date: 2021-02-10 02:55:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * Tab 分类选择标签
 */
import { useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { Popover } from '@_'
import { r } from '@utils/dev'
import { WEB } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Model, Props } from './types'

function Label<T extends Model>({
  focused,
  model,
  label,
  value,
  onSelect,
  subLabel,
  activateOn,
  onPress
}: Props<T>) {
  r(COMPONENT)

  const memoData = useMemo(() => model.data.map(item => item.label), [model.data])
  const subText = subLabel ?? model.getLabel(value)

  return (
    <Popover
      style={styles.popover}
      data={memoData}
      activateOn={activateOn}
      onPress={onPress}
      onSelect={onSelect}
    >
      <Flex style={styles.label} justify='center'>
        <Text type='title' size={13} bold={focused} noWrap>
          {label}
        </Text>
        {!!focused && !WEB && !!subText && (
          <Text type='sub' size={10} lineHeight={13} noWrap>
            {` ${subText} `}
          </Text>
        )}
      </Flex>
    </Popover>
  )
}

export default observer(Label)
