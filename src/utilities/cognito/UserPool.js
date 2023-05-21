import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_MenGQNbhn',
  ClientId: '7b398qg22gffq3jbtg7rnbmh7g'
};

export default new CognitoUserPool(poolData);
