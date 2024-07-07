import * as AWS from "@aws-sdk/client-textract";
import type { Response } from "express";

/**
 * The function `getFieldsFromDocuments` extracts specific fields with their values and confidence
 * scores from an AWS identity document analysis output.
 * @param identityDocument - The `identityDocument` parameter in the `getFieldsFromDocuments` function
 * is of type `AWS.AnalyzeIDCommandOutput`. This parameter likely contains information extracted from
 * an identity document using AWS services, such as Amazon Textract or Amazon Rekognition. The function
 * iterates over the `IdentityDocuments
 * @returns The `getFieldsFromDocuments` function returns an array of objects containing information
 * extracted from the `identityDocument` parameter. Each object in the array has the following
 * properties:
 * - `value`: A string representing the extracted value.
 * - `confidenceScore`: A string representing the confidence score of the extracted value.
 * - `field`: A string representing the type of field extracted (e.g., "FIRST_NAME
 */
const getFieldsFromDocuments = (
  identityDocument: AWS.AnalyzeIDCommandOutput
) => {
  const documentFields: {
    value: string | undefined;
    confidenceScore: string | undefined;
    field: string;
  }[] = [];

  identityDocument.IdentityDocuments?.forEach(({ IdentityDocumentFields }) => {
    if (IdentityDocumentFields) {
      IdentityDocumentFields.forEach(({ Type, ValueDetection }) => {
        switch (Type?.Text) {
          case "FIRST_NAME":
          case "LAST_NAME":
          case "MIDDLE_NAME":
          case "DOCUMENT_NUMBER":
          case "EXPIRATION_DATE":
          case "DATE_OF_BIRTH":
            documentFields.push({
              value: ValueDetection?.Text,
              confidenceScore: convertConfidenceScoreToRating(
                ValueDetection?.Confidence
              ),
              field: Type?.Text,
            });
            break;
        }
      });
    }
  });
  return documentFields;
};

/**
 * The function `convertConfidenceScoreToRating` takes a confidence score as input and returns a rating
 * of "Low", "Medium", or "High" based on the score.
 * @param {number | undefined} score - The `convertConfidenceScoreToRating` function takes a `score`
 * parameter, which is expected to be a number or `undefined`. The function then converts this
 * confidence score into a rating based on certain thresholds. If the `score` is `undefined`, it
 * returns "Low". If the `
 * @returns The function `convertConfidenceScoreToRating` returns a string indicating the rating based
 * on the confidence score provided. If the score is undefined or less than 30, it returns "Low". If
 * the score is between 30 and 74, it returns "Medium". Otherwise, it returns "High".
 */
const convertConfidenceScoreToRating = (score: number | undefined) => {
  if (score === undefined) return "Low";

  if (score < 30) return "Low";
  else if (score < 75) return "Medium";

  return "High";
};

/**
 * The function `handleErorrMessageForTextTract` takes an error name and response object, and returns
 * an appropriate error message based on the error name.
 * @param {string} name - The `name` parameter in the `handleErrorMessageForTextTract` function is used
 * to determine the type of error that occurred during text extraction. Based on the value of `name`, a
 * specific error message is sent back in the response to inform the client about the nature of the
 * error.
 * @param {Response} res - The `res` parameter in the `handleErrorMessageForTextTract` function is
 * typically an HTTP response object that is used to send a response back to the client making the
 * request. It allows you to set the status code and send a message or data back to the client based on
 * the outcome of
 * @returns The function `handleErorrMessageForTextTract` returns a response based on the `name`
 * parameter provided. If the `name` matches one of the specified cases
 * ("UnsupportedDocumentException", "DocumentTooLargeException", "BadDocumentException",
 * "ProvisionedThroughputExceededException"), it sends a specific error message with the corresponding
 * status code. If the `name` does
 */
const handleErorrMessageForTextTract = (name: string, res: Response) => {
  switch (name) {
    case "UnsupportedDocumentException":
      return res.status(400).json({
        message:
          "Document is not supported. Please provide a document of your photo ID.",
      });

    case "DocumentTooLargeException":
      return res.status(400).json({
        message:
          "The document can't be processed because it's too large. The maximum document size for synchronous operations 10 MB. ",
      });
    case "BadDocumentException":
      return res
        .status(400)
        .send({ message: "Document type is not supported" });
    case "ProvisionedThroughputExceededException":
      return res.status(500).json({
        message:
          "We are experiencing large volumes at the moment. Please give it some time before trying again.",
      });
    default:
      return res.status(500).json({
        message:
          "Something went wrong. Please contact customer service or try again.",
      });
  }
};

const verifyUserName = (
  fullName: string,
  first_name: string,
  middle_name: string,
  last_name: string
) => {
  return (
    fullName.trim().toLowerCase() ===
    `${first_name.toLowerCase()}${middle_name.toLowerCase()}${last_name.toLowerCase()}}`.trim()
  );
};

export { getFieldsFromDocuments, handleErorrMessageForTextTract };
