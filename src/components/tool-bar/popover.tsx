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
import { Text } from '../text'
import { Popover } from '../popover/comp'
import { Iconfont } from '../iconfont'
import { Heatmap } from '../heatmap'
import { memoStyles } from './styles'
import { ToolBarPopoverProps } from './types'

export const ToolBarPopover = observer(
  ({
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
  }: ToolBarPopoverProps) => {
    const styles = memoStyles()
    return (
      <Popover
        style={stl(styles.touch, transparent && styles.transparentTouch, style)}
        data={data}
        onSelect={onSelect}
      >
        <Flex
          style={stl(styles.item, transparent && styles.transparentItem, itemStyle)}
          justify='center'
        >
          {!!icon && (
            <Iconfont
              style={!!text && _.mr.xs}
              name={icon}
              size={iconSize}
              color={iconColor}
            />
          )}
          {!!text && (
            <Text size={12} type={type} bold noWrap selectable={false}>
              {text}
            </Text>
          )}
        </Flex>
        {!!heatmap && <Heatmap id={heatmap} />}
      </Popover>
    )
  }
)
