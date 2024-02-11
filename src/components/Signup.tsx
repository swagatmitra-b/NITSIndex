"use client";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
} from "@/components/ui/chadExporter";

import { trpc } from "@/trpc_client/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema, type signUpFormType } from "@/lib/zodSchema";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const submitMutation = trpc.signUp.useMutation();
  const createUser = async (data: signUpFormType) =>
    submitMutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(createUser)}>
      <Card className="w-[350px] border border-black relative">
        <CardHeader className="text-center">
          <CardTitle>Sign Up</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Institute Email</Label>
              <Input {...register("email")} placeholder="email id" />
              {errors.email && (
                <h1 className="text-red-500 text-sm">
                  {errors.email.message as string}
                </h1>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Scholar ID</Label>
              <Input
                type="number"
                {...register("scholarId")}
                placeholder="scholar id"
              />
              {errors.scholarId && (
                <h1 className="text-red-500 text-sm">
                  {errors.scholarId.message as string}
                </h1>
              )}
            </div>
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="name">Password</Label>
              <Input {...register("password")} placeholder="password" />
              {errors.password && (
                <h1 className="text-red-500 text-sm">
                  {errors.password.message as string}
                </h1>
              )}
            </div>
            <div className="flex flex-col space-y-1.5 w-full">
              <Label htmlFor="name">Confirm Password</Label>
              <Input {...register("confirm")} placeholder="confirm password" />
              {errors.confirm && (
                <h1 className="text-red-500 text-sm">
                  {errors.confirm.message as string}
                </h1>
              )}
            </div>
          </div>
          {submitMutation.isSuccess && (
            <h1 className=" text-green-500 text-sm mt-2">
              User account created!
            </h1>
          )}
          {submitMutation.error?.message ? (
            <h1 className="text-red-500 text-sm mt-2">
              This email or scholar ID is already registered.
            </h1>
          ) : null}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/login">
            <Button
              variant="outline"
              className="border border-black hover:bg-slate-300"
            >
              Go to Login
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

export default Signup;
