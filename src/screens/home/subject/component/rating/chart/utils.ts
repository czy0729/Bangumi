/*
 * @Author: czy0729
 * @Date: 2022-07-06 23:18:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-15 01:36:02
 */
const min = 0.04

/** 比例柱子高度 */
export function getHeight(total: string | number, current: number) {
  if (!total || !current) return 0
  let percent = current / Number(total)
  if (percent > 0 && percent < min) percent = min
  return `${Math.min(percent * 1.44 || min, 0.66) * 100}%`
}

/** 计算标准差 */
export function getDeviation(total: string | number, count: any, score: string | number) {
  if (total == 0) return 0

  const scores = Object.values(count).reverse()
  return calculateSD(scores, score, total)
}

/** 计算标准差 */
function calculateSD(scores: any[], score: string | number, n: string | number) {
  let sd = 0
  scores.forEach((item, index) => {
    if (item === 0) return
    sd += (10 - index - Number(score)) * (10 - index - Number(score)) * item
  })
  return Math.sqrt(sd / Number(n))
}

/** 计算争议度 */
export function getDispute(deviation: number) {
  if (deviation === 0) return '-'
  if (deviation < 1) return '异口同声'
  if (deviation < 1.15) return '基本一致'
  if (deviation < 1.3) return '略有分歧'
  if (deviation < 1.45) return '莫衷一是'
  if (deviation < 1.6) return '各执一词'
  if (deviation < 1.75) return '你死我活'
  return '厨黑大战'
}
