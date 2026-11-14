/*
 * @Author: czy0729
 * @Date: 2026-11-12 22:21:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:30:00
 *
 * 筛选候选项
 */
import { observer } from 'mobx-react'
import { Heatmap, Text, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { HIT_SLOP } from '../ds'
import { memoStyles } from '../styles'

import type { Props } from './types'
function Option({
  label,
  num,
  active,
  disabled,
  multiSelect,
  eventId,
  onPress,
  onLongPress
}: Props) {
  const styles = memoStyles()

  return (
    <Touchable
      style={stl(
        styles.item,
        multiSelect && styles.itemMultiSelect,
        active && styles.itemActive,
        disabled && styles.itemDisabled
      )}
      hitSlop={HIT_SLOP}
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Text size={11} noWrap>
        {label}
        {!!num && (
          <Text
            type={_.select('sub', 'icon')}
            size={9}
            lineHeight={11}
            bold
            noWrap
          >{` ${num}`}</Text>
        )}
      </Text>
      <Heatmap right={-1} id={eventId} value={String(label)} mini />
    </Touchable>
  )
}

export default observer(Option)
