"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/features/auth/api/user";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

export function useSignupForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [matchError, setMatchError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isValidPassword = (pwd: string) => {
        const regex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,16}$/;
        return regex.test(pwd);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError("");
        if (passwordCheck && value !== passwordCheck) {
            setMatchError("비밀번호가 일치하지 않습니다.");
        } else {
            setMatchError("");
        }
    };

    const handlePasswordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPasswordCheck(value);
        if (password && value !== password) {
            setMatchError("비밀번호가 일치하지 않습니다.");
        } else {
            setMatchError("");
        }
    };

    const handlePasswordBlur = () => {
        if (!isValidPassword(password)) {
            setPasswordError(
                "비밀번호는 8~16자, 대소문자/숫자/특수문자를 포함해야 합니다."
            );
        }
    };

    const handlePasswordCheckBlur = () => {
        if (password && passwordCheck && password !== passwordCheck) {
            setMatchError("비밀번호가 일치하지 않습니다.");
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordError || matchError || !email || !password || !passwordCheck) {
            return;
        }

        setIsLoading(true);

        try {
            const res = await signup({ email, password });

            if (res.status === 201) {
                toast.success("회원가입이 완료되었습니다", {
                    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                });
                router.push("/login");
            } else {
                toast.error("회원가입에 실패했습니다");
            }
        } catch (error) {
            console.error(error);
            toast.error("회원가입 중 오류가 발생했습니다");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        passwordCheck,
        passwordError,
        matchError,
        isLoading,
        handleSignup,
        handlePasswordChange,
        handlePasswordCheckChange,
        handlePasswordBlur,
        handlePasswordCheckBlur,
    };
}


