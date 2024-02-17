import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TheWhy = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is this?</AccordionTrigger>
        <AccordionContent>
          NITSIndex is a database that hosts the hottest preferences of the
          students of NIT Silchar. It updates itself through online voting
          sessions that are conducted every three weeks, as of now. While its
          current applications may seem trivial, the possibilies are endless.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What is the point of this?</AccordionTrigger>
        <AccordionContent>
          Frankly, nothing much. This isn't anything important. The charts and
          stats feed some of our visual appetite is all.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Am I eligible to vote?</AccordionTrigger>
        <AccordionContent>
          Nothing can stop you from voting if you are a student of NIT Silchar.
          And if not, thanks for checking out!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>How long is the voting open for?</AccordionTrigger>
        <AccordionContent>
          Usually 24 hours, but could be longer. Also, please note that the
          polling data updates real-time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Can I contribute?</AccordionTrigger>
        <AccordionContent>
          YES! Your votes, feedback and suggestions are all crucial for the
          functioning of this database. We encourage you to vote regularly and
          share us your ideas across various categories. To keep us abreast with
          your ever evolving preferences, you can send us your entries for the
          categories you're interested in for up to 24 hours before the voting
          begins. This database is for you and is nothing without you. To join
          the maintenance team, please login to your account and send us an
          application!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>What if this never works out?</AccordionTrigger>
        <AccordionContent>
          And it probably won't, at some point. Maintaining a database as it
          scales is a very tedious task, even with a sizeable team. But we're
          here for it while it lasts :)
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TheWhy;
