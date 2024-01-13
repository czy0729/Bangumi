/*
 * @Author: czy0729
 * @Date: 2024-01-13 22:05:53
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-13 22:05:53
 */
import { extractArgTypes } from '@storybook/react/dist/modern/client/docs/extractArgTypes'
import { addArgTypesEnhancer, addParameters } from '@storybook/react-native'
import { enhanceArgTypes } from '@storybook/docs-tools'

addArgTypesEnhancer(enhanceArgTypes)
addParameters({
  docs: {
    extractArgTypes
  }
})
