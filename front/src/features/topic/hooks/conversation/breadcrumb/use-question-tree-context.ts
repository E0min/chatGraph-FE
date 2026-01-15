import { useContext } from "react";
import { QuestionTreeContext } from "@/features/topic/components/conversation/breadcrumb/question-tree-context";

export const useQuestionTreeContext = () => {
    const context = useContext(QuestionTreeContext);
    if (context === undefined) {
        throw new Error(
            "useQuestionTreeContext must be used within a QuestionTreeProvider"
        );
    }
    return context;
};
