/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-26 19:09:17
 */
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { SubjectCatalogs as Component } from '@screens'

export default {
  title: 'screens/SubjectCatalogs',
  component: Component
}

export const SubjectCatalogs = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('SubjectCatalogs')} />
    </StorybookList>
  </StorybookSPA>
)
