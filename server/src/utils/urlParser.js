export default url => /^http(s?):\/\//.test(url) ? url : `https://${url}`;
