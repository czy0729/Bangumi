/* eslint-disable no-unused-expressions */
/*
 * https://github.com/react-native-community/segmented-control/tree/master/js
 *
 * @Author: czy0729
 * @Date: 2020-06-24 16:50:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-24 23:01:14
 */
import * as React from 'react'
import { StyleSheet, Animated, Easing, View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { SegmentedControlTab } from './segmented-control-tab'

/**
 * SegmentedControl
 * iOS 13 Style UISegmentedControl Component for Android and Web
 */
function SegmentedControl({
  style,
  values,
  selectedIndex,
  enabled,
  tintColor,
  fontStyle,
  activeFontStyle,
  backgroundColor,
  onChange,
  onValueChange
}) {
  const [segmentWidth, setSegmentWidth] = React.useState(0)
  const animation = React.useRef(new Animated.Value(0)).current

  const handleChange = (index: number) => {
    // mocks iOS's nativeEvent
    const event: any = {
      nativeEvent: {
        value: values[index],
        selectedSegmentIndex: index
      }
    }
    onChange && onChange(event)
    onValueChange && onValueChange(values[index])
  }

  React.useEffect(() => {
    if (animation && segmentWidth) {
      Animated.timing(animation, {
        toValue: segmentWidth * (selectedIndex || 0),
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      }).start()
    }
  }, [animation, segmentWidth, selectedIndex])

  return (
    <View
      style={[
        styles.default,
        style,
        backgroundColor && { backgroundColor },
        !enabled && styles.disabled
      ]}
      onLayout={({
        nativeEvent: {
          layout: { width }
        }
      }) => {
        const newSegmentWidth = values.length ? width / values.length : 0
        if (newSegmentWidth !== segmentWidth) {
          animation.setValue(newSegmentWidth * (selectedIndex || 0))
          setSegmentWidth(newSegmentWidth)
        }
      }}
    >
      {selectedIndex != null && segmentWidth ? (
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [
                {
                  translateX: animation
                }
              ],
              width: segmentWidth - 2,
              backgroundColor: tintColor || 'white'
            }
          ]}
        />
      ) : null}
      {values &&
        values.map((value, index) => (
          <SegmentedControlTab
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            enabled={enabled}
            selected={selectedIndex === index}
            value={value}
            tintColor={tintColor}
            fontStyle={fontStyle}
            activeFontStyle={activeFontStyle}
            onSelect={() => {
              handleChange(index)
            }}
          />
        ))}
    </View>
  )
}

SegmentedControl.defaultProps = {
  enabled: true,
  fontStyle: {
    fontSize: 14
  }
}

const styles = StyleSheet.create({
  default: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    width: Math.max(parseInt(_.window.contentWidth / 1.88), 168),
    height: 36,
    backgroundColor: '#eee',
    borderRadius: 5
  },
  disabled: {
    opacity: 0.4
  },
  slider: {
    position: 'absolute',
    top: 1,
    bottom: 1,
    right: 1,
    left: 1,
    borderRadius: 5
  }
})

function _SegmentedControl({
  tintColor,
  fontStyle,
  activeFontStyle,
  backgroundColor,
  ...other
}) {
  return (
    <SegmentedControl
      tintColor={_.select(_.colorPlain, _._colorDarkModeLevel2)}
      backgroundColor={_.colorBg}
      {...other}
    />
  )
}

export default observer(_SegmentedControl)
