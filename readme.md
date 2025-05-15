# Kafka Order Pipeline with Node.js

This project demonstrates a basic Kafka pipeline using **Node.js** where:

* Topics are created using Kafka Admin.
* Orders are produced to multiple topics (`email-topic`, `inventory-topic`, `payment-topic`) every 3 seconds.
* Separate consumers listen to those topics and log the message payloads.

---

## 📁 Project Structure

```
/project-root
├── config/
│   └── client.js         # Kafka client connection
├── producer/
│   ├── orderProducer.js  # Producer logic
├── consumers/
│   ├── emailConsumer.js
│   ├── inventoryConsumer.js
│   └── paymentConsumer.js
├── README.md
└── package.json
```

---

## ⚙️ Prerequisites

* Node.js v18+ recommended
* Apache Kafka running locally or remotely
* Kafka broker available at `localhost:9092` (or update `client.js`)

---

## 🔌 Kafka Client Setup

In `config/client.js`:

```js
import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "order-app",
  brokers: ["localhost:9092"], // Change if needed
});
```

---

## 🚀 Running the Application

### 1. Install dependencies

```bash
npm install kafkajs
```

### 2. Create Kafka Topics

Run the admin script once to create necessary topics:

```bash
node admin.js
```

---

### 3. Start Consumers

Open separate terminals for each:

```bash
node consumers/emailConsumer.js
node consumers/inventoryConsumer.js
node consumers/paymentConsumer.js
```

Each consumer listens on its own topic and logs received messages.

---

### 4. Start the Producer

Run:

```bash
node producer/orderProducer.js
```

This sends a new `order` to all topics every 3 seconds.

---

## 📦 Sample Message Format

```json
{
  "orderId": "abc123",
  "userId": "user1",
  "items": [
    { "productId": "p1", "quantity": 2 }
  ],
  "total": 49.99,
  "timestamp": "2025-05-15T10:00:00Z"
}
```

---

## 🛠 Notes

* Ensure each consumer uses a **unique `groupId`** to receive all messages independently.
* All topics are created with **2 partitions**.

---

## 📚 Useful Commands

List topics (Kafka CLI):

```bash
kafka-topics.sh --list --bootstrap-server localhost:9092
```

Consume manually (Kafka CLI):

```bash
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic email-topic --from-beginning
```
