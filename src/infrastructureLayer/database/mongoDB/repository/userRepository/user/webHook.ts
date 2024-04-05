// import { IPaymentService } from "../../../../../../usecasesLayer/interface/services/IpaymentService"
// import Stripe from "stripe"

// const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

// if (!STRIPE_SECRET_KEY) throw new Error("Stripe secret key is not defined");

// const stripe = new Stripe(STRIPE_SECRET_KEY)

// export const webHook = async (
//     // data: any,
//     body: any,
//     sig: any,
//     // paymentService: IPaymentService
// ) => {
//     try {
//         const payload = body
//         const payloadString = JSON.stringify(payload, null, 2);

//         if (typeof sig !== "string") {
//             return false;
//           }

//           const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY
//           if (!endpointSecret) throw new Error("Stripe secret key is not defined");

//           const header = stripe.webhooks.generateTestHeaderString({
//             payload: payloadString,
//             secret: endpointSecret
//           })

//           let event;

//           event = stripe.webhooks.constructEvent(
//             payloadString,
//             header,
//             endpointSecret
//           )

//             let paymentMethod;
//             let receipt_url;

//             if (event.data.object && "payment_method" in event.data.object ) {
//               paymentMethod = event.data.object?.payment_method
//             }

//             if (event.data.object && "receipt_url" in event.data.object ) {
//               receipt_url = event.data.object?.receipt_url
//             }
//             console.log(paymentMethod,'<------->', receipt_url)
            
//             if (event.type == "checkout.session.completed") {
//             return true;
//             } else {
//             return false;
//             }

//     } catch (error) {
//         throw error
//     }
// }