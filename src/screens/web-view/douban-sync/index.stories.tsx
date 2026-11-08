/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:37:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 20:00:00
 *
 * Storybook 入口 (web 端提示页)
 */
import { Page, StorybookList, StorybookSPA, Text } from '@components'
import { _ } from '@stores'

const Component = () => (
  <Page>
    <Text style={_.mt.center} align='center'>
      网页端暂不支持此功能 (影视同步)
    </Text>
  </Page>
)

export default {
  title: 'screens/DoubanSync',
  component: Component
}

export const DoubanSync = () => (
  <StorybookSPA>
    <StorybookList>
      <Component />
    </StorybookList>
  </StorybookSPA>
)
