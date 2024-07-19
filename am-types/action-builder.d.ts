export type ActionBuilder = {
    putSessionProperty: (key: string, value: string) => ActionBuilder
    removeSessionProperty: (key: string) => ActionBuilder
    withDescription: (description: string) => ActionBuilder
    withErrorMessage: (errorMessage: string) => ActionBuilder
    withLockoutMessage: (errorMessage: string) => ActionBuilder
    withStage: (stage: string) => ActionBuilder
}
