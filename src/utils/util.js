// 去掉string前后空格
export function trim (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
}
