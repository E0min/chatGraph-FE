
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function useStartNewTopic() {
    const [prompt, setPrompt] = useState("");
    const [isLogin, setIsLogin] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogin(true);
        }
    }, []);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [prompt]);

    const handleStartNewTopic = async () => {
        if (!prompt.trim()) return;

        const tempId = `temp-${Date.now()}`;
        const timestamp = new Date().toISOString();
        sessionStorage.setItem(tempId, JSON.stringify({ prompt, timestamp }));

        router.push(`/${tempId}?optimistic=true`);
    };

    return {
        prompt,
        setPrompt,
        isLogin,
        textareaRef,
        handleStartNewTopic,
    };
}
