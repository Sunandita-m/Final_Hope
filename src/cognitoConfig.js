import { CognitoUserPool } from "amazon-cognito-identity-js";

let userPoolInstance = null;

export function getUserPool() {
  if (typeof window === 'undefined') {
    return null;
  }
  
  if (!userPoolInstance) {
    const poolData = {
      UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "us-east-1_placeholder",
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "placeholder-client-id",
    };
    userPoolInstance = new CognitoUserPool(poolData);
  }
  return userPoolInstance;
}

export const userPool = getUserPool();
