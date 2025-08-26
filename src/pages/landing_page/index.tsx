import Input from "../../components/inputs/input";

export default function Home() {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <h2 className="text-3xl text-center mb-8">What can I help with?</h2>
      <Input newChat={true}/>
    </div>
  );
}
