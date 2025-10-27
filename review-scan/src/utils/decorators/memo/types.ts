/*
 * @Author: czy0729
 * @Date: 2024-01-05 16:33:20
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-05 16:33:20
 */
export type CustemCompareFn<P = Record<string, unknown>> = (
  targetProps?: P,
  prevProps?: P,
  nextProps?: P
) => boolean | object
