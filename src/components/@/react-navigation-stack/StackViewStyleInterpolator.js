import { I18nManager } from 'react-native'

function getSceneIndicesForInterpolationInputRange(props) {
  const scene = props.scene
  const scenes = props.scenes
  const index = scene.index
  const lastSceneIndexInScenes = scenes.length - 1
  const isBack = !scenes[lastSceneIndexInScenes].isActive
  if (isBack) {
    const currentSceneIndexInScenes = scenes.findIndex(item => item === scene)
    const targetSceneIndexInScenes = scenes.findIndex(item => item.isActive)
    const targetSceneIndex = scenes[targetSceneIndexInScenes].index
    const lastSceneIndex = scenes[lastSceneIndexInScenes].index
    if (
      index !== targetSceneIndex &&
      currentSceneIndexInScenes === lastSceneIndexInScenes
    ) {
      return { first: Math.min(targetSceneIndex, index - 1), last: index + 1 }
    }
    if (
      index === targetSceneIndex &&
      currentSceneIndexInScenes === targetSceneIndexInScenes
    ) {
      return { first: index - 1, last: Math.max(lastSceneIndex, index + 1) }
    }
    if (
      index === targetSceneIndex ||
      currentSceneIndexInScenes > targetSceneIndexInScenes
    ) {
      return null
    }
    return { first: index - 1, last: index + 1 }
  }
  return { first: index - 1, last: index + 1 }
}

const EPS = 1e-5
function forInitial(props) {
  const navigation = props.navigation
  const scene = props.scene
  const focused = navigation.state.index === scene.index
  const opacity = focused ? 1 : 0
  const translate = focused ? 0 : 1000000
  return {
    opacity,
    transform: [{ translateX: translate }, { translateY: translate }]
  }
}

function forHorizontal(props) {
  const layout = props.layout
  const position = props.position
  const scene = props.scene
  if (!layout.isMeasured) return forInitial(props)

  const interpolate = getSceneIndicesForInterpolationInputRange(props)
  if (!interpolate) return { opacity: 0 }

  const first = interpolate.first
  const last = interpolate.last
  const index = scene.index
  const width = layout.initWidth
  const translateX = position.interpolate({
    inputRange: [first, index, last],
    outputRange: I18nManager.isRTL
      ? [-width, 0, width * 0.3]
      : [width, 0, width * -0.3],
    extrapolate: 'clamp'
  })
  const shadowOpacity = props.shadowEnabled
    ? position.interpolate({
        inputRange: [first, index, last],
        outputRange: [0, 0.7, 0],
        extrapolate: 'clamp'
      })
    : null
  const overlayOpacity = props.cardOverlayEnabled
    ? position.interpolate({
        inputRange: [index, last - 0.5, last, last + EPS],
        outputRange: [0, 0.07, 0.07, 0],
        extrapolate: 'clamp'
      })
    : null
  return {
    transform: [{ translateX }],
    overlayOpacity,
    shadowOpacity
  }
}

function forHorizontalWithoutStyles(props) {
  const layout = props.layout
  const position = props.position
  const scene = props.scene
  if (!layout.isMeasured) return forInitial(props)

  const interpolate = getSceneIndicesForInterpolationInputRange(props)
  if (!interpolate) return { opacity: 0 }

  const first = interpolate.first
  const last = interpolate.last
  const index = scene.index
  const width = layout.initWidth
  const translateX = position.interpolate({
    inputRange: [first, index, last],
    outputRange: I18nManager.isRTL
      ? [-width, 0, width * 0.3]
      : [width, 0, width * -0.3],
    extrapolate: 'clamp'
  })
  return {
    transform: [{ translateX }]
  }
}

function forVertical(props) {
  const layout = props.layout
  const position = props.position
  const scene = props.scene
  if (!layout.isMeasured) {
    return forInitial(props)
  }
  const interpolate = getSceneIndicesForInterpolationInputRange(props)
  if (!interpolate) return { opacity: 0 }
  const first = interpolate.first
  const last = interpolate.last
  const index = scene.index
  const height = layout.initHeight
  const translateY = position.interpolate({
    inputRange: [first, index, last],
    outputRange: [height, 0, 0],
    extrapolate: 'clamp'
  })
  return { transform: [{ translateY }] }
}

function forFadeFromBottomAndroid(props) {
  const layout = props.layout
  const position = props.position
  const scene = props.scene
  if (!layout.isMeasured) {
    return forInitial(props)
  }
  const interpolate = getSceneIndicesForInterpolationInputRange(props)
  if (!interpolate) return { opacity: 0 }
  const first = interpolate.first
  const last = interpolate.last
  const index = scene.index
  const opacity = position.interpolate({
    inputRange: [first, first + 0.5, first + 0.9, index, last - 1e-5, last],
    outputRange: [0, 0.25, 0.7, 1, 1, 0],
    extrapolate: 'clamp'
  })
  const height = layout.initHeight
  const maxTranslation = height * 0.08
  const translateY = position.interpolate({
    inputRange: [first, index, last],
    outputRange: [maxTranslation, 0, 0],
    extrapolate: 'clamp'
  })
  return { opacity, transform: [{ translateY }] }
}

function forFadeToBottomAndroid(props) {
  const layout = props.layout
  const position = props.position
  const scene = props.scene
  if (!layout.isMeasured) {
    return forInitial(props)
  }
  const interpolate = getSceneIndicesForInterpolationInputRange(props)
  if (!interpolate) return { opacity: 0 }
  const first = interpolate.first
  const last = interpolate.last
  const index = scene.index
  const inputRange = [first, index, last]
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
    extrapolate: 'clamp'
  })
  const height = layout.initHeight
  const maxTranslation = height * 0.08
  const translateY = position.interpolate({
    inputRange,
    outputRange: [maxTranslation, 0, 0],
    extrapolate: 'clamp'
  })
  return { opacity, transform: [{ translateY }] }
}

function forFade(props) {
  const layout = props.layout
  const position = props.position
  const scene = props.scene
  if (!layout.isMeasured) {
    return forInitial(props)
  }
  const interpolate = getSceneIndicesForInterpolationInputRange(props)
  if (!interpolate) return { opacity: 0 }
  const first = interpolate.first
  const last = interpolate.last
  const index = scene.index
  const opacity = position.interpolate({
    inputRange: [first, index, last],
    outputRange: [0, 1, 1],
    extrapolate: 'clamp'
  })
  return { opacity }
}

function forNoAnimation() {
  return {}
}

export default {
  forHorizontal,
  forHorizontalWithoutStyles,
  forVertical,
  forFadeFromBottomAndroid,
  forFadeToBottomAndroid,
  forFade,
  forNoAnimation
}
