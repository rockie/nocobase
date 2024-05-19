/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import actions from '@nocobase/actions';
import { createMiddleware, destroyMiddleware } from './attachments';

export default function ({ app }) {
  app.resourceManager.use(createMiddleware, { tag: 'createMiddleware', after: 'auth' });
  app.resourceManager.registerActionHandler('upload', actions.create);

  app.resourceManager.use(destroyMiddleware);
}
