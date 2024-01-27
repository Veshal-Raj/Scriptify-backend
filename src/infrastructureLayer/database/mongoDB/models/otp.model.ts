import mongoose,{Types} from 'mongoose';
import {IOtp} from '../../../../entitiesLayer/otp'


const otpSchema = new mongoose.Schema<IOtp>({

userMail:String,
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt:{
    type:Date,
    required:true
  }
});

// delete the document after a certain time
otpSchema.post<IOtp>('save', function(doc) {
  setTimeout(async () => {
    try {
      const deletedDoc = await OTP.findByIdAndDelete(doc._id);
      if (!deletedDoc) {
        console.error('Document not found');        
      } else {
        console.log(`Document deleted: ${deletedDoc}`)
      }
    } catch (error) {
      console.error(`Error deleting document: ${error}`);
    }
  }, 30*60*1000)
})

const OTP = mongoose.model<IOtp>('OTP', otpSchema);

export default OTP