/*
 * @Author: czy0729
 * @Date: 2023-04-12 09:54:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-30 20:54:51
 */
import React from 'react'
import { Page, StorybookList, StorybookSPA, Text, getStorybookArgs } from '@components'
import { _ } from '@stores'
import { open } from '@utils'

const Component = props => {
  const { uri } = props?.route?.params || {}
  return (
    <Page>
      <Text
        style={_.mt.center}
        align='center'
        onPress={() => {
          open(uri)
        }}
      >
        网页端暂不支持直接显示年鉴{'\n\n'}
        点击跳转查看
      </Text>
    </Page>
  )
}

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
