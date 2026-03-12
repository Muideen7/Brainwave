"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Github, Chrome } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-n-8 flex items-center justify-center p-6 font-sans">
      <Card className="max-w-md w-full bg-n-7 border-n-6 p-6 rounded-3xl text-center">
        <CardHeader className="flex flex-col items-center">
          <Link href="/">
             <Image src="/assets/brainwave.svg" width={190} height={40} alt="Brainwave" className="mb-10" />
          </Link>
          <CardTitle className="h2 mb-2">Welcome Back</CardTitle>
          <CardDescription className="text-n-3">Enter your details to access your workspace.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 mt-6">
          <div className="space-y-4">
             <Input placeholder="Email address" className="bg-n-8 border-n-6 h-12 text-n-1" />
             <Button className="w-full bg-color-1 hover:bg-color-1/90 h-12 text-n-1 font-bold">
               Sign in with Magic Link
             </Button>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-n-6"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-n-7 px-2 text-n-4 font-code">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-n-6 hover:bg-n-6 text-n-1 gap-2">
              <Chrome size={18} />
              Google
            </Button>
            <Button variant="outline" className="border-n-6 hover:bg-n-6 text-n-1 gap-2">
              <Github size={18} />
              Github
            </Button>
          </div>

          <p className="text-n-4 text-xs mt-8">
             Don&apos;t have an account?{" "}
             <Link href="/signup" className="text-color-1 hover:underline">Sign up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
