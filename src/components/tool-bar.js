/*
 * @Author: czy0729
 * @Date: 2021-01-25 11:50:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-28 12:22:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Flex } from './flex'
import { Popover } from './popover/comp'
import { Touchable } from './touchable'
import { Iconfont } from './iconfont'
import { Text } from './text'
import { Heatmap } from './heatmap'

const ToolBar = observer(({ style, children, ...other }) => {
  const styles = memoStyles()
  return (
    <Flex style={[styles.toolBar, style]} justify='center' {...other}>
      {children}
    </Flex>
  )
})

ToolBar.Icon = function ToolBarItem({ icon, iconStyle, iconColor, onSelect }) {
  const styles = memoStyles()
  return (
    <Touchable style={styles.touch} onPress={onSelect}>
      <Flex style={styles.item}>
        {!!icon && (
          <Iconfont style={iconStyle} name={icon} size={16} color={iconColor} />
        )}
      </Flex>
    </Touchable>
  )
}

ToolBar.Touchable = function ToolBarItem({ heatmap, onSelect, children }) {
  const styles = memoStyles()
  return (
    <Touchable style={styles.touch} onPress={onSelect}>
      <Flex style={styles.item} justify='center'>
        {children}
      </Flex>
      {!!heatmap && <Heatmap id={heatmap} />}
    </Touchable>
  )
}

ToolBar.Popover = function ToolBarPopover({
  data,
  icon,
  iconColor,
  iconSize = 16,
  type = 'sub',
  text,
  heatmap,
  onSelect
}) {
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

export { ToolBar }

const memoStyles = _.memoStyles(() => ({
  toolBar: {
    paddingTop: _.ios(_.device(6, 10), 0),
    paddingBottom: _.device(10, 16)
  },
  touch: {
    minWidth: 48,
    marginHorizontal: _.xs,
    borderRadius: 24,
    overflow: 'hidden'
  },
  item: {
    minWidth: 48,
    height: _.device(30, 44),
    paddingHorizontal: 12,
    backgroundColor: _.select('rgba(238, 238, 238, 0.8)', _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  }
}))
