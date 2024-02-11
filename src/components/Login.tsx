"use client";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Button,
} from "@/components/ui/chadExporter";

import { loginFormSchema, type loginFormType } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
  });
  const router = useRouter();
  const { data: session } = useSession();

  const loginUser = async (data: loginFormType) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (res?.ok) router.push("/home");
    else {
      setError(res?.error as string);
    }
  };

  useEffect(() => {
    if (session?.user) router.push("/home");
  }, []);
  return (
    <form onSubmit={handleSubmit(loginUser)}>
      <Card className="w-[350px] border border-black relative">
        <CardHeader className="text-center">
          <CardTitle>Login</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Institute email or Scholar ID</Label>
              <Input placeholder="email/scholar id" {...register("unique")} />
            </div>
            <div className="flex flex-col space-y-1.5 w-full">
              <Label>Password</Label>
              <Input
                placeholder="password"
                type="password"
                {...register("password")}
              />
            </div>
          </div>
          {error && <h1 className="text-sm mt-2 text-red-500">{error}</h1>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/signup">
            <Button
              variant="outline"
              className="border border-black hover:bg-slate-300"
            >
              Don't have an account?
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            Let's go
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Login;
