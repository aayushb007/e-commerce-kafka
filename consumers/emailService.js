import {kafka} from '../config/client.js';

async function startConsumer() {
    const consumer = kafka.consumer({groupId: 'email-group'})
    const topic = "email-topic"
    await consumer.connect()

    await consumer.subscribe({ topic, fromBeginning: true })
     console.log("Email Consumer Connecting")
     
     await consumer.run({
        eachMessage: async ({ topic, partition, message })=>{

            sendEmail(message);
        //  console.log({
        //     topic,
        //     partition,
        //     value: message.value.toString()
        //  })
        },
})
}


function sendEmail(data){
    console.info(data.value.toString());
    
}


startConsumer();