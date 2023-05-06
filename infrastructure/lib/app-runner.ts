import * as cdk from 'aws-cdk-lib'
import { aws_iam as iam, aws_ecr as ecr } from 'aws-cdk-lib'
import { Construct } from 'constructs';
import * as apprunner from '@aws-cdk/aws-apprunner-alpha';


interface AppRunnerProps {
  repository: ecr.Repository
}

export class AppRunner extends Construct {
  constructor(scope: Construct, id: string, props: AppRunnerProps) {
    super(scope, id)

    const { repository } = props

    // Apprunner
    const appRunnerService = new apprunner.Service(scope, 'OnitionBackendAppRunnerService', {
      source: apprunner.Source.fromEcr({
        imageConfiguration: {
          port: 3000,
        },
        repository,
        tag: 'latest',
      }),
    })
    new cdk.CfnOutput(scope, 'AppUrl', {
      value: appRunnerService.serviceUrl
    });
  }
}
