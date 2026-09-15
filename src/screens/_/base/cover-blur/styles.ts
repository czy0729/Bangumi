/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 00:00:00
 */
import { _ } from '@stores'

/**
 * 高度由调用方按各卡自身尺寸注入
 * 层级: 兜底 / 色场 1 → 氛围 2 → 黑罩 3 → 文案 4
 * */
export const styles = _.create({
  // 兜底: 无封面或缩略图加载失败时使用的纯黑渐变
  linear: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: 0,
    left: 0,
    marginBottom: -0.5
  },
  // 色场: 裁剪出卡片底部区域
  // marginBottom: 卡片高度是小数(宽度 × 比例), 而色场高度取整, 安卓布局会把 bottom: 0 吸附到整像素,
  // 于是卡片最底部留出半像素缝、露出底下清晰封面; 与另外三层一样向下溢出半像素盖住
  blur: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: 0,
    left: 0,
    marginBottom: -0.5,
    overflow: 'hidden'
  },
  blurMask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  blurFill: {
    width: '100%',
    height: '100%'
  },
  // 尺寸与封面一致, 底部对齐, 溢出部分被 blur 容器裁掉
  blurImage: {
    position: 'absolute',
    left: 0,
    bottom: 0
  },
  // 氛围层: 比色场更高更轻, 抹掉色场与清晰封面之间的起止线
  ambient: {
    position: 'absolute',
    zIndex: 2,
    right: 0,
    bottom: 0,
    left: 0,
    marginBottom: -0.5
  },
  // 文字黑罩
  scrim: {
    position: 'absolute',
    zIndex: 3,
    right: 0,
    bottom: 0,
    left: 0,
    marginBottom: -0.5
  }
})
