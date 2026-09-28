/*
 * @Author: czy0729
 * @Date: 2023-04-08 04:30:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 *
 * 条目页面 Storybook
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Subject as Component } from '@screens'

export default {
  title: 'screens/Subject',
  component: Component
}

export const Subject = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Subject')} />
    </StorybookList>
  </StorybookSPA>
)
