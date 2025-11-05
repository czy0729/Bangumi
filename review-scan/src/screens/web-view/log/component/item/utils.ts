/*
 * @Author: czy0729
 * @Date: 2025-02-22 09:49:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 04:18:49
 */
const V = [
  '8.20 - 2025/04/03',
  '8.19 - 2025/03/08',
  '8.18 - 2025/02/14',
  '8.17 - 2025/01/12',
  '8.16 - 2024/11/04',
  '8.15 - 2024/10/25',
  '8.14 - 2024/09/27',
  '8.13 - 2024/09/02',
  '8.12 - 2024/07/20',
  '8.11 - 2024/06/23',
  '8.10 - 2024/05/21',
  '8.9 - 2024/05/01',
  '8.8 - 2024/04/14',
  '8.7 - 2024/03/30',
  '8.6 - 2024/03/13',
  '8.5 - 2024/02/13',
  '8.4 - 2024/01/08',
  '8.3 - 2023/11/05',
  '8.2 - 2023/10/02',
  '8.1 - 2023/08/27',
  '8.0 - 2023/08/13',
  '7.16 - 2023/07/04',
  '7.15 - 2023/06/09',
  '7.14 - 2023/05/19',
  '7.13 - 2023/04/29',
  '7.12 - 2023/04/20',
  '7.11 - 2023/04/02',
  '7.10 - 2023/03/18',
  '7.9 - 2023/03/03',
  '7.8 - 2023/02/15',
  '7.7 - 2023/02/06',
  '7.6 - 2023/01/14',
  '7.5 - 2022/12/31'
]

const today = new Date()

export function getReleaseDistance(v: string) {
  v = String(v).slice(0, 4).replace(/\.$/, '')

  const index = V.findIndex(item => item.startsWith(v))
  if (index !== -1) {
    const [, date] = V[index].split(' - ')
    const givenDate = new Date(date.replace(/\//g, '-'))
    const timeDifference = today.getTime() - givenDate.getTime()
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    return daysDifference
  }

  return ''
}
