import {kafka} from '../config/client.js';
async function initAdmin() { 
  const admin = kafka.admin();
  console.log("Admin connecting...");
  admin.connect();
  console.log("Adming Connection Success...");

  console.log("Creating Topic [test-topic]");
  await admin.createTopics({
    topics: [
      {
        topic: "order-topic",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic Created Success [test-topic]");
  console.log("Disconnecting Admin..");
  await admin.disconnect();
}

async function producerInit(param) {
  const producer = kafka.producer()

await producer.connect()
 setInterval(async () => {
await producer.send({
  topic: 'email-topic',
  messages: [
    { 
        // partition: 1,
        // key : 'location',
        value: JSON.stringify(param),
    }
  ],
}).then((d)=>{
    console.log('Success',d)
})

await producer.send({
  topic: 'inventory-topic',
  messages: [
    { 
        // partition: 1,
        // key : 'location',
        value: JSON.stringify(param),
    }
  ],
}).then((d)=>{
    console.log('Success',d)
})

await producer.send({
  topic: 'payment-topic',
  messages: [
    { 
        // partition: 1,
        // key : 'location',
        value: JSON.stringify(param),
    }
  ],
}).then((d)=>{
    console.log('Success',d)
})
 },3000);

console.log("Producer Created Success [test-topic]");
console.log("Disconnecting Producer..");
// await producer.disconnect()
    
}

let value = {
  "orderId": "abc123",
  "userId": "user1",
  "items": [
    { "productId": "p1", "quantity": 2 }
  ],
  "total": 49.99,
  "timestamp": "2025-05-15T10:00:00Z"
}

initAdmin();
producerInit(value);