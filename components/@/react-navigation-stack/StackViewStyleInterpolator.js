/* eslint-disable */
import { I18nManager } from 'react-native'

function getSceneIndicesForInterpolationInputRange(props) {
  var scene = props.scene,
    scenes = props.scenes
  var index = scene.index
  var lastSceneIndexInScenes = scenes.length - 1
  var isBack = !scenes[lastSceneIndexInScenes].isActive
  if (isBack) {
    var currentSceneIndexInScenes = scenes.findIndex(function (item) {
      return item === scene
    })
    var targetSceneIndexInScenes = scenes.findIndex(function (item) {
      return item.isActive
    })
    var targetSceneIndex = scenes[targetSceneIndexInScenes].index
    var lastSceneIndex = scenes[lastSceneIndexInScenes].index
    if (
      index !== targetSceneIndex &&
      currentSceneIndexInScenes === lastSceneIndexInScenes
    ) {
      return { first: Math.min(targetSceneIndex, index - 1), last: index + 1 }
    } else if (
      index === targetSceneIndex &&
      currentSceneIndexInScenes === targetSceneIndexInScenes
    ) {
      return { first: index - 1, last: Math.max(lastSceneIndex, index + 1) }
    } else if (
      index === targetSceneIndex ||
      currentSceneIndexInScenes > targetSceneIndexInScenes
    ) {
      return null
    } else {
      return { first: index - 1, last: index + 1 }
    }
  } else {
    return { first: index - 1, last: index + 1 }
  }
}

var EPS = 1e-5
function forInitial(props) {
  var navigation = props.navigation,
    scene = props.scene
  var focused = navigation.state.index === scene.index
  var opacity = focused ? 1 : 0
  var translate = focused ? 0 : 1000000
  return {
    opacity: opacity,
    transform: [{ translateX: translate }, { translateY: translate }]
  }
}
function forHorizontal(props) {
  var layout = props.layout,
    position = props.position,
    scene = props.scene
  if (!layout.isMeasured) {
    return forInitial(props)
  }
  var interpolate = getSceneIndicesForInterpolationInputRange(props)
  if (!interpolate) return { opacity: 0 }
  var first = interpolate.first,
    last = interpolate.last
  var index = scene.index
  var width = layout.initWidth
  var translateX = position.interpolate({
    inputRange: [first, index, last],
    outputRange: I18nManager.isRTL
      ? [-width, 0, width * 0.3]
      : [width, 0, width * -0.3],
    extrapolate: 'clamp'
  })
  var shadowOpacity = props.shadowEnabled
    ? position.interpolate({
        inputRange: [first, index, last],
        outputRange: [0, 0.7, 0],
        extrapolate: 'clamp'
      })
    : null
  var overlayOpacity = props.cardOverlayEnabled
    ? position.interpolate({
        inputRange: [index, last - 0.5, last, last + EPS],
        outputRange: [0, 0.07, 0.07, 0],
        extrapolate: 'clamp'
      })
    : null
  return {
    transform: [{ translateX: translateX }],
    overlayOpacity: overlayOpacity,
    shadowOpacity: shadowOpacity
  }
}
function forVertical(props) {
  var layout = props.layout,
    position = props.position,
    scene = props.scene
  if (!layout.isMeasured) {
    return forInitial(props)
  }
  var interpolate = getSceneIndicesForInterpolationInputRange(props)
  if (!interpolate) return { opacity: 0 }
  var first = interpolate.first,
    last = interpolate.last
  var index = scene.index
  var height = layout.initHeight
  var translateY = position.interpolate({
    inputRange: [first, index, last],
    outputRange: [height, 0, 0],
    extrapolate: 'clamp'
  })
  return { transform: [{ translateY: translateY }] }
}
function forFadeFromBottomAndroid(props) {
  var layout = props.layout,
    position = props.position,
    scene = props.scene
  if (!layout.isMeasured) {
    return forInitial(props)
  }
  var interpolate = getSceneIndicesForInterpolationInputRange(props)
  if (!interpolate) return { opacity: 0 }
  var first = interpolate.first,
    last = interpolate.last
  var index = scene.index
  var opacity = position.interpolate({
    inputRange: [first, first + 0.5, first + 0.9, index, last - 1e-5, last],
    outputRange: [0, 0.25, 0.7, 1, 1, 0],
    extrapolate: 'clamp'
  })
  var height = layout.initHeight
  var maxTranslation = height * 0.08
  var translateY = position.interpolate({
    inputRange: [first, index, last],
    outputRange: [maxTranslation, 0, 0],
    extrapolate: 'clamp'
  })
  return { opacity: opacity, transform: [{ translateY: translateY }] }
}
function forFadeToBottomAndroid(props) {
  var layout = props.layout,
    position = props.position,
    scene = props.scene
  if (!layout.isMeasured) {
    return forInitial(props)
  }
  var interpolate = getSceneIndicesForInterpolationInputRange(props)
  if (!interpolate) return { opacity: 0 }
  var first = interpolate.first,
    last = interpolate.last
  var index = scene.index
  var inputRange = [first, index, last]
  var opacity = position.interpolate({
    inputRange: inputRange,
    outputRange: [0, 1, 1],
    extrapolate: 'clamp'
  })
  var height = layout.initHeight
  var maxTranslation = height * 0.08
  var translateY = position.interpolate({
    inputRange: inputRange,
    outputRange: [maxTranslation, 0, 0],
    extrapolate: 'clamp'
  })
  return { opacity: opacity, transform: [{ translateY: translateY }] }
}
function forFade(props) {
  var layout = props.layout,
    position = props.position,
    scene = props.scene
  if (!layout.isMeasured) {
    return forInitial(props)
  }
  var interpolate = getSceneIndicesForInterpolationInputRange(props)
  if (!interpolate) return { opacity: 0 }
  var first = interpolate.first,
    last = interpolate.last
  var index = scene.index
  var opacity = position.interpolate({
    inputRange: [first, index, last],
    outputRange: [0, 1, 1],
    extrapolate: 'clamp'
  })
  return { opacity: opacity }
}
function forNoAnimation() {
  return {}
}
export default {
  forHorizontal: forHorizontal,
  forVertical: forVertical,
  forFadeFromBottomAndroid: forFadeFromBottomAndroid,
  forFadeToBottomAndroid: forFadeToBottomAndroid,
  forFade: forFade,
  forNoAnimation: forNoAnimation
}
