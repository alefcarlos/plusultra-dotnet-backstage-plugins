import { CatalogClient } from '@backstage/catalog-client';
import { createRouter, createBuiltinActions } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import type { PluginEnvironment } from '../types';
import { dotnetNewAction, dotnetBuildAction, dotnetInstallTemplateAction , dotnetNugetAddAction} from '../../../../plugins/plugin-scaffolder-dotnet-backend'
import { ScmIntegrations } from '@backstage/integration';




export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
const catalogClient = new CatalogClient({
  discoveryApi: env.discovery,
});
const integrations = ScmIntegrations.fromConfig(env.config);


const builtInActions = createBuiltinActions({
  integrations,
  catalogClient,
  config: env.config,
  reader: env.reader,
});

const actions = [
  dotnetNewAction(), 
  dotnetBuildAction(), 
  dotnetInstallTemplateAction(), 
  dotnetNugetAddAction({integrations}),
  ...builtInActions, 
];



return await createRouter({
  actions: actions,
  logger: env.logger,
  config: env.config,
  database: env.database,
  reader: env.reader,
  catalogClient
});
}
