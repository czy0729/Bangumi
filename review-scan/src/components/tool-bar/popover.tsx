/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:38:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-27 15:54:04
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Flex } from '../flex'
import { Heatmap } from '../heatmap'
import { Iconfont } from '../iconfont'
import { PopoverData } from '../popover'
import { Popover } from '../popover/comp'
import { Text } from '../text'
import { memoStyles } from './styles'
import { ToolBarPopoverProps } from './types'

export const ToolBarPopover = observer(
  <Data extends PopoverData>({
    style,
    itemStyle,
    data,
    icon,
    iconColor,
    iconSize = 18,
    type = 'sub',
    text,
    heatmap,
    transparent,
    onSelect
  }: ToolBarPopoverProps<Data>) => {
    const styles = memoStyles()
    return (
      <Popover style={stl(styles.touch, style)} data={data} onSelect={onSelect}>
        <Flex style={stl(styles.item, transparent && styles.opacity, itemStyle)} justify='center'>
          {!!icon && <Iconfont name={icon} size={iconSize} color={iconColor} />}
          {!!text && (
            <Text style={stl(icon && _.ml.xs)} type={type} size={12} bold noWrap selectable={false}>
              {text}
            </Text>
          )}
        </Flex>
        {!!heatmap && <Heatmap id={heatmap} />}
      </Popover>
    )
  }
)
