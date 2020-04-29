const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
const DDB = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
const DDBDoc = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

on("join", async (data, socket) => {
  var params = {
    TableName: process.env.connectionDb,
    Item: {
      connectionID: { S: socket.id },
      meetingID: { S: data.id },
      connectedAt: { S: new Date().toString() }
    }
  };
  try {
    await DDB.putItem(params).promise();
  } catch (error) {
    throw new Error(error);
  }

  const team = data.team ? data.team : "none";

  var teamParams = {
    TableName: process.env.teamsDb,
    Key: { teamName: { S: team } },
    ExpressionAttributeValues: { ":inc": { N: "1" } },
    UpdateExpression: "ADD connectionCount :inc"
  };
  try {
    await DDB.updateItem(teamParams).promise();
  } catch (error) {
    throw new Error(error);
  }
});

on("disconnect", async (data, socket) => {
  if (data && data.id) {
    var params = {
      TableName: process.env.connectionDb,
      Key: {
        connectionID: { S: socket.id },
        meetingID: { S: data.id }
      }
    };
    try {
      await DDB.deleteItem(params).promise();
    } catch (error) {
      throw new Error("DISCONNECTION ERROR", error);
    }
  }
});

on("ping", async (data, socket) => {
  try {
    await socket.send(JSON.stringify({ action: "PING" }), socket.id);
  } catch (err) {
    console.log("Ping failed - old DB");
  }
});

on("default", async (data, socket) => {
  const parsedData = JSON.parse(data);
  try {
    let connectionData = await DDBDoc.query({
      TableName: process.env.connectionDb,
      IndexName: "meetingIndex",
      ProjectionExpression: "connectionID",
      KeyConditionExpression: "meetingID = :meetingID",
      ExpressionAttributeValues: {
        ":meetingID": parsedData.message.id
      }
    }).promise();
    const connections = connectionData.Items.filter(item => item.connectionID != socket.id);
    for (let { connectionID } of connections) {
      try {
        await socket.send(data, connectionID);
      } catch (error) {
        console.log("Message could not be sent - CLIENT DISCONNECTED");
      }
    }
  } catch (error) {
    throw new Error(error);
  }
});
