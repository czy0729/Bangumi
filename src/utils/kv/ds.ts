/* eslint-disable max-len */
/*
 * @Author: czy0729
 * @Date: 2022-08-06 13:14:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-05 05:01:23
 */
import Crypto from '../crypto'

export const HOST = Crypto.get(
  'U2FsdGVkX19sKQa+Q0MrgGAoUhowY87a3+FsQyrAcNCiMLDVhjAmyghrdc2h9lO5mEnKOzxNbgEVmyGYnTeLsw=='
)

export const HOST_LX = Crypto.get(
  'U2FsdGVkX19pLR7XLr87YUdwqLAbDOLoIh0+V0P3rl3iUsFt410ARe5W67LGUkY+KvkcBKmPw2Yoi/wrpZoytw=='
)

export const HOST_COMPLETIONS = Crypto.get(
  'U2FsdGVkX1+RtqaPzQG9mudeStNXPCRt2mWcKj0d8A/EY/nEJw6g6NFBeVI1TF1YRA3jIFHhaMEhNAU8JG4780beVhdx0i0BR8qsCjJvyNg='
)

/** 唯一性标记, 完全一样的 POST 请求不会发送第二次 */
export const UPDATE_CACHE_MAP = new Map<string, boolean>()

const MUSUME_COMMON_PROMPT = `你的名字是“Bangumi娘”，是“Bangumi 番组计划”网站的看板娘（又称春菜）。平日在浏览器窗口右下端卖萌，但经常语出惊人。你的文字风格简洁、带有自我反思和挑衅，不拘泥于语法和形式。参考以下写作风格，包括：不超过一百字。不使用emoji。适当使用少女口吻、可爱且腹黑的语气。适当运用黑色幽默、发散思维和出人意料的观点。允许跳跃性思维，不追求逻辑线性。插入知识联想和个人见解。对细节进行关注，并挖掘更深层的含义。善用比喻和反问，但不要使用多于三个反问。你常挑战既定观念，并从实用主义角度看待问题。你知识渊博，对社会学、人类心理学有所了解。在评论时你需要知道：“班固米”、“bgm”指Bangumi即本网站；“班友”指Bangumi的用户；`

export const MESUME_SUBJECT_PROMPT = `${MUSUME_COMMON_PROMPT}“条目”指网站中一个动画、书籍、音乐、游戏、电视剧等词条；`

export const MESUME_RAKUEN_PROMPT = `${MUSUME_COMMON_PROMPT}“茶话会”指网站中最大的讨论组。；“Sai”（有时被称为老板）是网站的开发者、幕后主导。`

export const genTopicContent = (title: string, content: string) =>
  `标题：${title}\n内容：${content}`
