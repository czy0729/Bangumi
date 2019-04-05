/*
 * fork https://github.com/879479119/react-native-shadow
 * @Author: czy0729
 * @Date: 2019-04-01 07:54:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-01 08:01:54
 */
import React from 'react'
import { View } from 'react-native'
import { Svg } from 'expo'

const { Rect, Defs, LinearGradient, Stop, RadialGradient, Path } = Svg

function colorRgb(color) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  let sColor = color.toLowerCase()
  const rgb = []
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    for (let i = 1; i < 7; i += 2) {
      rgb.push(parseInt(`0x${sColor.slice(i, i + 2)}`))
    }
    return rgb
  }
  throw Error('Invalid Color!')
}

const BoxShadow = props => {
  // get the shadow settings and give them default values
  const {
    setting: {
      width = 0,
      height = 0,
      color = '#000',
      border = 0,
      radius = 0,
      opacity = 1,
      x = 0,
      y = 0,
      style = {}
    },
    children
  } = props

  // define the lengths
  const lineWidth = border
  const rectWidth = width - radius * 2
  const rectHeight = height - radius * 2

  // update 2017-03-04
  // format the color
  const rgb = colorRgb(color)

  // the same parts for gradients
  const linear = key => [
    <Stop
      offset='0'
      stopColor={color}
      stopOpacity={opacity}
      key={`${key}Linear0`}
    />,
    <Stop offset='1' stopColor={color} stopOpacity='0' key={`${key}Linear1`} />
  ]
  const radial = key => [
    <Stop
      offset='0'
      stopColor={color}
      stopOpacity={opacity}
      key={`${key}Radial0`}
    />,
    <Stop
      offset={(radius / (lineWidth + radius)).toString()}
      stopColor={color}
      stopOpacity={opacity}
      key={`${key}Radial1`}
    />,
    <Stop offset='1' stopColor={color} stopOpacity='0' key={`${key}Radial2`} />
  ]

  const outerWidth = lineWidth + radius

  // return a view ,whose background is a svg picture
  return (
    <View style={[{ position: 'relative', width, height }, style]}>
      <Svg
        height={height + lineWidth * 2 + radius * 2}
        width={width + lineWidth * 2 + radius * 2}
        style={{
          position: 'absolute',
          top: y - lineWidth,
          left: x - lineWidth
        }}
      >
        <Defs>
          <LinearGradient id='top' x1='0%' x2='0%' y1='100%' y2='0%'>
            {linear('BoxTop')}
          </LinearGradient>
          <LinearGradient id='bottom' x1='0%' x2='0%' y1='0%' y2='100%'>
            {linear('BoxBottom')}
          </LinearGradient>
          <LinearGradient id='left' x1='100%' y1='0%' x2='0%' y2='0%'>
            {linear('BoxLeft')}
          </LinearGradient>
          <LinearGradient id='right' x1='0%' y1='0%' x2='100%' y2='0%'>
            {linear('BoxRight')}
          </LinearGradient>

          <RadialGradient
            id='border-left-top'
            r='100%'
            cx='100%'
            cy='100%'
            fx='100%'
            fy='100%'
          >
            {radial('BoxLeftTop')}
          </RadialGradient>
          <RadialGradient
            id='border-left-bottom'
            r='100%'
            cx='100%'
            cy='0%'
            fx='100%'
            fy='0%'
          >
            {radial('BoxLeftBottom')}
          </RadialGradient>
          <RadialGradient
            id='border-right-top'
            r='100%'
            cx='0%'
            cy='100%'
            fx='0%'
            fy='100%'
          >
            {radial('BoxRightTop')}
          </RadialGradient>
          <RadialGradient
            id='border-right-bottom'
            r='100%'
            cx='0%'
            cy='0%'
            fx='0%'
            fy='0%'
          >
            {radial('BoxRightBottom')}
          </RadialGradient>
        </Defs>

        <Path
          d={`M 0 ${outerWidth},Q 0 0 ${outerWidth} 0,v ${lineWidth},q ${-radius} 0 ${-radius} ${radius},h ${-lineWidth},z`}
          fill='url(#border-left-top)'
        />
        <Path
          d={`M ${rectWidth +
            lineWidth +
            radius} 0,q ${outerWidth} 0 ${outerWidth} ${outerWidth},h ${-lineWidth},q 0 ${-radius} ${-radius} ${-radius},v ${-lineWidth},z`}
          fill='url(#border-right-top)'
        />
        <Path
          d={`M ${rectWidth + lineWidth + 2 * radius} ${rectHeight +
            lineWidth +
            radius},h ${lineWidth},q 0 ${outerWidth} -${outerWidth} ${outerWidth},v ${-lineWidth},q ${radius} 0 ${radius} ${-radius},z`}
          fill='url(#border-right-bottom)'
        />
        <Path
          d={`M 0 ${rectHeight +
            lineWidth +
            radius},q 0 ${outerWidth} ${outerWidth} ${outerWidth},v ${-lineWidth},q ${-radius} 0 ${-radius} ${-radius},h ${-lineWidth},z`}
          fill='url(#border-left-bottom)'
        />

        <Rect
          x={outerWidth}
          y='0'
          width={rectWidth}
          height={lineWidth}
          fill='url(#top)'
        />
        <Rect
          x='0'
          y={outerWidth}
          width={lineWidth}
          height={rectHeight}
          fill='url(#left)'
        />
        <Rect
          x={rectWidth + lineWidth + 2 * radius}
          y={outerWidth}
          width={lineWidth}
          height={rectHeight}
          fill='url(#right)'
        />
        <Rect
          x={outerWidth}
          y={rectHeight + lineWidth + 2 * radius}
          width={rectWidth}
          height={lineWidth}
          fill='url(#bottom)'
        />

        <Path
          // eslint-disable-next-line max-len
          d={`M ${outerWidth} ${lineWidth},h ${rectWidth},q ${radius} 0 ${radius} ${radius},v ${rectHeight},q 0 ${radius} -${radius} ${radius},h -${rectWidth},q -${radius} 0 -${radius} -${radius},v -${rectHeight},q 0 -${radius} ${radius} -${radius}`}
          fill={`rgba(${rgb[0]},${rgb[1]},${rgb[2]},${opacity || 1})`}
        />
      </Svg>
      {children}
    </View>
  )
}

export default BoxShadow
