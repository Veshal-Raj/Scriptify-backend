import Stripe from "stripe";
import dotenv from "dotenv";
import { IPaymentService } from "../../usecasesLayer/interface/services/IpaymentService";
import {  IPaymentResponse } from "../../usecasesLayer/interface/request_response/payment";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class PaymentService implements IPaymentService {
   webhookData: Record<string, any> = {};
    async pay(userId: string, subscriptionType: string): Promise<void | IPaymentResponse> {
        const monthlyPrice = 5
        const annuallyPrice = 50
        let amount = 0;

        if (subscriptionType === 'monthly') amount = monthlyPrice
        if (subscriptionType === 'annually') amount = annuallyPrice
        const lineItems = [
             {
                price_data: {
                  currency: "USD",
                  product_data: {
                    name: subscriptionType.toUpperCase(),
                  },
                  unit_amount: amount * 100, 
                },
                quantity: 1, 
              }
        
        ]

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: 'payment',
                line_items: lineItems,
                success_url: `${process.env.CLIENT_SERVER}/success`,
                cancel_url: `${process.env.CLIENT_SERVER}/cancel`,
                metadata: {
                  userId: userId,
                  subscriptionType: subscriptionType
                }
            })

            console.log('session >>> ', session)

            return {data: session.url as string, sessionId: session.id as string} 
        } catch (error) {
            throw error
        }
    }

   

    async webHook(body: any, sig: any): Promise<any> {
      try {
        const payload = body
        const payloadString = JSON.stringify(payload, null, 2);

        

        if (typeof sig !== "string") {
            return false;
          }

          const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY
          if (!endpointSecret) throw new Error("Stripe secret key is not defined");

          const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret: endpointSecret
          })

          let event;

          event = stripe.webhooks.constructEvent(
            payloadString,
            header,
            endpointSecret
          )

            let paymentMethod;
            let receipt_url;
            let  userId;
            let subscriptionType;

            if (event.data.object) {
              if ("payment_method" in event.data.object) {
                  paymentMethod = event.data.object.payment_method;
                  this.webhookData.paymentMethod = paymentMethod;
              }
              if ("receipt_url" in event.data.object) {
                  receipt_url = event.data.object.receipt_url;
                  this.webhookData.receipt_url = receipt_url;
              }
          }

          if (event.type === "checkout.session.completed") {
            if (event.data.object.metadata && event.data.object.metadata.userId) {
                userId = event.data.object.metadata.userId;
                subscriptionType = event.data.object.metadata.subscriptionType
                this.webhookData.userId = userId;
                this.webhookData.subscriptionType = subscriptionType
            }
        }

      console.log('userid from metadata', userId);
      const wbhook = this.webhookData

      // Check event type and return appropriate response
      if (event.type === "charge.succeeded" || event.type === "checkout.session.completed") {
          return { wbhook, status: true };
      } else {
          return { wbhook: {}, status: false };
      }

      
      

        
    } catch (error) {
        throw error
    }
    }
}