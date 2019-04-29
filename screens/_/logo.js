/*
 * @Author: czy0729
 * @Date: 2019-04-05 21:12:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-28 21:06:24
 */
import React from 'react'
import { Image } from '@components'
import { logoWidth } from '@styles'

const Logo = () => (
  <Image
    width={logoWidth}
    src={require('@assets/images/logo.png')}
    resizeMode='contain'
    placeholder={false}
  />
)

export default Logo
