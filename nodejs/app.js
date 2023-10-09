const webpush = require('web-push');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.listen(3000, () =>
{
    console.log('The server started on port 3000 !!!!!!');
});

//Step 1: Generate VApIdKeys
console.log(webpush.generateVAPIDKeys())


//console.log result
const vapIdKey = {
    publicKey: 'BNhqZPAJ1nZ8q69eXLm1FmQLSyPtkjeLgxyF9TaMDTy0e5yXdnywt-abPd8ofs1j84HlsQDWdF10Gq5HZtvkZ6A',
    privateKey: 'dtZLjZQsPLNgYtcSEyQmZucgu5B3DeMFdHF9gY95x5Q'
}

//Step 2 : register VapidDetails
webpush.setVapidDetails('mailto:zee@gmail.com', vapIdKey.publicKey, vapIdKey.privateKey);


//data that is comming from frontend side i am not using any db that its hard coded [userData] 
const sub = { "endpoint": "https://fcm.googleapis.com/fcm/send/dEpgwUObHwA:APA91bEv0JUo8_5Dv0iAEUKulqcGOMn5zstKGTDWw-jhRo5pJ2OPqxlNKBD8sHCfX9QSGFdLFSioH4By0OG_hjI_lTVgXKMHfSaz0h4kD-i8Ksk3sCdTr_U_9CFp8-9v9o3wubs90iR-", "expirationTime": null, "keys": { "p256dh": "BHLbFVZI2rfXbfkLr4l5wEJx4Nm2bCCIvqvs5bVL_qIMXZZ_WkFKH8C8eofYzSkjhohr1A6to7G2KSXhJCdKT90", "auth": "Wel2rK8YIS1SM1bC3opvBg" } }



//Step 3: Send notification 
const payLoad = {
    notification: {
        data: { url: 'http://www.youtube.com' },
        title: 'push notification',
        vibrate: [100, 50, 100],
    },
};

webpush.sendNotification(sub, JSON.stringify(payLoad));

userDataSubscription = {}


//Api Request get user subscription data
app.post('/data', (req, res) =>
{
    console.log('request came');
    const userData = req.body;
    userDataSubscription = userData
    console.log(JSON.stringify(userData));
    res.send(userData);
});









