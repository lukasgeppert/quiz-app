export interface Score {
    examName: string;
    score: number;
    startTime: Date | null;
    endTime: Date | null;
    correct: number;
    incorrect: number;
    isNegaiveMarking: boolean;
} 