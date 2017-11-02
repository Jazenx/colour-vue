import Mock from 'mockjs';
import loginAPI from './login';
import articleAPI from './article';
import article_tableAPI from './article_table';
import remoteSearchAPI from './remoteSearch';
import bannedAPI from './banned'
import contentAPI from './content';

// 登录相关
Mock.mock(/\/login\/loginbyemail/, 'post', loginAPI.loginByEmail);
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/login\/info\.*/, 'get', loginAPI.getInfo)

// // 文章相关
Mock.mock(/\/blacklist\/banned\/getkeywords/, 'get', articleAPI.getList);


Mock.mock(/\/blacklist\/banned\/getcontacts/, 'get', articleAPI.getList);
Mock.mock(/\/blacklist\/banned\/getip/, 'get', articleAPI.getList);
Mock.mock(/\/blacklist\/banned\/getid/, 'get', articleAPI.getList);

Mock.mock(/\/whitelist\/banned\/getip/, 'get', articleAPI.getList);
Mock.mock(/\/whitelist\/banned\/getid/, 'get', articleAPI.getList);

Mock.mock(/\/graylist\/banned\/getkeywords/, 'get', articleAPI.getList);
Mock.mock(/\/graylist\/banned\/getadsinfo/, 'get', articleAPI.getList);


Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle);

// // table example相关
Mock.mock(/\/article_table\/list/, 'get', article_tableAPI.getList);
Mock.mock(/\/article_table\/p/, 'get', article_tableAPI.getPv);

// // 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser);

// //banned

Mock.mock(/\/blacklist\/banned\/addkeywords/, 'post', bannedAPI)
Mock.mock(/\/blacklist\/banned\/addcontacts/, 'post', bannedAPI)
Mock.mock(/\/blacklist\/banned\/addip/, 'post', bannedAPI)
Mock.mock(/\/blacklist\/banned\/addid/, 'post', bannedAPI)

Mock.mock(/\/whitelist\/banned\/addip/, 'post', bannedAPI)
Mock.mock(/\/whitelist\/banned\/addid/, 'post', bannedAPI)

Mock.mock(/\/graylist\/banned\/addkeywords/, 'post', bannedAPI)
Mock.mock(/\/graylist\/banned\/addadsinfo/, 'post', bannedAPI)

Mock.mock(/\/dropdown\/blacklist\/keyword/, 'get', articleAPI.getClassify)
Mock.mock(/\/dropdown\/blacklist\/contact/, 'get', articleAPI.getClassify)
Mock.mock(/\/dropdown\/blacklist\/ip/, 'get', articleAPI.getClassify)

Mock.mock(/\/blacklist\/banned\/updatekeywords/, 'post', bannedAPI)
Mock.mock(/\/blacklist\/banned\/updatecontacts/, 'post', bannedAPI)
Mock.mock(/\/blacklist\/banned\/updateip/, 'post', bannedAPI)
Mock.mock(/\/blacklist\/banned\/updateid/, 'post', bannedAPI)

Mock.mock(/\/whitelist\/banned\/updateip/, 'post', bannedAPI)
Mock.mock(/\/whitelist\/banned\/updateid/, 'post', bannedAPI)

Mock.mock(/\/graylist\/banned\/updatekeywords/, 'post', bannedAPI)
Mock.mock(/\/graylist\/banned\/updatekeywords/, 'post', bannedAPI)



Mock.mock(/\/blacklist\/banned\/changekeywordstatus/, 'post', bannedAPI)
Mock.mock(/\/blacklist\/banned\/changecontactstatus/, 'post', bannedAPI)
Mock.mock(/\/blacklist\/banned\/changeipstatus/, 'post', bannedAPI)
Mock.mock(/\/blacklist\/banned\/changeidstatus/, 'post', bannedAPI)

Mock.mock(/\/whitelist\/banned\/changeipstatus/, 'post', bannedAPI)
Mock.mock(/\/whitelist\/banned\/changeidstatus/, 'post', bannedAPI)

Mock.mock(/\/graylist\/banned\/changekeywordstatus/, 'post', bannedAPI)

Mock.mock(/\/blacklist\/banned\/deletekeywords/, 'post', bannedAPI)
Mock.mock(/\/blacklist\/banned\/deletecontacts/, 'post', bannedAPI)
Mock.mock(/\/blacklist\/banned\/deleteips/, 'post', bannedAPI)
Mock.mock(/\/blacklist\/banned\/deleteids/, 'post', bannedAPI)

Mock.mock(/\/whitelist\/banned\/deleteips/, 'post', bannedAPI)
Mock.mock(/\/whitelist\/banned\/deleteids/, 'post', bannedAPI)

Mock.mock(/\/graylist\/banned\/deletekeywords/, 'post', bannedAPI)


Mock.mock(/\/blacklist\/banned\/searchkeywords/, 'get', articleAPI.getList)

// // content
Mock.mock(/\/review\/content\/list/, 'post', contentAPI.getList);
Mock.mock(/\/review\/content\/userlist/, 'get', contentAPI.getList);
Mock.mock(/\/review\/content\/iplist/, 'get', contentAPI.getList);

Mock.mock(/\/review\/content\/allsubmit/, 'post', bannedAPI)

Mock.mock(/\/review\/content\/submitOneOperation/, 'post', bannedAPI)
Mock.mock(/\/review\/ipcontent\/list/, 'post', contentAPI.getIpList);
Mock.mock(/\/review\/idcontent\/list/, 'post', contentAPI.getIdList);

Mock.mock(/\/review\/ipworkstation\/list/, 'post', contentAPI.getList);
Mock.mock(/\/review\/idworkstation\/list/, 'post', contentAPI.getList);

export default Mock;
