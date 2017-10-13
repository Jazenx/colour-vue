import fetch from '@/utils/fetch'


export function getContentList(query) {
  return fetch({
    url: 'review/content/list',
    method: 'get',
    params: query
  })
}


export function getUserInfoList(query) {
  return fetch({
    url: 'review/content/userlist',
    method: 'get',
    params: query
  })
}

export function getIpInfoList(query) {
  return fetch({
    url: 'review/content/iplist',
    method: 'get',
    params: query
  })
}




export function submitAllList(listInfo, submitor) {
  return fetch({
    url: 'review/content/allsubmit',
    method: 'post',
    data: {
      listInfo,
      submitor
    }
  })
}



export function submitOneOperation(rowkey, opt, submitor) {
  return fetch({
    url: 'review/content/submitOneOperation',
    method: 'post',
    data: {
      rowkey,
      opt,
      submitor
    }
  })
}


export function getUserIPWorkStation(query) {
  return fetch({
    url: 'review/ipcontent/list',
    method: 'get',
    params: query
  })
}


export function getUserIDWorkStation(query) {
  return fetch({
    url: 'review/idcontent/list',
    method: 'get',
    params: query
  })
}