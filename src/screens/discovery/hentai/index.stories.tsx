/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:34:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找 Hentai Storybook
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Hentai as Component } from '@screens'

export default {
  title: 'screens/Hentai',
  component: Component
}

export const Hentai = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Hentai')} />
    </StorybookList>
  </StorybookSPA>
)
