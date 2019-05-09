import glyphMap from './vendor/react-native-vector-icons/glyphmaps/Iconfont.json'
import createIconSet from './createIconSet'

export default createIconSet(
  glyphMap,
  'anticon',
  require('./fonts/Iconfont.ttf')
)
