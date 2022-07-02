import {Stack, StackProps} from 'aws-cdk-lib';
import {CfnApp, CfnBranch} from 'aws-cdk-lib/aws-amplify';
import {CfnSecret} from 'aws-cdk-lib/aws-secretsmanager';
import {Construct} from 'constructs';

export class CdkStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const smGitHubToken = new CfnSecret(this, 'TimerServiceGitHubTokenSM', {
            generateSecretString: {
                secretStringTemplate: '{"username": "admin"}',
                generateStringKey: 'github-token'
            }
        });

        const amplifyApp = new CfnApp(this, 'TimerServiceAmplify', {
            name: 'timer-service-app',
            description: 'The Timer Service App using Amplify',
            repository: 'timer_service/frontend/ionic-timer-service-amplify',
            oauthToken: smGitHubToken.secretString
        });

        new CfnBranch(this, 'TimerServiceAmplifyBranch', {
            appId: amplifyApp.attrAppId,
            branchName: 'master',
            description: 'Timer Service GitHub master branch'
        });
    }
}
