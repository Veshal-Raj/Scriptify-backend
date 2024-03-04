import { nanoid } from 'nanoid'
import aws from 'aws-sdk'
import { IcloudStorage } from '../../usecasesLayer/interface/services/IcloudStorage';
require("dotenv").config()


const s3 = new aws.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export class CloudStorage implements IcloudStorage {
     async generateUploadURL() {
        const date = new Date();
        const imageName = `${nanoid()}-${date.getTime()}.jpeg`;

        return await s3.getSignedUrlPromise('putObject', {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: imageName,
            Expires: 1000,
            ContentType: "image/jpeg"
        });
    }
}

// upload url
/**
 * server.get('/get-upload-url', (req,res) => {
 *      generateUploadURL().then(url => res.status(200).json({ uploadURL: url}))
 *      .catch(err => {
 *          console.log(err.message);
 *          return res.status(500).json({ error: err.message })
 *      }) 
 * }) 
 * 
 * 
 */