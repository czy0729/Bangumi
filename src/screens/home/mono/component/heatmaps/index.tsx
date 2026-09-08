/*
 * @Author: czy0729
 * @Date: 2021-01-30 00:33:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-10 04:31:14
 */
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

function Heatmaps({ index }: { index: number }) {
  r(COMPONENT)

  return (
    <>
      {index === 2 && <Heatmap id='人物.跳转' from='吐槽' />}
      {index === 3 && <Heatmap id='人物.跳转' to='Zone' alias='空间' />}
      {index === 4 && <Heatmap id='人物.跳转' to='WebBrowser' alias='浏览器' />}
    </>
  )
}

export default observer(Heatmaps)
