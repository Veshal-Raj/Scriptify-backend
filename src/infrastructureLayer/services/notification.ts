import admin from 'firebase-admin'
export const serviceAccount = require('../../../push-notification-50e0e-firebase-adminsdk-5g6ac-1b4ac76fbb.json')


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

interface NotificationMessage {
    notification: {
        title: string;
        body: string;
    };
    token: string;
}


export const sendNotification = async (token: string, body: string, title: string) => {
    
    const message: NotificationMessage = {
        notification: {
            title:   title,
            body: body,
        },
        token: token
    }

    admin.messaging().send(message).then(
        (response) => console.log("Successfully send message: ", response)
    ).catch((error) => console.error("Error sending message", error))


}