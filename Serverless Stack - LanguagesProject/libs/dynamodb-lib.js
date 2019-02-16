import AWS from "aws-sdk";

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

  return dynamoDb[action](params).promise();
}
