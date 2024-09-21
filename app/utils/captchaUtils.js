export function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    return { challenge: `${num1} + ${num2}`, answer: num1 + num2 };
}

export function validateCaptcha(userInput, correctAnswer) {
    return parseInt(userInput) === correctAnswer;
}