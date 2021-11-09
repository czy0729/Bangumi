/*
 * @Author: czy0729
 * @Date: 2021-11-09 14:53:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-09 14:54:02
 */
import { IOS } from '@constants'

let CameraRoll
if (IOS) {
  CameraRoll = {}
} else {
  CameraRoll = require('@react-native-community/cameraroll')
}

export default CameraRoll
