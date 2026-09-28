/*
 * @Author: czy0729
 * @Date: 2023-04-12 01:24:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * storybook 入口
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Works as Component } from '@screens'

export default {
  title: 'screens/Works',
  component: Component
}

export const Works = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Works')} />
    </StorybookList>
  </StorybookSPA>
)
