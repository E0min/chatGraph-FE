
import { useRef, useEffect } from "react";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { ChatInputProps } from "@/features/topic/types/ui";

export function ChatInput({
    prompt,
    setPrompt,
    onSubmit,
    isLoading,
    disabled,
    placeholder = "메시지를 입력하세요...",
}: ChatInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [prompt]);

    // [Glassmorphism Style from existing View]
    const floatingInputClass = cn(
        "pointer-events-auto",
        "flex items-end gap-2",
        "w-full max-w-[100%] md:max-w-3xl mx-auto",
        "p-2",
        "rounded-[26px]",
        "bg-white/60 dark:bg-black/60",
        "backdrop-blur-2xl",
        "border border-white/40 dark:border-white/10",
        "shadow-2xl shadow-black/10",
        "transition-all duration-300 ease-out",
        "focus-within:bg-white/80 dark:focus-within:bg-black/80",
        "focus-within:shadow-black/20 focus-within:scale-[1.01]"
    );

    return (
        <div className={floatingInputClass}>
            <div className="flex-1 min-w-0 pl-2 py-0.5">
                <Textarea
                    ref={textareaRef}
                    placeholder={placeholder}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if (prompt.trim() && !isLoading && !disabled) {
                                onSubmit();
                            }
                        }
                    }}
                    className={cn(
                        "border-0 focus-visible:ring-0 px-0 py-2 shadow-none",
                        "bg-transparent",
                        "text-base text-gray-800 dark:text-gray-100 placeholder:text-gray-500/80",
                        "resize-none min-h-[24px] max-h-[200px] overflow-y-auto",
                        "scrollbar-hide"
                    )}
                    disabled={isLoading || disabled}
                    rows={1}
                />
            </div>

            <Button
                onClick={onSubmit}
                disabled={!prompt.trim() || isLoading || disabled}
                size="icon"
                className={cn(
                    "flex-shrink-0 rounded-full h-10 w-10 mb-0.5 mr-0.5",
                    "transition-all duration-200",
                    prompt.trim()
                        ? "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-md"
                        : "bg-gray-200/50 text-gray-400 dark:bg-gray-700/50 dark:text-gray-500 cursor-not-allowed shadow-none"
                )}
            >
                {isLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                    <ArrowUp className="h-5 w-5" />
                )}
            </Button>
        </div>
    );
}
