import { Router, Request, Response } from "express";
import multer from "multer";
import {
  getFieldsFromDocuments,
  handleErorrMessageForTextTract,
} from "../utils";
import { TextractClient, AnalyzeIDCommand } from "@aws-sdk/client-textract";
import checkForTextTractEnvVariables from "../middleware/validateTextTractEnvVars";

const documentVerificationRouter = () => {
  const router = Router();
  router.use(checkForTextTractEnvVariables);
  router.post(
    "/",
    multer().single("passportFile"),
    async (req: Request, res: Response) => {
      const awsRegion = res.locals.aws_region;
      const accessKeyId = res.locals.aws_access_key_id;
      const aws_secret_access_key = res.locals.aws_secret_access_key;
      const client = new TextractClient({
        region: awsRegion,
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: aws_secret_access_key,
        },
      });

      if (!req.file) throw new Error("Passport file is required.");

      const passportFile = req.file as any;

      const arrByte = Uint8Array.from(passportFile.buffer);
      try {
        const input = {
          DocumentPages: [
            {
              Bytes: Buffer.from(arrByte),
            },
          ],
        };

        const command = new AnalyzeIDCommand(input);
        const response = await client.send(command);

        return res.json({ data: getFieldsFromDocuments(response) });
      } catch (error: any) {
        console.error;
        return handleErorrMessageForTextTract(error?.name, res);
      }
    }
  );

  return router;
};

export default documentVerificationRouter;
