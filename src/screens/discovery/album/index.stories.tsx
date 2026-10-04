/*
 * @Author: czy0729
 * @Date: 2026-10-05 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 *
 * 找画集 Storybook
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Album as Component } from '@screens'

export default {
  title: 'screens/Album',
  component: Component
}

export const Album = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Album')} />
    </StorybookList>
  </StorybookSPA>
)
