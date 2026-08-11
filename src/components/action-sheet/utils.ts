/*
 * @Author: czy0729
 * @Date: 2026-08-12 07:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-12 07:00:00
 */
/** 下拉时是否显示"松手收起"提示: 从顶部开始且向下拖超过阈值 */
export function shouldShowDragHint(dragStartY: number, dragDistance: number, threshold: number): boolean {
  return dragStartY <= 0 && dragDistance < 0 && -dragDistance > threshold
}

/** 结束拖动时是否触发收起: 仍处于顶部且下拉超过阈值 */
export function shouldCloseOnDragEnd(scrollY: number, dragDistance: number, threshold: number): boolean {
  return scrollY <= 0 && dragDistance < -threshold
}
