/**
 * Legal Calculators - Central Export
 */

// Schemas
export * from "./schemas";

// Calculators
export { calculateSeverance, type SeveranceResult } from "./severance";
export { calculateInheritance, type InheritanceResult, type Heir } from "./inheritance";
export { calculateInterest, type InterestResult, type InterestPeriod } from "./interest";
export { calculateExecution, type ExecutionResult } from "./execution";
export { calculatePropertyRegime, type PropertyRegimeResult, type PropertySummary } from "./property-regime";
export { calculateTaxPenalty, type TaxPenaltyResult, type MonthlyCalculation } from "./tax-penalty";
export { calculateCourtFees, type CourtFeeResult } from "./court-fees";
