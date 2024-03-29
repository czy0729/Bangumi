/*
 * @Author: czy0729
 * @Date: 2024-03-29 11:28:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-29 13:23:23
 */
import { Calendar } from '@stores/calendar/types'
import { desc, getOnAirItem } from '@utils'

export function getData(
  data: Calendar['list'],
  filter?: {
    adapt: string
    tag: string
    origin: string
  }
) {
  try {
    const adapts = {}
    const origins = {}
    const tags = {}

    data.forEach(item => {
      item.items.forEach(item => {
        const { type: adpat, origin, tag } = getOnAirItem(item.id)
        // if (
        //   (filter.adapt && adpat !== filter.adapt) ||
        //   (filter.tag && !tag?.includes(filter.tag)) ||
        //   (filter.origin && !origin?.includes(filter.origin))
        // ) {
        //   return
        // }

        if (adpat) {
          if (adapts[adpat]) {
            adapts[adpat] += 1
          } else {
            adapts[adpat] = 1
          }
        }

        if (origin) {
          origin.split('/').forEach(item => {
            const value = item.trim()
            if (origins[value]) {
              origins[value] += 1
            } else {
              origins[value] = 1
            }
          })
        }

        if (tag) {
          tag.split('/').forEach(item => {
            const value = item.trim()
            if (tags[value]) {
              tags[value] += 1
            } else {
              tags[value] = 1
            }
          })
        }
      })
    })

    const result = {
      adapts: Object.entries(adapts)
        .sort((a, b) => desc(a[1], b[1]))
        .map(([key, value]) => `${key} (${value})`),
      origins: Object.entries(origins)
        .sort((a, b) => desc(a[1], b[1]))
        .map(([key, value]) => `${key} (${value})`),
      tags: Object.entries(tags)
        .sort((a, b) => desc(a[1], b[1]))
        .map(([key, value]) => `${key} (${value})`)
    }
    return result
  } catch (error) {}

  return {
    adapts: [],
    origins: [],
    tags: []
  }
}
