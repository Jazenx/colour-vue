import fetch from '@/utils/fetch'

export function addKeywords(keywords, validity, updatetime, submitor, location, wordstate, classify) {
  return fetch({
    url: 'graylist/banned/addkeywords',
    method: 'post',
    data: {
      keywords, // 关键词
      validity, // 有效日期
      updatetime, // 提交时间
      submitor, // 提交人
      location, // 范围
      wordstate, // 状态
      classify
    }
  })
}


export function getKeywords(query) {
  return fetch({
    url: 'graylist/banned/getkeywords',
    method: 'get',
    params: query
  })
}

export function updateKeywords(id, keywords, validity, updatetime, submitor, location) {
  return fetch({
    url: 'graylist/banned/updatekeywords',
    method: 'post',
    data: {
      id, // 编号
      keywords, // 关键词
      validity, // 有效日期
      updatetime, // 提交时间
      submitor, // 提交人
      location // 范围
    }
  })
}

export function changeKeywordsStatus(id, wordstate) {
  return fetch({
    url: 'graylist/banned/changekeywordstatus',
    method: 'post',
    data: {
      id,
      wordstate
    }
  })
}


export function deleteKeywords(keywordsID) {
  return fetch({
    url: 'graylist/banned/deletekeywords',
    method: 'post',
    data: {
      keywordsID
    }
  })
}

export function deleteContacts(keywordsID) {
  return fetch({
    url: 'graylist/banned/deletecontacts',
    method: 'post',
    data: {
      keywordsID
    }
  })
}

export function addAdsInfo(adsnoun, adsverb, validity, updatetime, submitor, location, wordstate, classify) {
  return fetch({
    url: 'graylist/banned/addadsinfo',
    method: 'post',
    data: {
      adsnoun, // 动词
      adsverb, // 名词
      validity, // 有效日期
      updatetime, // 提交时间
      submitor, // 提交人
      location, // 范围
      wordstate, // 状态
      classify
    }
  })
}

export function getAdsInfo(query) {
  return fetch({
    url: 'graylist/banned/getadsinfo',
    method: 'get',
    params: query
  })
}




export function updateAdsInfo(id, adsnoun, adsverb, validity, updatetime, submitor, location) {
  return fetch({
    url: 'graylist/banned/updateadsinfo',
    method: 'post',
    data: {
      id, // 编号
      adsnoun,
      adsverb,
      validity, // 有效日期
      updatetime, // 提交时间
      submitor, // 提交人
      location // 范围
    }
  })
}


export function changeAdsStatus(id, wordstate) {
  return fetch({
    url: 'graylist/banned/changeadsstatus',
    method: 'post',
    data: {
      id,
      wordstate
    }
  })
}



export function deleteAds(keywordsID) {
  return fetch({
    url: 'graylist/banned/deleteads',
    method: 'post',
    data: {
      keywordsID
    }
  })
}

export function getKeywordClassifyList() {
  return fetch({
    url: 'dropdown/graylist/keyword',
    method: 'get'
  })
}


export function transferKeyword(keywordsID) {
  return fetch({
    url: 'graylist/banned/transferkeyword',
    method: 'post',
    data: {
      keywordsID
    }
  })
}