/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:34:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找 NSFW Storybook
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { NSFW as Component } from '@screens'

export default {
  title: 'screens/NSFW',
  component: Component
}

export const NSFW = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('NSFW')} />
    </StorybookList>
  </StorybookSPA>
)
