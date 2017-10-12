import fetch from '@/utils/fetch'


export function getContentList(query) {
  return fetch({
    url: 'review/content/list',
    method: 'get',
    params: query
  })
}



export function submitAllList(listInfo) {
  return fetch({
    url: 'review/content/allsubmit',
    method: 'post',
    data: listInfo
  })
}



export function submitOneOperation(rowkey, opt) {
  return fetch({
    url: 'review/content/submitOneOperation',
    method: 'post',
    data: {
      rowkey,
      opt
    }
  })
}
