/*
 * @Author: czy0729
 * @Date: 2023-04-11 12:34:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 页面 Storybook
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { CatalogDetail as Component } from '@screens'

export default {
  title: 'screens/CatalogDetail',
  component: Component
}

export const CatalogDetail = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('CatalogDetail')} />
    </StorybookList>
  </StorybookSPA>
)
