import LoginView from "@/views/login/login-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description: "ChatGraph에 로그인하고 나만의 지식 지도를 만드세요.",
};

// 로그인 페이지
export default function LoginPage() {
  return <LoginView />;
}
