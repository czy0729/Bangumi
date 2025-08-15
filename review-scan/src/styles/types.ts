/*
 * @Author: czy0729
 * @Date: 2022-05-24 16:57:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-24 16:57:55
 */
export type ColorRaw<ColorRGB extends string> =
  ColorRGB extends `rgb(${infer R}, ${infer G}, ${infer B})` ? [R, G, B] : ColorRGB
