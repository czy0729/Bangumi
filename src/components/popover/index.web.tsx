/*
 * @Author: czy0729
 * @Date: 2023-05-26 08:51:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 06:14:18
 */
import { useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import Dropdown from 'rc-dropdown'
import 'rc-dropdown/assets/index.css'
import { r } from '@utils/dev'
import { Component } from '../component'
import { Menu } from '../menu'
import { usePopoverDropdown } from './hooks'
import { COMPONENT } from './ds'
import './index.scss'

import type { PopoverComponent, PopoverData, Props as PopoverProps } from './types'
export type { PopoverProps, PopoverData }

/** 点击位置弹出层 (Web: rc-dropdown + Menu) */
function Popover<Data extends PopoverData>({
  data,
  title = '',
  desc = '',
  style,
  onSelect,
  children
}: PopoverProps<Data>) {
  r(COMPONENT)

  const { visible, onVisibleChange, handleSelect } = usePopoverDropdown({ onSelect })

  /**
   * Web Menu 内部按文案去重渲染 (removeDuplicateStrings), onSelect 的 index 基于去重后数组;
   * 这里先对原始条目做同样去重, 保证按 index 回读不因重复文案错位
   */
  const memoData = useMemo(() => {
    if (!data) return undefined

    const seen = new Set<string>()
    return data.filter(item => {
      const text = typeof item === 'string' ? item : item.text
      if (seen.has(text)) return false
      seen.add(text)
      return true
    })
  }, [data])

  const overlayElement = useMemo(() => {
    const menuTitle = title ? [title] : []

    // Web Menu 只支持文本, 对象项降级取 text 展示, 选中回调按索引回传原始数据
    const labels = memoData?.map(item => (typeof item === 'string' ? item : item.text))

    return (
      <Menu
        title={menuTitle.length ? menuTitle : undefined}
        data={labels}
        desc={desc}
        onSelect={(_, index) =>
          handleSelect(typeof index === 'number' ? memoData?.[index] : undefined, index)
        }
      />
    )
  }, [memoData, title, desc, handleSelect])

  return (
    <Component id='component-popover'>
      <Dropdown
        visible={visible}
        trigger={['click']}
        overlay={overlayElement}
        onVisibleChange={onVisibleChange}
        getPopupContainer={() => window.document.querySelector('component-storybook-page')}
      >
        <View style={style}>{children}</View>
      </Dropdown>
    </Component>
  )
}

const PopoverWithObserver = observer(Popover) as PopoverComponent

export { PopoverWithObserver as Popover }

export default PopoverWithObserver
