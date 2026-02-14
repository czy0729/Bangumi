/*
 * @Author: czy0729
 * @Date: 2025-01-27 15:33:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-14 18:25:37
 */
import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import Svg, { Circle, Defs, Pattern, Rect } from 'react-native-svg'
import { LinearGradient } from 'expo-linear-gradient'
import { Flex, Text, Touchable } from '@components'
import { userStore } from '@stores'
import { useFocusEffect, useNavigation, useObserver } from '@utils/hooks'
import { COMPONENT, URI } from './ds'
import { memoStyles } from './styles'

const messages = [
  'open /award/2025',
  'cat /var/log/award_2025.log',
  'ls channels',
  'whoami',
  'rank anime',
  'stats user',
  'rm -rf /'
]

function Award2025() {
  const navigation = useNavigation(COMPONENT)

  const [displayText, setDisplayText] = useState('')
  const textRef = useRef('')
  const idxRef = useRef(0)
  const holdRef = useRef(0)
  const lastTextRef = useRef('')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const cursorOpacity = useRef(new Animated.Value(1)).current

  // cursor blink
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true
        })
      ])
    ).start()
  }, [cursorOpacity])

  function nextText() {
    let candidate = messages[Math.floor(Math.random() * messages.length)]
    if (messages.length > 1 && candidate === lastTextRef.current) {
      const i = messages.indexOf(candidate)
      candidate = messages[(i + 1) % messages.length]
    }
    lastTextRef.current = candidate
    textRef.current = candidate
  }

  function tick() {
    const text = textRef.current

    if (idxRef.current < text.length) {
      idxRef.current += 1
      setDisplayText(text.slice(0, idxRef.current))
      timerRef.current = setTimeout(tick, 90)
      return
    }

    holdRef.current += 1
    if (holdRef.current < 25) {
      timerRef.current = setTimeout(tick, 200)
      return
    }

    idxRef.current = 0
    holdRef.current = 0
    setDisplayText('')
    nextText()
    timerRef.current = setTimeout(tick, 220)
  }

  useFocusEffect(
    React.useCallback(() => {
      // 页面聚焦时启动动画
      nextText()
      tick()

      return () => {
        // 页面离开时停止定时器
        if (timerRef.current) {
          clearTimeout(timerRef.current)
          timerRef.current = null
        }
        // 重置状态
        idxRef.current = 0
        holdRef.current = 0
        setDisplayText('')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  )

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <View style={styles.container}>
        <Touchable
          animate
          onPress={() => {
            navigation.push('Award', { uri: URI })
          }}
        >
          <View style={styles.item}>
            <LinearGradient style={styles.background} colors={['#14131a', '#0f1318', '#0b1115']} />
            <View style={styles.innerBorder} />

            <Flex.Item>
              <LinearGradient
                style={styles.titlebar}
                colors={['rgba(84,36,49,0.92)', 'rgba(61,27,36,0.75)']}
              >
                <Text overrideStyle={styles.title}>^_ // Bangumi 2025</Text>
              </LinearGradient>

              <View style={styles.console}>
                <LinearGradient
                  style={styles.consoleBackground}
                  colors={['rgba(8,18,13,0.3)', 'rgba(5,12,9,0.42)']}
                />

                <Svg style={styles.consoleBackground} pointerEvents='none'>
                  <Defs>
                    <Pattern
                      id='dot'
                      patternUnits='userSpaceOnUse'
                      patternContentUnits='userSpaceOnUse'
                      width='16'
                      height='16'
                    >
                      <Circle cx='6' cy='6' r='1' fill='rgba(240,145,153,0.2)' />
                    </Pattern>
                  </Defs>
                  <Rect width='100%' height='100%' fill='url(#dot)' />
                </Svg>

                <Text overrideStyle={[styles.line, styles.muted]}>
                  $ boot award_2025 --mode console
                </Text>
                <Text overrideStyle={[styles.line, styles.success]}>SYSTEM READY.</Text>
                <Flex style={styles.commandRow}>
                  <Text
                    overrideStyle={styles.prompt}
                    shrink
                    numberOfLines={1}
                    ellipsizeMode='middle'
                  >
                    {userStore.myId || 'guest'}@bgm2025
                  </Text>
                  <Text overrideStyle={styles.prompt}>:~$</Text>
                  <Text overrideStyle={styles.command}>{displayText}</Text>
                  <Animated.View style={[styles.cursor, { opacity: cursorOpacity }]} />
                </Flex>
              </View>
            </Flex.Item>

            <LinearGradient
              style={StyleSheet.absoluteFill}
              pointerEvents='none'
              colors={['rgba(255,255,255,0.03)', 'rgba(0,0,0,0.08)']}
            />
          </View>
        </Touchable>
      </View>
    )
  })
}

export default Award2025
