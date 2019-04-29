/*
 * @Author: czy0729
 * @Date: 2019-04-24 15:20:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-29 17:39:27
 */
import React from 'react'
import { Image } from '@components'
import { colorMain } from '@styles'

const assets = {
  heart: require('@assets/images/icon/heart.png'),
  heartActive: require('@assets/images/icon/heart-active.png'),
  planet: require('@assets/images/icon/planet.png'),
  planetActive: require('@assets/images/icon/planet-active.png'),
  time: require('@assets/images/icon/time.png'),
  timeActive: require('@assets/images/icon/time-active.png')
}

const IconTabBar = ({ name, tintColor }) => (
  <Image
    size={22}
    placeholder={false}
    src={tintColor === colorMain ? assets[`${name}Active`] : assets[name]}
  />
)

export default IconTabBar
