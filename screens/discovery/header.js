/*
 * @Author: czy0729
 * @Date: 2019-08-10 17:53:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-10 17:58:57
 */
import React from 'react'
import { observer } from 'mobx-react'
import { StatusBarPlaceholder } from '@screens/_'
import _ from '@styles'
import Award from './award'
import Section from './section'
import Section2 from './section2'

function Header() {
  return (
    <>
      <StatusBarPlaceholder style={{ backgroundColor: _.colorBg }} />
      <Award />
      <Section />
      <Section2 />
    </>
  )
}

export default observer(Header)
