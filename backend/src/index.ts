import express from "express";
import dotenv from "dotenv";
import documentVerificationRouter from "./routes/documentVerification";
import setCorsHeaders from "./middleware/cors";
import checkForTextTractEnvVariables from "./middleware/validateTextTractEnvVars";

const app = express();
const port = 3000;
dotenv.config();
// Used to avoid any CORS errors in localdev
app.use(setCorsHeaders);
app.use(express.json());
app.use(express.urlencoded());

app.use(checkForTextTractEnvVariables);
app.use("/verify-passport-details", documentVerificationRouter());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
