import { executeShellCommand } from '@backstage/plugin-scaffolder-backend';
import { createTemplateAction } from '@backstage/plugin-scaffolder-node';

export const dotnetBuildAction = () => {
  return createTemplateAction<{ args?: string[] }>({
    id: 'dotnet:build',
    description: 'Runs a dotnet build command',
    schema: {
      input: {
        type: 'object',
        properties: {
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
      const args = ['build'];

      if (ctx.input.args){
        args.push(...ctx.input.args);
      }

      await executeShellCommand({
        command: 'dotnet',
        args: args,
        options: {
          cwd: ctx.workspacePath,
        },
        logStream: ctx.logStream
      });
    },
  });
};
