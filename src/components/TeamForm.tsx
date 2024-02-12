"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";

import { Label, Input, Button } from "./ui/chadExporter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc_client/client";
import { Textarea } from "./ui/textarea";
import { teamSchema, type teamSchemaType } from "@/lib/zodSchema";

const TeamForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<teamSchemaType>({
    resolver: zodResolver(teamSchema),
  });

  const submitMutation = trpc.joinTeam.useMutation();
  const joinTeam = async (data: teamSchemaType) => {
    submitMutation.mutate(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(joinTeam)}>
      <Card>
        <CardHeader>
          <CardTitle>Be a part of the maintenance team</CardTitle>
          <CardDescription>We learn cool stuff all the time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="scholarId">Scholar Id</Label>
            <Input id="scholarId" type="number" {...register("scholarId")} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Contact Email</Label>
            <Input id="email" {...register("email")} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="join">What motivates you to join us?</Label>
            <Textarea
              id="join"
              className="resize-none h-32"
              {...register("reason")}
              maxLength={450}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            Send
          </Button>
          {submitMutation.data && (
            <h1 className="text-md text-green-500 mx-5">
              {submitMutation.data}
            </h1>
          )}
        </CardFooter>
      </Card>
    </form>
  );
};

export default TeamForm;
