let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : '弱网环境管理';
    window.document.title = title;
};

export default util;