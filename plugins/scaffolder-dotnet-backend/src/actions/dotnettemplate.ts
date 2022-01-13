import { createTemplateAction, runCommand } from '@backstage/plugin-scaffolder-backend';
import { resolveSafeChildPath } from '@backstage/backend-common';

export const dotnetNewAction = () => {
  return createTemplateAction<{ template: string, args: string[], targetPath?: string }>({
    id: 'dotnet:new',
    description: 'Runs a dotnet new command',
    schema: {
      input: {
        required: ['template'],
        type: 'object',
        properties: {
          template: {
            type: 'string',
            title: 'Template name'
          },
          args: {
            type: 'array',
            items: {
              type: 'string',
            },
            title: 'Arguments to pass to the command'
          },
          targetPath: {
            title: 'Target Path',
            description:
              'Target path within the working directory to generate contents to. Defaults to the working directory root.',
            type: 'string',
          },
        },
      },
    },
    async handler(ctx) {
      const targetPath = ctx.input.targetPath ?? './';
      const outputDir = resolveSafeChildPath(ctx.workspacePath, targetPath);

      ctx.logger.info(
        `Running dotnet new ${ctx.input.template} script with dotnet:new scaffolder action, workspace path: ${outputDir}`,
      );

      ctx.logger.info(ctx.input.args);

      await runCommand({
        command: 'dotnet',
        args: ['new', ctx.input.template, ...ctx.input.args],
        options: {
          cwd: outputDir,
        },
        logStream: ctx.logStream
      });

      ctx.logger.info(`Template result written to ${outputDir}`);
    },
  });
};