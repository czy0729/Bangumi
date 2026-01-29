/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:24:44
 */
import React from 'react'
import { useObserver } from '@utils/hooks'
import ParallaxImage from '../component/parallax-image'
import Tab from '../component/tab'

function Zone() {
  return useObserver(() => (
    <>
      <Tab />
      <ParallaxImage />
    </>
  ))
}

export default Zone
