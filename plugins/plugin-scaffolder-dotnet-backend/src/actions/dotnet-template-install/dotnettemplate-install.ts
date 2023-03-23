import { executeShellCommand } from '@backstage/plugin-scaffolder-backend';
import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
export const dotnetInstallTemplateAction = () => {
  return createTemplateAction<{ package: string, args: string[], targetPath?: string }>({
    id: 'dotnet:template:install',
    description: 'Install a template package using dotnet new command',
    schema: {
      input: {
        required: ['package'],
        type: 'object',
        properties: {
          package: {
            type: 'string',
            title: 'Package name'
          },
          args: {
            type: 'array',
            items: {
              type: 'string',
            },
            title: 'Arguments to pass to the command'
          }
        },
      },
    },
    async handler(ctx) {
      await executeShellCommand({
        command: 'dotnet',
        args: ['new', '--install', ctx.input.package, ...ctx.input.args],
        logStream: ctx.logStream
      });

      ctx.logger.info(`Package ${ctx.input.package} installed`);
    },
  });
};
