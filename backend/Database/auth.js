const {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} = require("@aws-sdk/client-dynamodb");
const dotenv = require("dotenv");

dotenv.config();
const dynamoDBClient = new DynamoDBClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
    secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY,
  },
});
console.log("Connected to Database");
const tableName = "auth-users";

const   getLoginDetails = async ({ email }) => {
  const params = {
    TableName: tableName,
    Key: {
      email: {
        S: email,
      },
    },
  };
  try {
    const characters = await dynamoDBClient.send(new GetItemCommand(params));
    if (!characters.Item) {
      return { message: "User does not exist. Please Register" };
    }
    return characters.Item;
  } catch (e) {
    console.log(e);
  }
};

const putCreateAccount = async ({ email, password, name, role }) => {
  const params = {
    Item: {
      email: email,
      password: password,
      name: name,
      role: role
    },
    ConditionExpression: "attribute_not_exists(email)",
    TableName: tableName,
  };
  try {
    const response = await dynamoDBClient.send(new PutItemCommand(params));
    return {message:"Success"};
  } catch (e) {
    return {error:"Cannot Register"};
  }
};

module.exports = { getLoginDetails, putCreateAccount };
