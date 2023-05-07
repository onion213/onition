import * as cdk from 'aws-cdk-lib';
import { aws_iam as iam, aws_ecr as ecr } from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import * as apprunner from '@aws-cdk/aws-apprunner-alpha';


interface AppRunnerProps {
  repository: ecr.Repository
}

export class AppRunner extends Construct {
  constructor(scope: Construct, id: string, props: AppRunnerProps) {
    super(scope, id)

    const { repository } = props

    // get pre-provisioned secrets from AWS SecretsManager
    const secretSlackBotToken = secretsmanager.Secret.fromSecretNameV2(scope, 'SecretSlackBotToken', 'Onition-Backend/SLACK_BOT_TOKEN');
    const secretSlackSigningSecret = secretsmanager.Secret.fromSecretNameV2(scope, 'SecretSlackSigningSecret', 'Onition-Backend/SLACK_SIGNING_SECRET');

    // Apprunner
    const appRunnerService = new apprunner.Service(scope, 'OnitionBackendAppRunnerService', {
      source: apprunner.Source.fromEcr({
        imageConfiguration: {
          port: 3000,
          environmentSecrets: {
            SLACK_BOT_TOKEN: apprunner.Secret.fromSecretsManager(secretSlackBotToken),
            SLACK_SIGNING_SECRET: apprunner.Secret.fromSecretsManager(secretSlackSigningSecret)
          }
        },
        repository: repository,
        tagOrDigest: 'latest',
      }),
      autoDeploymentsEnabled: true
    });

    new cdk.CfnOutput(scope, 'AppUrl', {
      value: appRunnerService.serviceUrl
    });
  }
}
