/*
 * @Author: czy0729
 * @Date: 2025-09-12 18:48:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-12 18:48:40
 */
import { Dimensions } from 'react-native'

const styleGuide = {
  spacing: 8,
  dimensionWidth: Dimensions.get('screen').width,
  dimensionHeight: Dimensions.get('screen').height,
  palette: {
    primary: '#0072ff',
    secondary: '#e2e2e2',
    common: {
      white: '#fff',
      black: '#000'
    }
  },
  typography: {
    body: {
      fontSize: 17,
      lineHeight: 20
    },
    callout: {
      fontSize: 16,
      lineHeight: 20
    },
    callout2: {
      fontSize: 14,
      lineHeight: 18
    }
  }
}

export default styleGuide
