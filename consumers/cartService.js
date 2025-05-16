import {kafka} from '../config/client.js';

async function startConsumer() {
    const consumer = kafka.consumer({groupId: 'cart-group'})
    const topic = "cart-topic"
    await consumer.connect()

    await consumer.subscribe({ topic, fromBeginning: true })
     console.log("Email Consumer Connecting")
     
     await consumer.run({
         eachBatch: async ({ batch }) => {
      console.log(`Received batch of ${batch.messages.length} messages`);
      for (let message of batch.messages) {
        console.log({
          key: message.key.toString(),
          value: message.value.toString(),
        });
      }
    },
})
}


function sendToCart(data){
    console.info(data.value.toString());
    
}


startConsumer();