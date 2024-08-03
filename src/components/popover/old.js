/*
 * @Author: czy0729
 * @Date: 2019-12-14 16:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 12:43:16
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import PopoverComp from '../@/ant-design/popover'

export const Popover = observer(({ children, ...other }) => (
  <PopoverComp
    arrowStyle={{
      borderTopColor: _.select(_.colorPlain, _._colorDarkModeLevel2)
    }}
    {...other}
  >
    {children}
  </PopoverComp>
))
