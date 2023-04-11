/*
 * @Author: czy0729
 * @Date: 2023-04-05 15:50:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 12:57:56
 */
import React from 'react'
import AppIcons from '@components/@/vector-icons/vendor/react-native-vector-icons/glyphmaps/AntDesign.json'
import IoniconsIcons from '@components/@/vector-icons/vendor/react-native-vector-icons/glyphmaps/Ionicons.json'
import MaterialIcons from '@components/@/vector-icons/vendor/react-native-vector-icons/glyphmaps/MaterialIcons.json'
import { StorybookGrid, StorybookPage } from '@components/storybook'
import { Flex } from '@components/flex'
import { Text } from '@components/text'
import { _ } from '@stores'
import { Iconfont } from './index'

export default {
  title: 'components/Iconfont',
  component: Iconfont
}

export const App = () => (
  <StorybookPage>
    <StorybookGrid>
      {Object.keys(AppIcons).map(item => {
        const name = `${item}`
        return (
          <Flex key={name} style={styles.item} direction='column' justify='center'>
            {/* @ts-expect-error */}
            <Iconfont name={name} />
            <Text style={styles.text} size={12} align='center'>
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
    <StorybookGrid>
      {Object.keys(MaterialIcons).map(item => {
        const name = `md-${item}`
        return (
          <Flex key={name} style={styles.item} direction='column' justify='center'>
            {/* @ts-expect-error */}
            <Iconfont name={name} />
            <Text style={styles.text} size={12} align='center'>
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
    <StorybookGrid>
      {Object.keys(IoniconsIcons).map(item => {
        const name = `${item}`
        return (
          <Flex key={name} style={styles.item} direction='column' justify='center'>
            {/* @ts-expect-error */}
            <Iconfont name={name} />
            <Text style={styles.text} size={12} align='center'>
              {name}
            </Text>
          </Flex>
        )
      })}
    </StorybookGrid>
  </StorybookPage>
)

const styles = _.create({
  item: {
    width: (_.window.width - 4) * 0.2,
    height: (_.window.width - 4) * 0.2,
    paddingHorizontal: _.xs,
    marginTop: _.sm
  },
  text: {
    height: 30,
    marginTop: _.sm,
    transform: [
      {
        scale: 10 / 12
      }
    ]
  }
})
