import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function createGroup(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.groupsTable,
    Item: {
      groupId: uuid.v1(),
      name: data.name,
      description: data.description,
      language: data.language,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}

export async function getGroup(event, context) {
  const params = {
    TableName: process.env.groupsTable,
    Key: {
      groupId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    return failure({ status: false });
  }
}

export async function deleteGroup(event, context) {
  const params = {
    TableName: process.env.groupsTable,
    Key: {
      groupId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}

export async function updateGroup(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.groupsTable,
    Key: {
      groupId: event.pathParameters.id 
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET name = :name, description = :description",
    ExpressionAttributeValues: {
      ":description": data.description || null,
      ":name": data.name || null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}

export async function listGroups(event, context) {
  const params = {
    TableName: process.env.groupsTable
    // KeyConditionExpression: "groupId = :groupId",
    // ExpressionAttributeValues: {
    //   ":groupId": event.requestContext.identity.cognitoIdentityId
    // }
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    return failure({ status: false });
  }
}