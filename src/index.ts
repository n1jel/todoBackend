import app from "./config/express.config";
import { appRoutes } from "./routes/app.route";

app.use('/api/v1', appRoutes)