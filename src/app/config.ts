var MAIN_URL = 'http://18.225.35.145'; //ohio reason ip , currently working
 var MAIN_URL_PORT = '3001'; //live_server

export const config = {
  	API_URL : MAIN_URL+':'+MAIN_URL_PORT,
  	ENC_SALT: 'gd58_N9!ysS',
  	BASE_URL: MAIN_URL+'/',
  	IMAGES_URL: MAIN_URL+':'+MAIN_URL_PORT+'/live_server/uploads',
  	IMAGE_EXTENSIONS: ['image/png','image/jpg','image/jpeg','image/gif','image/bmp','image/webp']
};