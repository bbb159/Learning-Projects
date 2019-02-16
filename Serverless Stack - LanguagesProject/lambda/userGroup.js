import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

//user joins group
export async function joinGroup(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.userGroupTable,
    Item: {
      groupsId: data.groupId,
      userId: data.userId,
      name: data.name,
      joinDate: new Date().getTime()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}

//Return all groups of a user
export async function getUserGroups(event, context) {
    const params = {
      TableName: process.env.userGroupTable,
      IndexName: "UserGroupIndex",
      KeyConditionExpression: "userId = 'f0f87693-9c89-45ea-8eaf-63cc3275cdb6'",
      ProjectionExpression: "groupId",
      ScanIndexForward: false
    };
  
    try {
      const result = await dynamoDbLib.call("query", params);
      if (result.Item) {
        return success(result.Item);
      } else {
        return failure({ status: false, userId: event.pathParameters.userId, error: "Item not found." });
      }
    } catch (e) {
      return failure({ status: false, err: e });
    }
}

