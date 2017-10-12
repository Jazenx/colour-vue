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
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo)

// // 文章相关
Mock.mock(/\/blacklist\/banned\/getkeywords/, 'get', articleAPI.getList);
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle);

// // table example相关
Mock.mock(/\/article_table\/list/, 'get', article_tableAPI.getList);
Mock.mock(/\/article_table\/p/, 'get', article_tableAPI.getPv);

// // 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser);

// //banned

Mock.mock(/\/blacklist\/banned\/addkeywords/, 'post', bannedAPI)

Mock.mock(/\/blacklist\/banned\/updatekeywords/, 'post', bannedAPI)

Mock.mock(/\/blacklist\/banned\/changekeywordstatus/, 'post', bannedAPI)

Mock.mock(/\/blacklist\/banned\/deletekeywords/, 'post', bannedAPI)

Mock.mock(/\/blacklist\/banned\/searchkeywords/, 'get', articleAPI.getList)

// // content
Mock.mock(/\/review\/content\/list/, 'get', contentAPI.getList);



export default Mock;
