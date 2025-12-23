/**
 * useLegalCalculators Hook
 * 
 * React hook for using legal calculators with Zod validation and reactive updates
 */

"use client";

import { useState, useMemo, useCallback } from "react";
import { z, ZodError } from "zod";
import {
    // Schemas
    severanceInputSchema,
    inheritanceInputSchema,
    interestInputSchema,
    executionInputSchema,
    propertyRegimeInputSchema,
    taxPenaltyInputSchema,
    courtFeeInputSchema,
    formatZodError,
    // Types
    type SeveranceInput,
    type InheritanceInput,
    type InterestInput,
    type ExecutionInput,
    type PropertyRegimeInput,
    type TaxPenaltyInput,
    type CourtFeeInput,
} from "@/lib/calculators";

import {
    // Calculators
    calculateSeverance,
    calculateInheritance,
    calculateInterest,
    calculateExecution,
    calculatePropertyRegime,
    calculateTaxPenalty,
    calculateCourtFees,
    // Result Types
    type SeveranceResult,
    type InheritanceResult,
    type InterestResult,
    type ExecutionResult,
    type PropertyRegimeResult,
    type TaxPenaltyResult,
    type CourtFeeResult,
} from "@/lib/calculators";

import { DISCLAIMERS } from "@/lib/constants";

// ============================================
// GENERIC CALCULATOR HOOK
// ============================================

interface CalculatorState<TInput, TResult> {
    input: Partial<TInput>;
    result: TResult | null;
    errors: string[];
    isValid: boolean;
    isCalculating: boolean;
}

function useCalculator<TInput, TResult>(
    schema: z.ZodSchema<TInput>,
    calculator: (input: TInput) => TResult,
    initialInput: Partial<TInput> = {}
) {
    const [state, setState] = useState<CalculatorState<TInput, TResult>>({
        input: initialInput,
        result: null,
        errors: [],
        isValid: false,
        isCalculating: false,
    });

    const updateInput = useCallback((updates: Partial<TInput>) => {
        setState(prev => ({
            ...prev,
            input: { ...prev.input, ...updates },
        }));
    }, []);

    const setInput = useCallback((input: Partial<TInput>) => {
        setState(prev => ({
            ...prev,
            input,
        }));
    }, []);

    const calculate = useCallback(() => {
        setState(prev => ({ ...prev, isCalculating: true, errors: [] }));

        try {
            const validatedInput = schema.parse(state.input);
            const result = calculator(validatedInput);

            setState(prev => ({
                ...prev,
                result,
                errors: [],
                isValid: true,
                isCalculating: false,
            }));

            return { success: true, result };
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = formatZodError(error);
                setState(prev => ({
                    ...prev,
                    result: null,
                    errors,
                    isValid: false,
                    isCalculating: false,
                }));
                return { success: false, errors };
            }
            throw error;
        }
    }, [state.input, schema, calculator]);

    // Auto-calculate when input changes (debounced would be better in production)
    const autoResult = useMemo(() => {
        try {
            const validatedInput = schema.parse(state.input);
            return calculator(validatedInput);
        } catch {
            return null;
        }
    }, [state.input, schema, calculator]);

    const reset = useCallback(() => {
        setState({
            input: initialInput,
            result: null,
            errors: [],
            isValid: false,
            isCalculating: false,
        });
    }, [initialInput]);

    return {
        ...state,
        autoResult,
        updateInput,
        setInput,
        calculate,
        reset,
    };
}

// ============================================
// SPECIFIC CALCULATOR HOOKS
// ============================================

/** Kıdem Tazminatı Hook */
export function useSeveranceCalculator(initialInput?: Partial<SeveranceInput>) {
    const hook = useCalculator(
        severanceInputSchema,
        calculateSeverance,
        initialInput
    );

    return {
        ...hook,
        disclaimer: DISCLAIMERS.general,
    };
}

/** Miras Payı Hook */
export function useInheritanceCalculator(initialInput?: Partial<InheritanceInput>) {
    const hook = useCalculator(
        inheritanceInputSchema,
        calculateInheritance,
        initialInput ?? { hasSpouse: false, numberOfChildren: 0, hasLivingParents: false, hasLivingGrandparents: false, hasSiblings: false }
    );

    return {
        ...hook,
        disclaimer: DISCLAIMERS.general,
    };
}

/** Gecikme Faizi Hook */
export function useInterestCalculator(initialInput?: Partial<InterestInput>) {
    const hook = useCalculator(
        interestInputSchema,
        calculateInterest,
        initialInput ?? { interestType: "legal" }
    );

    return {
        ...hook,
        disclaimer: DISCLAIMERS.general,
    };
}

/** İnfaz (Yatar) Hook */
export function useExecutionCalculator(initialInput?: Partial<ExecutionInput>) {
    const hook = useCalculator(
        executionInputSchema,
        calculateExecution,
        initialInput ?? { crimeType: "standard", isRecidivist: false, isMinor: false, detentionDays: 0 }
    );

    return {
        ...hook,
        disclaimer: DISCLAIMERS.execution,
    };
}

/** Mal Rejimi Hook */
export function usePropertyRegimeCalculator(initialInput?: Partial<PropertyRegimeInput>) {
    const hook = useCalculator(
        propertyRegimeInputSchema,
        calculatePropertyRegime,
        initialInput ?? {
            spouse1PersonalAssets: [],
            spouse1AcquiredAssets: [],
            spouse1Debts: 0,
            spouse2PersonalAssets: [],
            spouse2AcquiredAssets: [],
            spouse2Debts: 0,
        }
    );

    return {
        ...hook,
        disclaimer: DISCLAIMERS.propertyRegime,
    };
}

/** Vergi Cezası Hook */
export function useTaxPenaltyCalculator(initialInput?: Partial<TaxPenaltyInput>) {
    const hook = useCalculator(
        taxPenaltyInputSchema,
        calculateTaxPenalty,
        initialInput ?? { includeRestructuring: true }
    );

    return {
        ...hook,
        disclaimer: DISCLAIMERS.tax,
    };
}

/** Dava Harçları Hook */
export function useCourtFeesCalculator(initialInput?: Partial<CourtFeeInput>) {
    const hook = useCalculator(
        courtFeeInputSchema,
        calculateCourtFees,
        initialInput ?? { caseType: "bosanma", courtType: "asliHukuk" }
    );

    return {
        ...hook,
        disclaimer: DISCLAIMERS.general,
    };
}

// ============================================
// EXPORT ALL HOOKS
// ============================================

export {
    type SeveranceResult,
    type InheritanceResult,
    type InterestResult,
    type ExecutionResult,
    type PropertyRegimeResult,
    type TaxPenaltyResult,
    type CourtFeeResult,
};
