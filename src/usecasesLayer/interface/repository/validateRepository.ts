export interface validationResult {
    success: boolean;
    message?: string;
}

// RequestValidatorInterface.ts
export interface IRequestValidator{
    validateRequiredFields(data: Record<string, any>, requiredFields: string[]): validationResult
}