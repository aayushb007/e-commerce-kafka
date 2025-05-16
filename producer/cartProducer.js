import { kafka } from "../config/client.js";
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

async function producerInit() {
  const producer = kafka.producer();

  await producer.connect();
  setInterval(async () => {
    await producer
      .send({
        topic: "cart-topic",
        messages: Array.from({ length: 10 }).map((_, i) => ({
          key: `key-${i}`,
          value: JSON.stringify({
            batchKey: `key-${i}`,
            orderId: "abc123",
            userId: "user1",
            items: [{ productId: "p1", quantity: 2 }],
            total: 49.99,
            timestamp: "2025-05-15T10:00:00Z",
          }),
        })),
      })
      .then((d) => {
        console.log("Success", d);
      });
  }, 3000);

  console.log("Producer Created Success [cart-topic]");
  console.log("Disconnecting Producer..");
  // await producer.disconnect()
}


initAdmin();
producerInit();
