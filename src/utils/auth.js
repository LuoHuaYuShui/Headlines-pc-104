// 提供操作本地用户信息的相关函数

const KEY = 'zxf-totiao-pc-104-user'
// 保存用户信息
/* @param {Object} user 用户信息对象*/
const setUser = user => {
    // sessionStorage进行存储
    // setItem('键名','具体数据，必须字符串格式')
    window.sessionStorage.setItem(KEY, JSON.stringify(user));
}
// 获取用户信息
const getUser = () => {
    const localUser = window.sessionStorage.getItem(KEY);
    // localUser 结果：用户信息 json 字符串 或者 null
    // 注意项: 不能将 null 返回出去，容易报错（user.token）,所以返回一个空对象{}
    return JSON.parse(localUser || '{}');
}


// 删除用户信息
const delUser = () => {
    window.sessionStorage.removeItem(KEY);
}

// 导出函数
export default { setUser, getUser, delUser } 