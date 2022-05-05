import * as pulumi from '@pulumi/pulumi';
import * as pulumicdk from '@pulumi/cdk';
import { Service, Source } from '@aws-cdk/aws-apprunner-alpha';

class AppRunnerStack extends pulumicdk.Stack {
  url: pulumi.Output<string>;
  constructor(id: string, options ?: pulumicdk.StackOptions) {
    super(id, options);
    const service = new Service(this, 'service', {
      source: Source.fromEcrPublic({
        imageConfiguration: { port: 8000 },
        imageIdentifier: 'public.ecr.aws/aws-containers/hello-app-runner:latest',
      }),
    });
    this.url = this.asOutput(service.serviceUrl);
    this.synth();
  }
}
const stack = new AppRunnerStack('teststack');
export const url = stack.url;