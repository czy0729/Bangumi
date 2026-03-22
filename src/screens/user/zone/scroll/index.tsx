/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:58:57
 */
import React from 'react'
import { observer } from 'mobx-react'
import ParallaxImage from '../component/parallax-image'
import Tab from '../component/tab'

function Zone() {
  return (
    <>
      <Tab />
      <ParallaxImage />
    </>
  )
}

export default observer(Zone)
