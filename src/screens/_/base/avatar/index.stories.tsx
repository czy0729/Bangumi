/*
 * @Author: czy0729
 * @Date: 2023-04-04 18:25:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-04 20:05:38
 */
import React from 'react'
import { Avatar as Component, AvatarProps as Props } from './index'

export default {
  title: 'base/Avatar',
  component: Component
}

export const Avatar = (args: Props) => <Component {...args} />

Avatar.args = {
  src: 'https://lain.bgm.tv/pic/user/c/000/45/62/456208.jpg?r=1677056307&hd=1',
  size: 80
}
