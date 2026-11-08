/*
 * @Author: czy0729
 * @Date: 2023-11-04 05:49:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * Storybook 入口
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Versions as Component } from '@screens'

export default {
  title: 'screens/Versions',
  component: Component
}

export const Versions = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Versions')} />
    </StorybookList>
  </StorybookSPA>
)
