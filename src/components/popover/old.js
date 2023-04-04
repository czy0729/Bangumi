/*
 * @Author: czy0729
 * @Date: 2019-12-14 16:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-04 20:34:12
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import CompPopover from '../@/ant-design/popover'

export const Popover = observer(({ children, ...other }) => (
  <CompPopover
    arrowStyle={{
      borderTopColor: _.select(_.colorPlain, _._colorDarkModeLevel2)
    }}
    {...other}
  >
    {children}
  </CompPopover>
))
