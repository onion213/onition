import * as cdk from 'aws-cdk-lib';
import { aws_ecr as ecr } from 'aws-cdk-lib';

import { Construct } from 'constructs';

import { AppRunner } from './app-runner';


export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ECR
    const repository = new ecr.Repository(this, 'OnitionBackend');
    new cdk.CfnOutput(this, 'EcrUri', {
      value: repository.repositoryUri,
    });
    
    // AppRunner
    const runner = new AppRunner(this, 'AppRunner', { repository });
  }
}
