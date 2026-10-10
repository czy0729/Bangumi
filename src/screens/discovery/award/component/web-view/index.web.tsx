/*
 * @Author: czy0729
 * @Date: 2023-10-21 17:24:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:10:00
 */
import { ScrollView } from '@components'
import { appNavigate, navigationReference } from '@utils'
import { useMount } from '@utils/hooks'
import { HOST, IMG_DEFAULT } from '@constants'

import type { Props } from './types'

const cls = 'screen-award-web-view'

function WebView({ source }: Props) {
  useMount(() => {
    let removeListener = () => {}

    const timer = setTimeout(() => {
      const parent = window.document.querySelector(`.${cls}`) as DOMNode | null
      if (!parent) return

      const handleClick = (event: DOMEvent) => {
        const target = event.target
        if (!target?.closest?.(`a.${cls}__link`)) return

        const dataHref = target.closest?.('a')?.getAttribute?.('data-href')
        if (!dataHref) return

        event.preventDefault()
        appNavigate(dataHref, navigationReference())
      }

      parent.addEventListener('click', handleClick)
      removeListener = () => parent.removeEventListener('click', handleClick)
    }, 4000)

    return () => {
      clearTimeout(timer)
      removeListener()
    }
  })

  const __html = source.html
    .replace(/<(script)\b[^<]*(?:(?!<\/(script)>)<[^<]*)*<\/(script)>/g, '')
    .replace('<link rel="preconnect" href="https://fonts.googleapis.com">', '')
    .replace('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>', '')
    .replace(
      '<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;900&display=swap" rel="stylesheet">',
      ''
    )
    .replace(/href="\//g, `href="${HOST}/`)
    .replace(/src="\/img\/no_icon_subject.png"/g, `src="${IMG_DEFAULT}"`)
    .replace(/<a href="/g, `<a class="${`${cls}__link`}" data-href="`)

  return (
    <ScrollView>
      <div className={cls} dangerouslySetInnerHTML={{ __html }} />
    </ScrollView>
  )
}

export default WebView
