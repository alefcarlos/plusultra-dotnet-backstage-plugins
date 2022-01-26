import { createTemplateAction, runCommand } from '@backstage/plugin-scaffolder-backend';

export const dotnetNewInstallAction = () => {
  return createTemplateAction<{ package: string, args: string[], targetPath?: string }>({
    id: 'dotnet:new:install',
    description: 'Install a template package using dotnet new command',
    schema: {
      input: {
        required: ['template'],
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
      await runCommand({
        command: 'dotnet',
        args: ['--install', ctx.input.package, ...ctx.input.args],
        logStream: ctx.logStream
      });

      ctx.logger.info(`Package ${ctx.input.package} installed`);
    },
  });
};
