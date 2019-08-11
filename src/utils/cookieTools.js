export const getCookie = (key) => {
	const name = key + "=";
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		const c = ca[i].trim();
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
};

export const setCookie = (key, value) => {
	const d = new Date();
	d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
	const expires = "expires=" + d.toGMTString();
	document.cookie = key + "=" + value + "; " + expires;
};

export const deleteCookie = (key) => {
	const date = new Date();
	date.setTime(date.getTime() - 10000);
	//const value = getCookie(key);
	document.cookie = `${key}=; expire=` + date.toGMTString();
};
