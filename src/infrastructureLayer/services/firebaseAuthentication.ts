import admin from 'firebase-admin'


export const firebaseAuthentication = async (uid: string) => {
   const result = await admin.auth().getUser(uid).then(function(userRecord) {
        // console.log("Successfully fetched user data:", userRecord.toJSON())
        return userRecord.toJSON()
    }).catch(function(error) {
        console.log("Error fetching user data:", error.errorInfo.message);
        return error.errorInfo.message
        

    })

    return result
}