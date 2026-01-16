import { useContext, createContext } from "react";
import { useQuestionTree } from "@/features/topic/hooks/conversation/breadcrumb/use-question-tree";

type UseQuestionTreeReturn = ReturnType<typeof useQuestionTree>;

export const QuestionTreeContext = createContext<UseQuestionTreeReturn | undefined>(
    undefined
);

export const useQuestionTreeContext = () => {
    const context = useContext(QuestionTreeContext);
    if (context === undefined) {
        throw new Error(
            "useQuestionTreeContext must be used within a QuestionTreeProvider"
        );
    }
    return context;
};
