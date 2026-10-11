/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 页面 Storybook
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Catalogs as Component } from '@screens'

export default {
  title: 'screens/Catalogs',
  component: Component
}

export const Catalogs = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Catalogs')} />
    </StorybookList>
  </StorybookSPA>
)
