/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:38:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-05 19:39:57
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Flex } from '../flex'
import { Text } from '../text'
import { Popover } from '../popover/comp'
import { Iconfont } from '../iconfont'
import { Heatmap } from '../heatmap'
import { memoStyles } from './styles'

export const ToolBarPopover = observer(
  ({ data, icon, iconColor, iconSize = 16, type = 'sub', text, heatmap, onSelect }) => {
    const styles = memoStyles()
    return (
      <Popover style={styles.touch} data={data} onSelect={onSelect}>
        <Flex style={styles.item} justify='center'>
          {!!icon && (
            <Iconfont
              style={!!text && _.mr.xs}
              name={icon}
              size={iconSize}
              color={iconColor}
            />
          )}
          {!!text && (
            <Text size={11} type={type} bold>
              {text}
            </Text>
          )}
        </Flex>
        {!!heatmap && <Heatmap id={heatmap} />}
      </Popover>
    )
  }
)
