var req = new XMLHttpRequest();
req.open("POST", "https://api.sanalab.kz:8082/api/report/", true);
req.setRequestHeader('Content-Type', 'application/json');
const pass = "grgre"
const login = "rwgreg"
const header = pass + ":" + login
var headerASCII = ""
for (var i = 0; i < header.length; i++) {
    headerASCII += header.charAt(i).charCodeAt(0);
}
const headerBasic = btoa(headerASCII)
console.log(headerBasic)
req.setRequestHeader('Authorization', `Basic ${headerBasic}`);
req.send();