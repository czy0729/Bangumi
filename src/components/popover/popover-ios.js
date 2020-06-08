/*
 * 气泡, 没有完全沿用官方的, 改了很多代码
 * @Doc: https://rn.mobile.ant.design/components/popover-cn/
 * @Author: czy0729
 * @Date: 2019-03-16 10:54:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-14 16:28:36
 */
import React from 'react'
import { observer } from 'mobx-react'
import CompPopover from '../@/ant-design/popover'
import { _ } from '@stores'

function Popover({ children, ...other }) {
  return (
    <CompPopover
      arrowStyle={{
        borderTopColor: _.select(_.colorPlain, _._colorDarkModeLevel2)
      }}
      {...other}
    >
      {children}
    </CompPopover>
  )
}

export default observer(Popover)
