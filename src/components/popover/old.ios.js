/*
 * @Author: czy0729
 * @Date: 2019-12-14 16:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-31 19:23:03
 */
import React from 'react'
import { observer } from 'mobx-react'
import CompPopover from '../@/ant-design/popover'
import { _ } from '@stores'

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
