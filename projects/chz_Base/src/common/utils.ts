export const getRandomElements = <T>(arr: T[], n: number): T[] => {
    const shuffled = [...arr];

    // Fisher-Yates 算法
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, n);
}