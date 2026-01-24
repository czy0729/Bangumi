/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-25 07:43:42
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { _, rakuenStore } from '@stores'
import { fixedRemoteImageUrl, getStorage, open, setStorage, stl } from '@utils'
import hash from '@utils/thirdParty/hash'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Image } from '../../image'
import { Text } from '../../text'
import { Touchable } from '../../touchable'
import { getSize } from './utils'
import { memoStyles } from './styles'

import type { Props, ToggleImageCache } from './types'

function ToggleImage(props: Props) {
  const { show: defaultShow, src: propSrc, autoSize: propAutoSize } = props

  const [show, setShow] = useState(Boolean(defaultShow))
  const [loaded, setLoaded] = useState(false)
  const [size, setSize] = useState<number | string>('')

  const [touched, setTouched] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  const src = useMemo(() => {
    if (typeof propSrc !== 'string') return propSrc
    return propSrc.replace(/ /g, '%20')
  }, [propSrc])

  const storageKey = useMemo(() => {
    if (typeof src !== 'string') return ''
    return `toggle_image_v1_${hash(src)}`
  }, [src])

  const isRemote = typeof src === 'string'

  const isIcon = useMemo(() => {
    if (typeof src !== 'string') return false
    if (src.includes('https://static.saraba1st.com/image/smiley/')) return true
    if (typeof size === 'number' && size <= 2) return true
    return false
  }, [src, size])

  const ext = useMemo(() => {
    if (!isRemote) return ''
    if ((src as string).includes('.jpg')) return 'jpg'
    if ((src as string).includes('.png')) return 'png'
    if ((src as string).includes('.gif')) return 'gif'
    return 'img'
  }, [isRemote, src])

  const info = useMemo(() => {
    const text: string[] = []
    if (ext) text.push(ext)

    if (typeof size === 'number' && size === 0) {
      text.push('获取大小失败')
    } else if (size) {
      text.push(`${size}kb`)
    }

    return text.join('·')
  }, [ext, size])

  const autoSize = useMemo(() => {
    if (typeof propAutoSize === 'number' && propAutoSize) {
      return propAutoSize - 1
    }
    return undefined
  }, [propAutoSize])

  const handleToggleShow = useCallback(() => {
    setShow(prev => {
      const next = !prev

      if (storageKey) {
        setTouched(true)
        setStorage(storageKey, {
          touched: true,
          show: next
        } as ToggleImageCache)
      }

      return next
    })
  }, [storageKey])

  const handleLoadEnd = useCallback(() => {
    setLoaded(true)
  }, [])

  const handleLongPress = useCallback(() => {
    if (typeof src === 'string') open(src)
  }, [src])

  /** ① 先恢复用户记忆 */
  useEffect(() => {
    if (!storageKey) {
      setHydrated(true)
      return
    }

    let mounted = true

    ;(async () => {
      const stored = (await getStorage(storageKey)) as ToggleImageCache | null
      if (!mounted) return

      if (stored?.touched) {
        setTouched(true)
        if (typeof stored.show === 'boolean') {
          setShow(stored.show)
        }
      }

      setHydrated(true)
    })()

    return () => {
      mounted = false
    }
  }, [storageKey])

  /** ② 再决定是否自动展开（必须等 hydrated） */
  useEffect(() => {
    if (!hydrated) return

    let mounted = true

    ;(async () => {
      const imageSize = await getSize(propSrc as string)
      if (!mounted) return

      setSize(imageSize || '')
      setLoaded(Boolean(imageSize))

      const limit = Number(rakuenStore.setting.autoLoadImageV2 || 0)
      if (!touched && limit && (limit === 10000 || (imageSize && limit >= imageSize))) {
        setShow(true)
      }
    })()

    return () => {
      mounted = false
    }
  }, [propSrc, hydrated, touched])

  return useObserver(() => {
    const styles = memoStyles()

    if (!isIcon && !show) {
      return (
        <Touchable
          style={stl(styles.image, styles.isLoad)}
          onPress={handleToggleShow}
          onLongPress={handleLongPress}
        >
          <Flex style={styles.placeholder} direction='column' justify='center'>
            <Text size={11} type='sub' bold>
              {info}
            </Text>
            {isRemote && (
              <Text
                style={styles.src}
                size={9}
                lineHeight={10}
                type='sub'
                align='center'
                numberOfLines={2}
              >
                {fixedRemoteImageUrl(src)}
              </Text>
            )}
          </Flex>
        </Touchable>
      )
    }

    return (
      <View
        style={stl(styles.image, {
          maxWidth: autoSize
        })}
      >
        <Flex style={stl(!loaded && styles.isLoad)}>
          <Flex style={styles.loading} justify='center'>
            <ActivityIndicator size='small' color={_.colorIcon} />
          </Flex>

          {show && (
            <View style={styles.remote}>
              <Image
                {...props}
                autoSize={autoSize}
                radius={_.radiusXs}
                withoutFeedback
                imageViewer={typeof src === 'string'}
                imageViewerSrc={typeof src === 'string' ? fixedRemoteImageUrl(src) : undefined}
                onLoadEnd={handleLoadEnd}
                onError={handleLoadEnd}
                onLongPress={handleLongPress}
              />
            </View>
          )}

          <View style={styles.close}>
            <Touchable style={styles.closeTouch} onPress={handleToggleShow}>
              <Flex style={styles.closeIcon} justify='center'>
                <Iconfont size={16} name='md-close' color={_.colorIcon} />
              </Flex>
            </Touchable>
          </View>
        </Flex>
      </View>
    )
  })
}

ToggleImage.displayName = 'ToggleImage'

export default ToggleImage
