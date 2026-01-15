import { useQuestionTreeContext } from "@/features/topic/hooks/conversation/breadcrumb/use-question-tree-context";
import { ChatInput } from "./chat-input";

export const NewQuestionForm = () => {
  const { currentQuestion, prompt, setPrompt, handleAddQuestion, isLoading } =
    useQuestionTreeContext();

  const placeholderText = currentQuestion
    ? `"${currentQuestion.questionText.substring(0, 30)}${currentQuestion.questionText.length > 30 ? "..." : ""
    }" 의 하위 질문 입력...`
    : "질문을 입력하세요...";

  return (
    // [외부 컨테이너] sticky bottom으로 위치 잡기 + pointer-events-none으로 주변부 클릭 투과
    <div className="sticky bottom-6 z-50 w-full flex justify-center pointer-events-none px-4 pb-2">
      <ChatInput
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={() => {
          if (prompt.trim() && !isLoading && currentQuestion) {
            handleAddQuestion();
          }
        }}
        isLoading={isLoading}
        disabled={!currentQuestion}
        placeholder={placeholderText}
      />
    </div>
  );
};

