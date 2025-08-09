import AWS from 'aws-sdk';
import crypto from 'crypto';

const s3 = new AWS.S3({ signatureVersion: 'v4' });
const ddb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const { filename, equipmentName, location, description, contentType } = body;

    if (!filename) {
      return {
        statusCode: 400,
        body: 'missing filename'
      };
    }

    const id = crypto.randomUUID(); // Node 18+
    const key = `uploads/${id}_${filename}`;

    // Generate presigned PUT URL (expiresIn seconds)
    const params = {
      Bucket: process.env.UPLOAD_BUCKET,
      Key: key,
      ContentType: contentType || 'application/octet-stream',
      Expires: 300 // 5 minutes
    };
    const uploadUrl = s3.getSignedUrl('putObject', params);

    // Save initial metadata to DynamoDB
    const item = {
      id,
      equipmentName: equipmentName || '',
      location: location || '',
      description: description || '',
      s3Key: key,
      status: 'AWAITING_UPLOAD',
      createdAt: new Date().toISOString()
    };
    await ddb.put({ TableName: process.env.TABLE_NAME, Item: item }).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // relax for testing; lock to your domain in prod
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({ uploadUrl, id, key })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: 'internal error' };
  }
};

