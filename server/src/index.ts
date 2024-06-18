import app from './app';
import { ENV } from './util';

app.listen(ENV.PORT, async () =>
  console.log(`server running on port ::${ENV.PORT}`)
);
