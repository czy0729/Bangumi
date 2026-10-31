/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:37:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 04:03:41
 *
 * 本地备份页 Storybook 入口
 */
import { getStorybookArgs, Page, StorybookList, StorybookSPA, Text } from '@components'
import { _ } from '@stores'

import type { ReactNode } from 'react'
import type { NavigationProps } from '@types'

/** 占位页不消费页面参数, 仅为与其它 story 的调用方式保持一致 */
const Component: (props: NavigationProps) => ReactNode = () => (
  <Page>
    <Text style={_.mt.center} align='center'>
      网页端暂不支持此功能 (本地备份)
    </Text>
  </Page>
)

export default {
  title: 'screens/Backup',
  component: Component
}

export const Backup = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Backup')} />
    </StorybookList>
  </StorybookSPA>
)
