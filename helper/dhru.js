const FormData = require('form-data');
const fetch = require('node-fetch');

class DhruFusion {
    
    /**
     * @param {configuration} 
     */
    constructor(dhruConfig) {
        this.userName = dhruConfig.username;
        this.apiAccess = dhruConfig.apiKey;
        this.requestFormat = dhruConfig.format;
        this.endPoint = dhruConfig.fusionUrl;
    } 

    action(action, arr) {
        var formdata = new FormData();
        formdata.append("username", this.userName);
        formdata.append("apiaccesskey", this.apiAccess);
        formdata.append("requestformat", this.requestFormat);
        formdata.append("action", action);

        if (arr) {
            // const document = new DOMDocument();
            // // create a new div element 
            // const paramEl = document.createElement("PARAMETERS");
            // Object.keys(arr).forEach(function (key) {
            //     var value = arr[key];
            //     // add the text node to the newly created div
            //     key = key.toUpperCase();
            //     paramEl.appendChild(document.createElement(key, value));  
            // });
            // <PARAMETERS><IMEI>111111111111119</IMEI><ID>58361</ID><CUSTOMFIELD>eyJTRVJJQUxfTlVNQkVSIiA6ICJTRVJJQUwgTlVNQkVSIn0=</CUSTOMFIELD></PARAMETERS>
            formdata.append('parameters', '<PARAMETERS><IMEI>111111111111119</IMEI><ID>2174</ID></PARAMETERS>');
        }
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        return fetch(this.endPoint + 'api/index.php', requestOptions);
    }
}

module.exports.DhruFusion = DhruFusion;