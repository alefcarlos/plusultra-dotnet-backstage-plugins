# scaffolder-dotnet-backend

Welcome to the `dotnet` actions for the `scaffolder-backend`.

This contains 
- `dotnet:new`
- `dotnet:template:install`
- `dotnet:build`

The `dotnet:new` action allows the task to create [dotnet templates](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new).

## Getting started

Create your Backstage application using the Backstage CLI as described here:
https://backstage.io/docs/getting-started/create-an-app

> Note: If you are using this plugin in a Backstage monorepo that contains the code for `@backstage/plugin-scaffolder-backend`, you need to modify your internal build processes to transpile files from the `node_modules` folder as well.

You need to configure the action in your backend:

## From your Backstage root directory

```
cd packages/backend
yarn add @plusultra/plugin-scaffolder-dotnet-backend
```

Configure the action:
(you can check the [docs](https://backstage.io/docs/features/software-templates/writing-custom-actions#registering-custom-actions) to see all options):

```typescript
// packages/backend/src/plugins/scaffolder.ts

import { dotnetNewAction, dotnetBuildAction } from '@plusultra/plugin-scaffolder-dotnet-backend'
import { ScmIntegrations } from '@backstage/integration';

const integrations = ScmIntegrations.fromConfig(config);

const builtInActions = createBuiltinActions({
containerRunner,
integrations,
config,
catalogClient,
reader,
});

const actions = [...builtInActions, dotnetNewAction(), dotnetBuildAction()];

return await createRouter({
  containerRunner,
  logger,
  config,
  database,
  catalogClient,
  reader,
  actions,
});
```

### Example of using

```yaml
---
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: debug
  title: debug
  description: Template for debugging
  tags:
    - debug
spec:
  owner: Alef
  type: debug
  steps:
    - id: template
      name: Dotnet new webapi
      action: dotnet:new
      input:
        template: webapi
        args:
          - -n
          - MyWebApi
```

You can also visit the `/create/actions` route in your Backstage application to find out more about the parameters this action accepts when it's installed to configure how you like.