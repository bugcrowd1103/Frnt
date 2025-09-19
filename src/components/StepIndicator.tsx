import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  steps: { label: string; value: number }[];
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step.value} className="w-full flex items-center">
            <div className="relative">
              <div className={cn(
                "h-12 w-12 rounded-full border-2 flex items-center justify-center font-bold",
                currentStep >= step.value 
                  ? "border-primary bg-primary text-white" 
                  : "border-medium bg-white text-medium"
              )}>
                {step.value}
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 text-center">
                <span className={cn(
                  "text-sm font-medium",
                  currentStep >= step.value ? "text-primary" : "text-medium"
                )}>
                  {step.label}
                </span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "flex-1 h-1",
                currentStep > step.value ? "bg-primary" : "bg-gray-300"
              )}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
