/*
 * @Author: czy0729
 * @Date: 2024-05-01 11:03:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:07:36
 */
import React from 'react'
import { Menu } from '@components'
import { Popover } from '@components/popover/old'
import { observer } from '@utils/decorators'
import { FROZEN_FN, IOS } from '@constants'

/** 旧实现, 暂保留 */
const PopoverOld = ({ data = [], menuStyle, onSelect = FROZEN_FN, children, ...other }) => {
  const popoverProps = IOS
    ? {
        overlay: (
          <Menu
            style={menuStyle}
            data={data}
            onSelect={title => setTimeout(() => onSelect(title), 0)}
          />
        )
      }
    : {
        data,
        onSelect
      }

  return (
    <Popover key={String(data.length)} placement='bottom' {...popoverProps} {...other}>
      {children}
    </Popover>
  )
}

export default observer(PopoverOld)
