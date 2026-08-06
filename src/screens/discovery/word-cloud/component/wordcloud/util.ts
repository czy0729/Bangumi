/*
 * @Author: czy0729
 * @Date: 2026-08-06 08:54:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-06 09:02:20
 */
export const spaceTypes = {
  LB: 1, //Left Bottom
  LT: 2, //Left Top
  RT: 3, //Right Top
  RB: 4, //Right Bottom
  HR: 1, //Horizontal
  VR: 2 //Vertical
} as const

export type SpaceType = (typeof spaceTypes)[keyof typeof spaceTypes]

export function getRandomColor(): string {
  const letters = '0123456789ABCDEF'.split('')
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)]
  }
  return color
}
