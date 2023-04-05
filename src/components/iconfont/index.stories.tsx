/*
 * @Author: czy0729
 * @Date: 2023-04-05 15:50:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 16:07:42
 */
import React from 'react'
import { _ } from '@stores'
import AppIcons from '@components/@/vector-icons/vendor/react-native-vector-icons/glyphmaps/AntDesign.json'
import IoniconsIcons from '@components/@/vector-icons/vendor/react-native-vector-icons/glyphmaps/Ionicons.json'
import MaterialIcons from '../@/vector-icons/vendor/react-native-vector-icons/glyphmaps/MaterialIcons.json'
import { StorybookGrid, StorybookPage } from '../storybook'
import { Flex } from '../flex'
import { Text } from '../text'
import { Iconfont } from './index'

export default {
  title: 'components/Iconfont',
  component: Iconfont
}

export const App = () => (
  <StorybookPage>
    <StorybookGrid style={styles.page}>
      {Object.keys(AppIcons).map(item => {
        const name = `${item}`
        return (
          <Flex key={name} style={styles.item} direction='column'>
            {/* @ts-expect-error */}
            <Iconfont name={name} />
            <Text style={_.mt.xs} size={12} align='center'>
              {name}
            </Text>
          </Flex>
        )
      })}
    </StorybookGrid>
  </StorybookPage>
)

export const Material = () => (
  <StorybookPage>
    <StorybookGrid style={styles.page}>
      {Object.keys(MaterialIcons).map(item => {
        const name = `md-${item}`
        return (
          <Flex key={name} style={styles.item} direction='column'>
            {/* @ts-expect-error */}
            <Iconfont name={name} />
            <Text style={_.mt.xs} size={12} align='center'>
              {name}
            </Text>
          </Flex>
        )
      })}
    </StorybookGrid>
  </StorybookPage>
)

export const Ionicons = () => (
  <StorybookPage>
    <StorybookGrid style={styles.page}>
      {Object.keys(IoniconsIcons).map(item => {
        const name = `${item}`
        return (
          <Flex key={name} style={styles.item} direction='column'>
            {/* @ts-expect-error */}
            <Iconfont name={name} />
            <Text style={_.mt.xs} size={12} align='center'>
              {name}
            </Text>
          </Flex>
        )
      })}
    </StorybookGrid>
  </StorybookPage>
)

const styles = _.create({
  page: {
    paddingLeft: 12
  },
  item: {
    width: _.window.contentWidth * 0.2,
    height: _.window.contentWidth * 0.2,
    paddingHorizontal: _.xs,
    marginBottom: _.sm
  }
})
