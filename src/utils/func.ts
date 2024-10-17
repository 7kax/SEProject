// Desc: Common functions

// Check if a string is empty
// If empty, log an error and alert the user
export const emptyString = (str: string, scope: string): boolean => {
    const trimmed = str.trim();
    if (trimmed === '') {
        console.error(`Error: ${scope} is empty`);
        alert(`${scope}不能为空`);
        return true;
    }
    return false;
}