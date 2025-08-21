const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");


const sns = new SNSClient({ region: "eu-north-1" });


exports.handler = async (event) => {
  try {
    console.log("Raw Event:", event);

    // ✅ Parse request body
    let body = {};
    try {
      body = JSON.parse(event.body || "{}");
    } catch (e) {
      console.error("Body parsing error:", e);
    }

    // ✅ Map fields from frontend payload
    const equipment = body.equipment || body.equipmentName || "Not provided";
    const tag = body.tag || body.tagNo || body.equipmentTagNo || "Not provided";
    const location = body.location || "Not provided";
    const description = body.description || body.status || "Not provided";
    const fileName = body.filename || null;
    const contentType = body.contentType || null;

    console.log("Parsed Form Data:", { equipment, location, tag, description, fileName });

    // ✅ Build SNS message
    const params = {
      Message: JSON.stringify({
        incidentId: Date.now().toString(),
        equipment,
        tag,
        location,
        description,
        fileName,
        contentType,
      }),
      TopicArn: "arn:aws:sns:eu-north-1:693103958339:report-alerts",
    };

    console.log("Publishing SNS message:", params.Message);

    await sns.send(new PublishCommand(params));

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST",
      },
      body: JSON.stringify({
        message: "Upload & Notification sent successfully ✅",
        incident: { equipment, tag, location, description, fileName }
      }),
    };
  } catch (err) {
    console.error("Error in notification Lambda:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send notification" }),
    };
  }
};
