import fetch from '@/utils/fetch'


export function getContentList(query) {
  return fetch({
    url: 'review/content/list',
    method: 'get',
    params: query
  })
}