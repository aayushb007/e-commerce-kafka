import {kafka} from '../config/client.js';
const consumer = kafka.consumer({groupId: 'inventory-group'})
const topic = "inventory-topic"
await consumer.connect()

 await consumer.subscribe({ topic, fromBeginning: true })
    console.log("Inventory Consumer Connecting")
    await consumer.run({
        eachMessage: async ({ topic, partition, message })=>{
         console.log({
            topic,
            partition,
            value: message.value.toString()
         })
        },
})