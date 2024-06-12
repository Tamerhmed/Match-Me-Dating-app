import { Button } from "@nextui-org/react";
import Image from "next/image";
import { FaRegSmile } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">App</h1>
      <Button color="primary" startContent={<FaRegSmile />} size={'md'}>click me!</Button>
    </div>
  );
}
