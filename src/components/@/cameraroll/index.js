/*
 * @Author: czy0729
 * @Date: 2021-11-09 14:53:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-09 21:08:40
 */
import { IOS } from '@constants'

let CameraRoll
if (IOS) {
  CameraRoll = {}
} else {
  CameraRoll = require('@react-native-community/cameraroll').default
}

export default CameraRoll
