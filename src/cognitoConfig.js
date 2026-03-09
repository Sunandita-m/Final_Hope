import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "your-user-pool-id",
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "your-client-id",
};

export const userPool = new CognitoUserPool(poolData);
