/*
 * @Author: czy0729
 * @Date: 2023-04-07 08:06:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 08:09:33
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Avatar } from '@_'
import { UserStatus as Component, UserStatusProps as Props } from './index'

export default {
  title: 'components/UserStatus',
  component: Component
}

export const UserStatus = (args: Props) => (
  <StorybookPage>
    <Component {...args}>
      <Avatar
        size={80}
        src='https://lain.bgm.tv/pic/user/c/000/45/62/456208.jpg?r=1677056307&hd=1'
      />
    </Component>
  </StorybookPage>
)

UserStatus.args = {
  last: 1800000000
}
