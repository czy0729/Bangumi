/*
 * @Author: czy0729
 * @Date: 2023-04-06 11:46:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-06 12:08:34
 */
import React from 'react'
import { _ } from '@stores'
import { StorybookGrid, StorybookPage } from '@components/storybook'
import { Flex } from '@components/flex'
import { Text } from '@components/text'
import { BgmText as Component } from './index'

export default {
  title: 'components/BgmText',
  component: Component
}

export const BgmText = () => (
  <StorybookPage>
    <StorybookGrid space justify='between'>
      {Array(102)
        .fill('')
        .map((item, index) => (
          <Flex key={index + 1} style={styles.item} direction='column' justify='center'>
            <Component index={index + 1} size={18} />
            <Text style={_.mt.xs} size={12} align='center'>
              {index + 1}
            </Text>
          </Flex>
        ))}
    </StorybookGrid>
  </StorybookPage>
)

const styles = _.create({
  item: {
    width: _.window.contentWidth * 0.16,
    height: _.window.contentWidth * 0.16
  }
})
