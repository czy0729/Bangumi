/*
 * @Author: czy0729
 * @Date: 2026-09-06 16:41:54
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-06 16:41:54
 *
 * 开发调试时用配置
 */

/** 是否开发模式 */
export const DEV = __DEV__ || window?.CONFIG_TYPE === 'DEVELOPMENT'

/** rerender 观察目标 ('.' 通配任意字符) */
const rerenderShow = 'ZZZ.'
const rerenderNotShow: string[] = []

/** 观察组件 rerender 用 (开发用) */
export const RERENDER_SHOW = new RegExp(rerenderShow.replace(/\./g, '\\.')) // /Rakuen\.(.+?)\.Main/

/** 屏蔽观察组件 rerender 用 (开发用) */
export const RERENDER_NOT_SHOW = rerenderNotShow

/** 打印组件 rerender 值变化 (开发用) */
export const RERENDER_SHOW_DIFF = false

/** 打印懒加载组件参数 (开发用) */
export const INVIEW_SHOW = false

/** 显示调试菜单按钮 (安卓、开发用) */
export const ANDROID_DEV_MENU = true

/** 是否不显示图片 (开发调试用, 当前恒为 false) */
export const TEXT_ONLY = DEV ? !DEV : false
