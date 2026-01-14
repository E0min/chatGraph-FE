"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/api/user";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

export function useLoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const res = await login({ email, password });

            if (res.status === 200) {
                const accessToken = res.data.token;
                const refreshToken = res.data.refreshToken;

                localStorage.setItem("token", accessToken);
                localStorage.setItem("refreshToken", refreshToken);

                toast.success("로그인 성공!", {
                    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                });
                router.push("/");
            } else {
                toast.error("로그인 실패");
            }
        } catch (err) {
            console.error(err);
            toast.error("로그인 중 오류가 발생했습니다");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        handleLogin,
    };
}
