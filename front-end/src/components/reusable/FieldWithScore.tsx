import {
  getColorForRating,
  removeUnderScoreFromString,
} from "../../utils/utils";
interface FieldWithScoreProps {
  field: string;
  value: string;
  confidenceScore: string;
}
export default function FieldWithScore({
  field,
  value,
  confidenceScore,
}: FieldWithScoreProps) {
  return (
    <div>
      <p className="font-bold lowercase first-letter:uppercase">
        {removeUnderScoreFromString(field)}
      </p>
      <div className="flex items-center justify-between">
        <span className="lowercase first-letter:uppercase">{value}</span>
        <span className={`${getColorForRating(confidenceScore)}`}>
          {confidenceScore}
        </span>
      </div>
    </div>
  );
}
