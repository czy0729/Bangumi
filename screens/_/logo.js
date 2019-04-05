/*
 * @Author: czy0729
 * @Date: 2019-04-05 21:12:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-06 04:56:08
 */
import React from 'react'
import { Image } from '@components'

const Logo = () => (
  <Image
    style={{ marginTop: -6 }}
    width={120}
    src={require('@assets/images/logo.png')}
    resizeMode='contain'
  />
)

export default Logo
