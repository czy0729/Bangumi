/*
 * @Author: czy0729
 * @Date: 2023-04-09 09:20:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找游戏 Storybook
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Game as Component } from '@screens'

export default {
  title: 'screens/Game',
  component: Component
}

export const Game = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Game')} />
    </StorybookList>
  </StorybookSPA>
)
