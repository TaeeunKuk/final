"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { SocialLoginButtons } from "./social-login-buttons"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 실제 로그인 로직 구현 (예: API 호출)
    try {
      // 임시로 2초 후 성공으로 처리
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // 로그인 성공 시 메인 페이지로 이동
      router.push("/")
    } catch (error) {
      console.error("로그인 실패:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="space-y-6">
      {/* 소셜 로그인 */}
      <SocialLoginButtons />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full bg-onair-text-sub/20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-onair-bg px-2 text-onair-text-sub">또는</span>
        </div>
      </div>

      {/* 이메일 로그인 폼 */}
      <Card className="bg-onair-bg-sub border-onair-text-sub/20">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-onair-text">
                이메일
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-onair-text-sub" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 bg-onair-bg border-onair-text-sub/20 text-onair-text placeholder:text-onair-text-sub focus:border-onair-mint"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-onair-text">
                비밀번호
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-onair-text-sub" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 bg-onair-bg border-onair-text-sub/20 text-onair-text placeholder:text-onair-text-sub focus:border-onair-mint"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 text-onair-text-sub hover:text-onair-text"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-onair-text-sub">
                <input type="checkbox" className="rounded border-onair-text-sub/20" />
                <span>로그인 상태 유지</span>
              </label>
              <Button variant="link" className="p-0 h-auto text-onair-mint hover:text-onair-mint/80">
                비밀번호 찾기
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full bg-onair-mint hover:bg-onair-mint/90 text-onair-bg font-medium"
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
