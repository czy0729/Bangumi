/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 23:16:15
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, rakuenStore } from '@stores'
import { fixedRemoteImageUrl, getStorage, open, setStorage, stl } from '@utils'
import hash from '@utils/thirdParty/hash'
import { CircularProgress } from '../../circular-progress'
import { getProgressPercent } from '../../circular-progress/utils'
import { Flex, flexStyle } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Image } from '../../image'
import { Text } from '../../text'
import { Touchable } from '../../touchable'
import { getSize, stepPercent } from './utils'
import { memoStyles } from './styles'

import type { ImageRetryInfo } from '../../image'
import type { Props, ToggleImageCache } from './types'

/** 失败后的最大重试次数 (只作为传给 Image 的 retryLimit, 是否耗尽由 Image 的 onError 透出) */
const RETRY_LIMIT = 2

function ToggleImage(props: Props) {
  const { show: defaultShow, src: propSrc, autoSize: propAutoSize } = props

  const [show, setShow] = useState(Boolean(defaultShow))

  /** 体积是否已知 (由 getSize 的 HEAD 探测结果置位, 只服务于占位尺寸与 kb 文案) */
  const [loaded, setLoaded] = useState(false)
  const [size, setSize] = useState<number | string>('')

  /**
   * 图片本体是否已完成加载或已失败 (由 Image 的 onLoadEnd / onError 置位)
   * 注意不要用 loaded 控制圆环: loaded 只表示「体积已知」, HEAD 成功的地址 (如第三方图床)
   * 在展开瞬间就会被置 true, 用它当条件会导致圆环从头到尾不挂载
   * */
  const [imageLoaded, setImageLoaded] = useState(false)

  /** 下载进度 (null = 拿不到精确进度, 圆环走不确定态) */
  const [percent, setPercent] = useState<number | null>(null)

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
      return Math.floor(propAutoSize - 10)
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
    setImageLoaded(true)
  }, [])

  /**
   * 图片加载失败: 用 Image 透出的「是否还会重试」决定圆环去留 (不再自己复刻重试计数)
   *  - 失败即把进度清回不确定态, 否则圆环会静止在失败前的旧百分比 (空弧/半环更迷惑)
   *  - 仍有重试机会时保留圆环 (退避期间其下是 Image 既有的错误图标, 圆环在其上继续转)
   *  - 重试耗尽才卸载, 让错误图标稳定显示
   * */
  const handleError = useCallback((_evt?: unknown, retry?: ImageRetryInfo) => {
    setLoaded(true)
    setPercent(null)
    if (!retry?.willRetry) setImageLoaded(true)
  }, [])

  /** 图片引擎的下载进度: 整数节流 + 步进吸附, 相同百分比不触发重渲染 */
  const handleProgress = useCallback((event: { loaded: number; total: number }) => {
    const next = stepPercent(getProgressPercent(event.loaded, event.total))
    setPercent(prev => (prev === next ? prev : next))
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

  /**
   * 换图 / 收起后重新展开时重置: 清掉上一次的百分比与「已完成」标记
   * (Image 会重新挂载并重新加载, 不重置会导致圆环不再出现或沿用旧进度)
   * */
  useEffect(() => {
    setPercent(null)
    setImageLoaded(false)
  }, [src, show])

  const styles = memoStyles()

  if (!isIcon && !show) {
    return (
      <Touchable
        style={stl(
          flexStyle({ direction: 'column', justify: 'center' }),
          styles.image,
          styles.isLoad,
          styles.placeholder
        )}
        onPress={handleToggleShow}
        onLongPress={handleLongPress}
      >
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
        {/**
         * 图片加载完成/失败后整体卸载: 圆环在持续旋转 (且层级已高于图片), 留着等于白跑动画, 圆角处也可能透出
         * 条件必须带上 show: 表情图 (isIcon) 不会走上面的收起分支, 收起后 Image 不挂载, 否则会留下永久空转的环
         */}
        {show && !imageLoaded && (
          // 层级在图片之上 (styles.loading), 故用 pointerEvents='none' 保证不拦截图片的点击/长按/查看大图
          <Flex style={styles.loading} justify='center' pointerEvents='none'>
            {/* 尺寸按帖子图片位收小 (组件默认 40 偏大); 拿不到引擎进度时自动进入空环旋转态 */}
            <CircularProgress
              percent={percent}
              color={_.colorSub}
              size={30}
              strokeWidth={2}
              textSize={9}
            />
          </Flex>
        )}

        {show && (
          <View style={styles.remote}>
            {/**
             * 这里刻意不接 Squircle: autoSize 模式下高度由图片加载完成后运行时测量,
             * 渲染期拿不到确定尺寸, 而 iOS 的 Squircle 要按尺寸算遮罩轨迹, 传错高度会把曲线拉变形
             * (安卓走原生 outline 裁剪、取视图实际尺寸, 不受影响)
             */}
            <Image
              {...props}
              autoSize={autoSize}
              radius={_.radiusXs}
              withoutFeedback
              imageViewer={typeof src === 'string'}
              imageViewerSrc={typeof src === 'string' ? fixedRemoteImageUrl(src) : undefined}
              onLoadEnd={handleLoadEnd}
              onError={handleError}
              onProgress={handleProgress}
              onLongPress={handleLongPress}
              // 帖子图片多为第三方图床 (失效/防盗链时无限退避只会白耗流量), 失败最多重试 RETRY_LIMIT 次
              retryLimit={RETRY_LIMIT}
            />
          </View>
        )}

        <View style={styles.close}>
          <Touchable style={styles.closeTouch} onPress={handleToggleShow}>
            <View style={stl(flexStyle({ justify: 'center' }), styles.closeIcon)}>
              <Iconfont size={16} name='md-close' color={_.colorIcon} />
            </View>
          </Touchable>
        </View>
      </Flex>
    </View>
  )
}

ToggleImage.displayName = 'ToggleImage'

export default observer(ToggleImage)
