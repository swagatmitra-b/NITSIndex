"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "./ui/textarea";
import TeamForm from "@/components/TeamForm";
import { useEffect, useState } from "react";
import { trpc } from "@/trpc_client/client";
import { useSession } from "next-auth/react";

const Contribute = () => {
  const { data: session } = useSession();
  const fbMutation = trpc.feedBack.useMutation();
  const [feedBack, setFeedBack] = useState("");
  const sendFeedBack = () => {
    fbMutation.mutate({ feedBack, email: session?.user?.email as string });
  };
  
  return (
    <Tabs defaultValue="feedback" className="w-1/2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
        <TabsTrigger value="team">Join the Team</TabsTrigger>
      </TabsList>
      <TabsContent value="feedback">
        <Card>
          <CardHeader>
            <CardTitle>Send us your feedback!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 w-full">
            <Textarea
              className="resize-none h-40"
              placeholder="We love to know what you think of us!"
              maxLength={500}
              onChange={(e) => setFeedBack(e.target.value)}
            />
          </CardContent>
          <CardFooter className="">
            <Button onClick={sendFeedBack}>Send</Button>
            {fbMutation.data && (
              <h1 className="text-md text-green-500 mx-5">{fbMutation.data}</h1>
            )}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="team">
        <TeamForm />
      </TabsContent>
    </Tabs>
  );
};

export default Contribute;
