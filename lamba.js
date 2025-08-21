// lambda.js
const AWS = require("aws-sdk");
const sns = new AWS.SNS();

exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event));

  const message = {
    status: "Incident Report Uploaded",
    details: event
  };

  try {
    await sns.publish({
      TopicArn: process.env.SNS_TOPIC_ARN, // set in Lambda env
      Message: JSON.stringify(message),
      Subject: "Hospital Incident Report Alert"
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Notification sent via SNS" })
    };
  } catch (err) {
    console.error("SNS publish failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send SNS notification" })
    };
  }
};
