import errorHandler from "middleware/errorhandling.middleware";
import app from "./config/express.config";
import { appRoutes } from "./routes/app.route";

app.use('/api/v1', appRoutes)

app.use(errorHandler);