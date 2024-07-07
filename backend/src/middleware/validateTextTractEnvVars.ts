import { NextFunction, Response, Request } from "express";

const checkForTextTractEnvVariables = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const AWS_REGION = process.env.AWS_REGION;
  const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
  const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;

  if (!AWS_REGION || !AWS_SECRET_ACCESS_KEY || !AWS_ACCESS_KEY_ID)
    return res.status(500).send("Internal server error.");

  res.locals.aws_region = AWS_REGION;
  res.locals.aws_secret_access_key = AWS_SECRET_ACCESS_KEY;

  res.locals.aws_access_key_id = AWS_ACCESS_KEY_ID;

  next();
};

export default checkForTextTractEnvVariables;
