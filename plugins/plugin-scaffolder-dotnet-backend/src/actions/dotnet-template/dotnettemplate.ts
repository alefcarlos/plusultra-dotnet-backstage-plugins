import { executeShellCommand } from '@backstage/plugin-scaffolder-backend';
import { resolveSafeChildPath } from '@backstage/backend-common';

import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
export const dotnetNewAction = () => {
    return createTemplateAction<{ template: string, args: any[], targetPath?: string }>({
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
                            type: 'any'
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

            const args = ctx.input.args.map(x => stringify(x));

            await executeShellCommand({
                command: 'dotnet',
                args: ['new', ctx.input.template, ...args],
                options: {
                    cwd: outputDir,
                },
                logStream: ctx.logStream
            });

            ctx.logger.info(`Template result written to ${outputDir}`);
        },
    });
};

function stringify(value: any) {
    switch (typeof value) {
        case 'string': return value;
        case 'object': return JSON.stringify(value);
        default: return String(value);
    }
};
