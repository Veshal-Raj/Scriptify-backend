import mongoose, { Schema, Document, Types } from 'mongoose';

import { IOtp } from '../../../../entitiesLayer/otp'; 

const otpSchema = new mongoose.Schema<IOtp>({

userMail:String,
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default:Date.now,
    expires: 30 * 60,
  },
  createdAt:{
    type:Date,
    required:true,
    default:Date.now
  }
});

// delete the document after a certain time 
otpSchema.post<IOtp>('save', function (doc) {
  setTimeout(async () => {
    try {
      const deletedDoc = await OTP.findByIdAndDelete(doc._id);
      if (!deletedDoc) {
        console.error('Document not found');
      } else {
        console.log(`Document deleted: ${deletedDoc}`);
      }
    } catch (err) {
      console.error(`Error deleting document: ${err}`);
    }
  }, 30 * 60 * 1000); 
});


const OTP = mongoose.model<IOtp>('OTP', otpSchema);

export default OTP
