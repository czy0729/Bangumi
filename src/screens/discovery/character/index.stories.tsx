/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:02:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 页面 Storybook
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Character as Component } from '@screens'

export default {
  title: 'screens/Character',
  component: Component
}

export const Character = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Character')} />
    </StorybookList>
  </StorybookSPA>
)
