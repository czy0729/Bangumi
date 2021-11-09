/*
 * @Author: czy0729
 * @Date: 2021-11-09 14:45:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-09 21:08:50
 */
import { IOS } from '@constants'

let RNFS
if (IOS) {
  RNFS = {}
} else {
  RNFS = require('react-native-fs').default
}

export default RNFS
