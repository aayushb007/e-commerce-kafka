import {kafka} from '../config/client.js';
const consumer = kafka.consumer({groupId: 'payment-group'})
const topic = "payment-topic"
await consumer.connect()

 await consumer.subscribe({ topic, fromBeginning: true })
    console.log("Payment Consumer Connecting")
    await consumer.run({
        eachMessage: async ({ topic, partition, message })=>{
         
         console.log({
            topic,
            partition,
            value: message.value.toString()
         })
        },
})