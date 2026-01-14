import RegisterView from "@/views/register/register-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입",
  description: "ChatGraph에 가입하고 나만의 지식 지도를 만드세요.",
};

// 회원가입 페이지
export default function RegisterPage() {
  return <RegisterView />;
}
