/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:26:46
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Setting as Component } from '@screens'

import type { Params } from './types'

export default {
  title: 'screens/Setting',
  component: Component
}

export const Setting = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs<Params>('Setting')} />
    </StorybookList>
  </StorybookSPA>
)
