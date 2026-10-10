/*
 * @Author: czy0729
 * @Date: 2023-04-12 09:54:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:10:00
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Award as Component } from '@screens'

export default {
  title: 'screens/Award',
  component: Component
}

export const Award = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Award')} />
    </StorybookList>
  </StorybookSPA>
)
