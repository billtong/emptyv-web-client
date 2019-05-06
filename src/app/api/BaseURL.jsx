/**
 *  后端URL，三选一
 **/

//本地mvn tomcat7：run或eclipse j2ee run
export const BASE_URL = 'http://localhost:8080/empty-server/';

//本地tomcat上部署
//export const BASE_URL = 'http://localhost:8080/empty-server-1.0.0/';

//digitalOcean上部署
//export const BASE_URL = 'http://178.128.236.114:8080/empty-server-1.0.0/';

//静态资源路径，视频和图片
export const BASE_MULTIPARTFILES_URL = 'http://178.128.236.114:8080/empty-video-files/';