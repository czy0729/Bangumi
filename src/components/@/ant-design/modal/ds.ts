/*
 * @Author: czy0729
 * @Date: 2026-07-14 18:03:35
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-07-14 18:03:35
 */
export const DEFAULT_PROPS = {
  styles: {},
  style: undefined,
  bodyStyle: undefined,
  animateAppear: true,
  animationType: 'fade' as const,
  closable: false,
  footer: [],
  maskClosable: false,
  onClose: () => {},
  onAnimationEnd: () => {},
  operation: false,
  popup: false,
  title: '' as any,
  transparent: false,
  visible: false,
  focus: false,
  children: null
}
