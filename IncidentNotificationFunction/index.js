const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const sns = new SNSClient({ region: "eu-north-1" });

exports.handler = async (event) => {
  const params = {
    Message: JSON.stringify({
      incidentId: "12345",
      status: "Not working"
    }),
    TopicArn: "arn:aws:sns:eu-north-1:693103958339:report-alerts"
  };

  try {
    const result = await sns.send(new PublishCommand(params));
    console.log("SNS Publish Success:", result);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Notification sent successfully" })
    };
  } catch (err) {
    console.error("SNS Publish Error:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send notification" })
    };
  }
};








