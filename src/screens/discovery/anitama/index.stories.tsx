/*
 * @Author: czy0729
 * @Date: 2023-04-11 19:00:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:05:00
 */
import { Page, StorybookList, StorybookSPA, Text } from '@components'
import { _ } from '@stores'

const Component = () => (
  <Page>
    <Text style={_.mt.center} align='center'>
      网页端暂不支持此功能 (资讯)
    </Text>
  </Page>
)

export default {
  title: 'screens/Anitama',
  component: Component
}

export const Anitama = () => (
  <StorybookSPA>
    <StorybookList>
      <Component />
    </StorybookList>
  </StorybookSPA>
)
