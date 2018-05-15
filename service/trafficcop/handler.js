'use strict';

module.exports.handler = (event, context, callback) => {

    // debug
    console.log('lambda @ edge > Start');
    console.log({event, context});

    // declare local vars
    const redirectUri = 'https://docs.google.com/presentation/d/e/2PACX-1vR7dyzn_CcTzg8EguTgkfcFI9yJoGhFu1MEhluyBE-Tz4OVIpqDVbrLWbJgAgKRHHLTv3ClqG9ZkVIk/pub?slide=id.';
    let slideId = 'p';
    let redirectStatus = '302';
    let redirectDescription = 'Found';

    // get a handle on any requested path
    const requestedPath = event.Records[0].cf.request.uri || "";

    // branch accordingly
    switch (requestedPath.toLowerCase()) {
        case '/zecutiv': {
            slideId = 'g2f4879174a_0_0';
            break;
        }
        case '/syndio': {
            slideId = 'g2f4879174a_0_36';
            break;
        }
        case '/digi': {
            slideId = 'g2f4879174a_0_45';
            break;
        }
        case '/etherios': {
            slideId = 'g2f4879174a_0_53';
            break;
        }
        case '/salesforce':
        case '/sfdc': {
            slideId = 'g2f4879174a_0_60';
            break;
        }
        case '/inft':
        case '/inforte': {
            slideId = 'g2f4879174a_0_77';
            break;
        }
        case '/contact': {
            slideId = 'g306226e47d_1_1';
            break;
        }
        case '/cv':
        case '/resume': {
            redirectUri = 'https://resume.io/r/ZJDOE';
            slideId = '';
        }
        default: {
            break;
        }
    }

    // contruct the response
    const response = {
        status: redirectStatus,
        statusDescription: redirectDescription,
        headers: {
            location: [{
                key: 'Location',
                value: `${redirectUri}${slideId}`,
            }],
        },
    };

    // return
    callback(null, response);
};