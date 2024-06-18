import app from './app';
import { ENV } from './util';

// Start server listening on port {ENV.PORT}
app.listen(ENV.PORT, async () =>
  console.log(`server running on port ::${ENV.PORT}`)
);
