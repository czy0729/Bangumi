/*
 * @Author: czy0729
 * @Date: 2025-06-02 20:58:08
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-06-02 20:58:08
 */
export function keyExtractor(item: any) {
  return String(item?.userId)
}
