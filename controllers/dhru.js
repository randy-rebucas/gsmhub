exports.accountInfo = async(req, res, next) => {
    try {
        const response = await req.dhruFusion.action('accountinfo');
        const json = await response.json();
        if (json.ERROR) {
            throw new Error(json.ERROR[0].MESSAGE);
        }
        const data =  {
            message: json.SUCCESS[0].message,
            accountInfo: json.SUCCESS[0].AccoutInfo
        };
        // sample response
        // {
        //     "message": "Your Accout Info",
        //     "accountInfo": {
        //         "credit": "0.00 USD",
        //         "creditraw": 0,
        //         "mail": "rebucasrandy1986@gmail.com",
        //         "currency": "USD"
        //     }
        // }
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.allServices = async(req, res, next) => {
    try {
        const response = await req.dhruFusion.action('imeiservicelist');
        const json = await response.json();
        if (json.ERROR) {
            throw new Error(json.ERROR[0].MESSAGE);
        }

        const data =  {
            message: json.SUCCESS[0].MESSAGE,
            serviceList: json.SUCCESS[0].LIST
        };
       
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.imeiService = async(req, res, next) => {
    try {
        const response = await req.dhruFusion.action('imeiservicelist');
        const json = await response.json();
        if (json.ERROR) {
            throw new Error(json.ERROR[0].MESSAGE);
        }
        const data =  {
            message: json.SUCCESS[0].MESSAGE,
            serviceList: json.SUCCESS[0].LIST
        };
       
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.modelService = async(req, res, next) => {
    try {
        // $para['ID'] = "23"; // got from 'imeiservicelist' [SERVICEID]
        const response = await req.dhruFusion.action('modellist', req.fields);
        const json = await response.json();
        if (json.ERROR) {
            throw new Error(json.ERROR[0].MESSAGE);
        }
        const data =  {
            message: json.SUCCESS[0].MESSAGE,
            // serviceList: json.SUCCESS[0].LIST
        };
       
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
}

exports.providerService = async(req, res, next) => {
    try {
        // $para['ID'] = "23"; // got from 'imeiservicelist' [SERVICEID]
        const response = await req.dhruFusion.action('providerlist', req.fields);
        const json = await response.json();
        if (json.ERROR) {
            throw new Error(json.ERROR[0].MESSAGE);
        }
        const data =  {
            message: json.SUCCESS[0].MESSAGE,
            // serviceList: json.SUCCESS[0].LIST
        };
       
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
}

exports.imeiOrderDetail = async(req, res, next) => {
    try {
        // $para['ID'] = '34';
        const response = await req.dhruFusion.action('getimeiorder', req.fields);
        const json = await response.json();
        if (json.ERROR) {
            throw new Error(json.ERROR[0].MESSAGE);
        }
        const data =  {
            message: json.SUCCESS[0].MESSAGE,
            // serviceList: json.SUCCESS[0].LIST
        };
       
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
}

exports.fileServices = async(req, res, next) => {
    try {
        const response = await req.dhruFusion.action('fileservicelist');
        const json = await response.json();
        if (json.ERROR) {
            throw new Error(json.ERROR[0].MESSAGE);
        }
        const data =  {
            message: json.SUCCESS[0].MESSAGE,
            serviceList: json.SUCCESS[0].LIST
        };
       
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
}

exports.fileOrderDetail = async(req, res, next) => {
    try {
        // $para['ID'] = '60';
        const response = await req.dhruFusion.action('getfileorder', req.fields);
        const json = await response.json();
        if (json.ERROR) {
            throw new Error(json.ERROR[0].MESSAGE);
        }
        const data =  {
            message: json.SUCCESS[0].MESSAGE,
            // serviceList: json.SUCCESS[0].LIST
        };
       
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
}

exports.mepServices = async(req, res, next) => {
    try {
        const response = await req.dhruFusion.action('meplist');
        const json = await response.json();
        if (json.ERROR) {
            throw new Error(json.ERROR[0].MESSAGE);
        }
        const data =  {
            message: json.SUCCESS[0].MESSAGE,
            serviceList: json.SUCCESS[0].LIST
        };
       
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
}


exports.imeiServiceDetails = async(req, res, next) => {
    try {
        // $para['ID'] = "23"; // got from 'imeiservicelist' [SERVICEID]
        const response = await req.dhruFusion.action('getimeiservicedetails', req.fields);
        const json = await response.json();
        if (json.ERROR) {
            throw new Error(json.ERROR[0].MESSAGE);
        }
        const data =  {
            message: json.SUCCESS[0].MESSAGE,
            // serviceList: json.SUCCESS[0].LIST
        };
       
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
}

exports.fileOrder = async(req, res, next) => {
    try {
        // $para['ID'] = '113';
        // $para['FILENAME'] = 'ORDERID31TEST.txt';
        // $para['FILEDATA'] = base64_encode('TESTDATA');
        const response = await req.dhruFusion.action('placefileorder', req.fields);
        const json = await response.json();
        if (json.ERROR) {
            throw new Error(json.ERROR[0].MESSAGE);
        }
        console.log(json);
        const data =  {
            message: json.SUCCESS[0].MESSAGE,
            // serviceList: json.SUCCESS[0].LIST
        };
       
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
}

exports.imeiOrder = async(req, res, next) => {
    try {
        // $para['IMEI'] = "111111111111116";
        // $para['ID'] = "1382"; // got from 'imeiservicelist' [SERVICEID]

        // REQUIRED if service type = IMEI: IMEI - 15 Digit ID - Service ID
        // <PARAMETERS><IMEI>111111111111119</IMEI><ID>58361</ID><CUSTOMFIELD>eyJTRVJJQUxfTlVNQkVSIiA6ICJTRVJJQUwgTlVNQkVSIn0=</CUSTOMFIELD></PARAMETERS>
        const response = await req.dhruFusion.action('placeimeiorder', req.fields);
        const json = await response.json();
        if (json.ERROR) {
            throw new Error(json.ERROR[0].MESSAGE);
        }
        console.log(json);
        const data =  {
            message: json.SUCCESS[0].MESSAGE,
            // serviceList: json.SUCCESS[0].LIST
        };
       
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
}

exports.bulkOrder = async(req, res, next) => {
    try {
        // W3siSU1FSSI6IjExMTExMTExMTExMTExOSIsIklEIjoiNTE0MTMifSx7IklNRUkiOiIyMjIyMjIyMjIyMjIyMjkiLCJJRCI6IjUxNDEzIn1d
        // Json string with base64 encoded
        // base64_encode('[{"IMEI":"111111111111119","ID":123123},{"IMEI":"222222222222229","ID":123123}]')
        const response = await req.dhruFusion.action('placeimeiorderbulk', req.fields);
        const json = await response.json();
        if (json.ERROR) {
            throw new Error(json.ERROR[0].MESSAGE);
        }
        console.log(json);
        const data =  {
            message: json.SUCCESS[0].MESSAGE,
            // serviceList: json.SUCCESS[0].LIST
        };
       
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
}
