import { LabelColor } from "@/components/label";

export default function BmiScore(bmi: number): {
  label: string;
  color: LabelColor;
} {
  if (bmi < 18.5) {
    return { label: "Underweight", color: "error" };
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return { label: "Normal weight", color: "success" };
  } else if (bmi >= 25 && bmi < 29.9) {
    return { label: "Overweight", color: "warning" };
  } else {
    return { label: "Obesity", color: "error" };
  }
}
