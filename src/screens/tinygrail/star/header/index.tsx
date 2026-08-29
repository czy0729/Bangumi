/*
 * @Author: czy0729
 * @Date: 2024-03-10 03:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 18:38:28
 */
import React from 'react'
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import Label from '../component/label'
import { COMPONENT, HM } from './ds'

function Header() {
  r(COMPONENT)

  return (
    <HeaderV2
      title='通天塔'
      headerTitleAlign='left'
      backgroundStyle={_.container.tinygrail}
      hm={HM}
      headerRight={() => <Label />}
    />
  )
}

export default observer(Header)
